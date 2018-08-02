// =============================================================================
// worker
// =============================================================================

self.importScripts('minimax.js');
self.importScripts('chessRules.js');
self.importScripts('alphabeta.js');
self.importScripts('negaScout.js');

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
  
  //result = minimax(depth, player, false, true);
  //result = alphabeta(depth, player, false, true, -100000, 100000);
  result = negaScout(depth, player, false, true, -100000, 100000);
  
  console.log(result);
  
  self.postMessage( [ result[0], result[1][0][0], result[1][0][1], result[1][1][0], result[1][1][1], moveNumber, instances ] );
}


// =============================================================================
