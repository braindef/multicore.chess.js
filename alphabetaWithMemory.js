"use strict"

function copy2Darray(from)
{
  var to = new Array(from.length);
  for(var i=0; i<from.length; i++)
  {
    to[i]=new Array(2);
    for(var j=0; j<2; j++)
    {
      to[i][j]= new Array(2);
      for(var k=0; k<2; k++)
        to[i][j][k]=from[i][j][k];
    }
  }
  return to;
}



function AlphaBetaWithMemory(nodeId, alpha, beta, depth, player, init, resetCounter)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  var node = retrieve(nodeId, player);
  if(node.evaluated==true)
  {
    console.log("node already evaluated");
    if (node.lowerbound >= beta) return node.lowerbound;
    if (node.upperbound <= alpha) return node.upperbound;
    alpha = Math.max(alpha, node.lowerbound);
    beta = Math.min(beta, node.upperbound);
  }
  
  if(depth < 1) return evaluateBoard();

  var bestValue = alpha;


  if(node.moves.length==0)
  {  
    var moves = shuffle(possibleMoves(player));
    node.moves = copy2Darray(moves);


    for(var i = 0; i < node.moves.length; i++)
    {
      //Make the move
      var savedData = commitMove(node.moves[i], player);

      if(init)
      {
        if(isInCheck(player))
        {
          //Revert the move: replace with revertMove(savedata)
          revertMove(savedData);
          continue;    
        }
      }

      var newNode = new Node(-player);

      node.children.push(newNode.id);

      var value = -AlphaBetaWithMemory(newNode.id, -beta, -bestValue, depth-1, -player, false, false);

      //Revert the move
      revertMove(savedData);

      if (value > bestValue) 
      {
        bestValue = value;
      }
      if (bestValue >= beta)
         break;
    }
  }
  else
  {
    console.log("Childrean already exists");
    for(var i=0; i<node.moves.length; i++)
    {
      var child = getNode(node.children[i]);
      var savedData = commitMove(node.moves[i], player);
      
      if(init)
      {
        if(isInCheck(player))
        {
          //Revert the move: replace with revertMove(savedata)
          revertMove(savedData);
          continue;    
        }
      }

      var value = -AlphaBetaWithMemory(child.id, -beta, -bestValue, depth-1, -player, false, false);
      
      //Revert the move
      revertMove(savedData);

      if (value > bestValue) 
      {
        bestValue = value;
      }
      if (bestValue >= beta)
         break;
    }
  }

  if (bestValue<= alpha)
    node.upperbound = bestValue;

  
  if ( (bestValue>alpha) && (bestValue<beta) )
  {
    node.lowerbound = bestValue;
    node.upperbound = bestValue;
  }
  
  if (bestValue >= beta)
    node.lowerbound = bestValue;

  node.evaluated=true;  //TODO: unsure

  return bestValue;
}


