
function iterative_deepening(root, depth, player)
{
  firstguess = 0;
  for(var d=0; d<depth; d++)
    firstguess = mtdf(root, firstguess, d, player);
    //if times_up() then break;
  return firstguess;
}


function mtdf(root, f, d, player) 
{
  var g = f;
  var beta;
  var upperbound = 1000000;
  var lowerbound = -1000000;
  while (lowerbound < upperbound)
  {
    if (g == lowerbound)
      beta = g + 1;
    else
      beta = g;
    
    g = AlphaBetaWithMemory(root, beta - 1, beta, d, player, false, true);
      
    if (g < beta)
      upperbound = g;
    else
      lowerbound = g;
   }   

  return g;
}


/*
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
    console.log("mtdf result: "+g);
    return g;
}
*/
