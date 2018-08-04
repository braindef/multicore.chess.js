
function AlphaBetaWithMemory(nodeId, alpha , beta , depth , player, init, resetCounter, move)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  //var bestMove = [[0,0],[0,0]];
  //var g = null;

  node = retrieve(nodeId, player);
  console.log(node);


  if(node.evaluated==false)
  {
    if(node.lowerbound >= beta) return [ node.lowerbound, node.lowerMove ];
    if(node.upperbound <= alpha) return [ node.upperbound, node.upperMove ];
    alpha = Math.max(alpha, node.lowerbound);
    beta = Math.max(beta, node.upperbound);
  }
  
  
  if(depth == 0)
    g = [ evaluate(board), [[0,0],[0,0]] ];
  else if (node.player==1) //MAXPLAYER
  {
    g= [ -100000, [[0,0],[0,0]] ];
    a=alpha;
    moves=possibleMoves(player);
    for(var i=0; i<moves.length; i++)
    {
      var savedData = commitMove(this.moves[i], this.player);
      var child = new Node(-player);
      node.children.push(child.id);
      var tempValue = AlphaBetaWithMemory(child.id, alpha , beta , depth-1 , -player, false, false, this.moves[i]);
      if(tempValue[0]>g[0])
      {
        g = tempValue.slice();
      }
      revertMove(savedData);
      if(!(g<beta)) break;
    }
  }
  else //MINPLAYER
  {
    g = [100000, [[0,0],[0,0]] ];
    b=beta;
    moves=possibleMoves(player);
    for(var i=0; i<moves.length; i++)
    {
      var savedData = commitMove(this.moves[i], this.player);
      var child = new Node(-player);
      node.children.push(child.id);
      var tempValue = AlphaBetaWithMemory(child.id, alpha , beta , depth-1 , -player, false, false, this.moves[i]);
      if(tempValue[0]<g[0])
      {
        g = tempValue.slice();
      }
      revertMove(savedData);
      if(!(g[0]>beta)) break;
    }
  }
  
  if (g[0]<= alpha)
  {
    node.upperbound = g[0];
    node.upperMove = g[1];
  }
  
  if ( (g[0]>alpha) && (g[0]<beta) )
  {
    node.lowerbound = g[0];
    node.lowerMove = g[1];
    node.upperbound = g[0];
    node.upperMove = g[1];
  }
  
  if (g >= beta)
  {
    node.lowerbound = g[0];
    node.lowerMove = g[1];
  }
  
  node.evaluated=true;  //TODO: unsure
  
  return g;
}





/*
function AlphaBetaWithMemory(node, alpha , beta , depth , player, init, resetCounter)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  var bestMove = [[0,0],[0,0]];
  
  if(init) console.log("PLAYER: "+player);
  


  if (retrieve(node, player)) // Transposition table lookup 
  {
    if (getNode(node).lowerbound >= beta) return getNode(node).lowerbound;
    if (getNode(node).upperbound <= alpha) return getNode(node).upperbound;
    alpha = Math.max(alpha, getNode(node).lowerbound);
    beta = Math.min(beta, getNode(node).upperbound);
  }

  if (depth == 0)   
    g = getNode(node).value; // leaf node 
  
  else if (getNode(node).player==1) // n is a MAXNODE 
  {
    g = -100000;
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
    g = 100000;
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

  return [g, bestMove];

}




*/
