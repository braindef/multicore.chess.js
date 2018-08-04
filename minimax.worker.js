// =============================================================================
// worker
// =============================================================================

self.importScripts('minimax.js');
self.importScripts('chessRules.js');
self.importScripts('alphabeta.js');
self.importScripts('negaScout.js');

self.importScripts('alphabetaWithMemory.js');
self.importScripts('node.js');

self.importScripts('mtdf.js');

onmessage = function(e) {

  console.log("Worker Called and message passed ");

//    data.push([board, depth, -player, init, resetCounter, moveNumber]);  //TODO: als nicht array ausführen
 
  boardString=e.data.toString();

  data = boardString.split(",");

  stringBoard=data.slice(0, 64);
  
  board = [];
  
  for(var i=0; i<64; i++)
    board[i]=parseInt(stringBoard[i]);

  var depth = data[64];
  var player = data[65];
  var init = data[66]=="true";
  var moveNumber = data[67];
  var algorithm = data[68];
  

  
  var result;
  
  if(algorithm==0)
    result = minimax(depth, player, false, true);

  if(algorithm==1)
    result = alphabeta(depth, player, false, true, -100000, 100000);
    
  if(algorithm==2)
    result = negaScout(depth, player, false, true, -100000, 100000);    

  if(algorithm==3)
    result = AlphaBetaWithMemory(0, -100000, 100000, depth, player, true, true);
    
  if(algorithm==4)
    result = iterative_deepening(0, depth, player); //mtdf(0, f, d);  //mtdf(root, f, d) 
  
  

  
  if (algorithm<3) self.postMessage( [ result[0], result[1][0][0], result[1][0][1], result[1][1][0], result[1][1][1], moveNumber, instances ] );
  if (algorithm>2) self.postMessage( [ result, 0,0,0,0, moveNumber, instances ] );
}


// =============================================================================
