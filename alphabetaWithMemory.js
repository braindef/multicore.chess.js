

function AlphaBetaWithMemory(nodeId, alpha, beta, depth, player, init, resetCounter)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  node = retrieve(nodeId, player);
  if(node.evaluated==true)
  {
    console.log("node already evaluated");
    if (node.lowerbound >= beta) return node.lowerbound;
    if (node.upperbound <= alpha) return node.upperbound;
    alpha = Math.max(alpha, node.lowerbound);
    beta = Math.min(beta, node.upperbound);
  }
  
  var bestMove = [[0,0],[0,0]];    

  if(depth < 1) return evaluateBoard();

  var moves = shuffle(possibleMoves(player));

  var bestValue = alpha;

  for(var i = 0; i < moves.length; i++)
  {
    //Make the move
    var savedData = commitMove(moves[i], player);

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


