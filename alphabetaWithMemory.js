


function AlphaBetaWithMemory(node, alpha , beta , depth , player)
{
  if (retrieve(node, player)) // Transposition table lookup 
  {
    if (getLowerbound(node) >= beta) return getLowerbound(n);
    if (getUpperbound(node) <= alpha) return getUpperbound(n);
    alpha = max(alpha, getLowerbound(node));
    beta = min(beta, n.getUpperbound(node));
  }
  
  if (depth == 0)   
    g = getNode(node).value; // leaf node 
  
  else if (getNode(node).player==1) // n is a MAXNODE 
  {
    g = -100000000;
    a = alpha; // save original alpha value 
    console.log("NODE: "+getNode(node));
    child = getNode(node).firstchild();
    while ((g < beta) && (child != "NOCHILD"))
    {
      g = Math.max(g, AlphaBetaWithMemory(child, a, beta, depth - 1, -player));
      a = Math.max(a, g);
      child = getNode(node).nextbrother();
    }
  }
  
  else // n is a MINNODE 
  {
    g = 100000000;
    b = beta; // save original beta value 
    child = getNode(node).firstchild();
    while ((g > alpha) && (child != "NOCHILD"))
    {
      b = Math.min(b, g);
      child = getNode(node).nextbrother();
    }
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
  return g;

}





