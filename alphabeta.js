
function alphabeta(depth, player, init, resetCounter, alpha, beta)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  var bestMove = [[0,0],[0,0]];    

  if(depth < 1) return [ evaluateBoard(), [[0,0],[0,0]] ];

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

    var value = -alphabeta(depth-1, -1*player, false, false, -beta, -bestValue)[0];


    //Revert the move
    revertMove(savedData);

    if (value > bestValue) 
    {
      bestValue = value;
      bestMove = moves[i];
    
      if (bestValue >= beta)
         break;
    }
  }
  return [ bestValue, bestMove ];
}

 
