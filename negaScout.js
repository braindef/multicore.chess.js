


function negaScout(depth, player, init, resetCounter, alpha, beta)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  var bestMove = [[0,0],[0,0]];    
  var value=0; //

  if(depth < 1) return [ evaluateBoard(), [[0,0],[0,0]] ];

  var moves = shuffle(possibleMoves(player));


  for(var i = 0; i < moves.length; i++)   //    for each child of node do
  {
    //Make the move
    var savedData = commitMove(moves[i], player);

    if(i==0)
      value = -negaScout(depth-1, -player, false, false, -beta, -alpha)[0];
    else
    {
      value = -negaScout(depth-1, -player, false, false, -alpha -1, -alpha)[0];
      if(alpha < value && value < beta)
        value = -negaScout(depth-1, -player, false, false, -beta, -value)[0];
    }

    //Revert the move
    revertMove(savedData);

    if (value > alpha) 
    {
      alpha = value;
      bestMove = moves[i];
    }
    if (alpha >= beta)
       break;
    
  }
  return [ alpha, bestMove ];
}

/*

function negaScout(node, depth, α, β, player) is
//    if depth = 0 or node is a terminal node then
//        return player × the heuristic value of node
    for each child of node do
        if child is first child then
            score := −negaScout(child, depth − 1, −β, −α, −player)
        else
            score := −negaScout(child, depth − 1, −α − 1, −α, −player) (* search with a null window *)
            if α < score < β then
                score := −negaScout(child, depth − 1, −β, −score, −player) (* if it failed high, do a full re-search *)
        α := max(α, score)
        if α ≥ β then
            break (* beta cut-off *)
    return α
    
    */
