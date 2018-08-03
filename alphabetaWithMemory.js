


function AlphaBetaWithMemory(node, alpha , beta , depth , player, init)
{
  var bestMove = [[0,0],[0,0]];
  
  if(init) console.log("PLAYER: "+player);
  
  retrieve(node, player);
  
  /*
  if (retrieve(node, player)) // Transposition table lookup 
  {
    if (getNode(node).lowerbound >= beta) return getNode(node).lowerbound;
    if (getNode(node).upperbound <= alpha) return getNode(node).upperbound;
    alpha = Math.max(alpha, getNode(node).lowerbound);
    beta = Math.min(beta, getNode(node).upperbound);
  }
  */
  if (depth == 0)   
    g = getNode(node).value; // leaf node 
  
  else if (getNode(node).player==1) // n is a MAXNODE 
  {
    g = -100000000;
    a = alpha; // save original alpha value 
    child = getNode(node).firstchild();
    var i = 0;
    while ((g < beta) && (child != "NOCHILD"))
    {
      i++;
      g = Math.max(g, AlphaBetaWithMemory(child, a, beta, depth - 1, -player)[0]);
      a = Math.max(a, g);
      child = getNode(node).nextbrother();
    }
    bestMove = getNode(node).moves[i];
    if(init) console.log("N: "+node+" + move: "+getNode(node).moves[i] + " i: "+i+ " child: "+child);
  }
  
  else // n is a MINNODE 
  {
    g = 100000000;
    b = beta; // save original beta value 
    child = getNode(node).firstchild();
    var i = 0;
    while ((g > alpha) && (child != "NOCHILD"))
    {
      i++;
      g = Math.max(g, AlphaBetaWithMemory(child, alpha, b, depth - 1, -player)[0]);
      b = Math.min(b, g);
      child = getNode(node).nextbrother();
    }
    bestMove = getNode(node).moves[i];
    if(init) console.log("N: "+node+" + move: "+getNode(node).moves[i] + " i: "+i+ " child: "+child);
  }
  
  // Traditional transposition table storing of bounds 
  // Fail low result implies an upper bound 
  if (g <= alpha)
  {
    getNode(node).upperbound = g; 
    //TODO: store(n, "", upperbound);
  }
  // Found an accurate minimax value - will not occur if called with zero window 
  if (g > alpha && g < beta)
  {
    getNode(node).lowerbound = g;
    getNode(node).upperbound = g;
    //TODO: noch überürpfen ob es das nicht doch braucht: store(n, lowerbound, upperbound);
  }
  // Fail high result implies a lower bound 
  if (g >= beta)
  {
    getNode(node).lowerbound = g;
    //store(n, lowerbound, "");
  }
  //[ bestvalue, bestMove]
  if (init) console.log("i: "+i);
  if (init) console.log(getNode(node).moves);
  if (init) console.log("BEST :"+[g, bestMove]);
  return [g, bestMove];

}





