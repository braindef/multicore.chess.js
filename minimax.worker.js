// =============================================================================
// worker
// =============================================================================

self.importScripts('minimax.js');
self.importScripts('chessRules.js');

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
  
  self.postMessage( [ minimax(depth, player, false), moveNumber ] );
}


// =============================================================================
