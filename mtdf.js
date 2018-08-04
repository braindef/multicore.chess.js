function mtdf(root, f, d, player) 
{
    g = f;
    upperBound = 1000000;
    lowerBound = -1000000;
    while (lowerBound < upperBound)
    {
        beta = Math.max(g, lowerBound + 1);
        g = AlphaBetaWithMemory(root, beta - 1, beta, d, player, false, true);
//        AlphaBetaWithMemory(nodeId, alpha, beta, depth, player, init, resetCounter)
        if (g < beta)
            upperBound = g; 
        else
            lowerBound = g;
    }
    return g;
}


function iterative_deepening(root, depth)
{
  firstguess = 0;
  for(var d=0; d<depth; d++)
    firstguess = MTDF(root, firstguess, d);
    //if times_up() then break;
  return firstguess;
}
