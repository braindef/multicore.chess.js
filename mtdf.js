
function iterative_deepening(root, depth, player)
{
  firstguess = 0;
  for(var d=1; d<depth; d++)
  {
    console.log("deepening: "+d);
    firstguess = mtdf(root, firstguess, d, player);
    //if times_up() then break;
  }
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


