


function AlphaBetaWithMemory(n, alpha , beta , depth , player)
{
  if (retrieve(n) == OK) // Transposition table lookup 
  {
    if (getLowerbound(n) >= beta) return getLowerbound(n);
    if (getUpperbound(n) <= alpha) return getUpperbound(n);
    alpha = max(alpha, getLowerbound(n));
    beta = min(beta, n.getUpperbound(n));
  }
  
  if (depth == 0)   
    g = evaluateNode(n, player); // leaf node 
  
  else if (n == MAXNODE) 
  {
    g = -100000000;
    a = alpha; // save original alpha value 
    c = firstchild(n);
    while ((g < beta) && (c != NOCHILD))
    {
      g = max(g, AlphaBetaWithMemory(c, a, beta, depth - 1, -player));
      a = max(a, g);
      c = nextbrother(c);
    }
  }
  
  else // n is a MINNODE 
  {
    g = 100000000;
    b = beta; // save original beta value 
    c = firstchild(n);
    while ((g > alpha) && (c != NOCHILD))
    {
      b = min(b, g);
      c = nextbrother(c);
    }
  }
  
  // Traditional transposition table storing of bounds 
  // Fail low result implies an upper bound 
  if (g <= alpha)
  {
    n.upperbound = g; 
    store(n, "", upperbound);
  }
  // Found an accurate minimax value - will not occur if called with zero window 
  if (g > alpha && g < beta)
  {
    n.lowerbound = g;
    n.upperbound = g;
    store(n, lowerbound, upperbound);
  }
  // Fail high result implies a lower bound 
  if (g >= beta)
  {
    n.lowerbound = g; 
    store(n, lowerbound, "");
  }
  return g;

}



function retrieve(node)
{

}

function store(node, lowerbound, upperbound)
{

}



