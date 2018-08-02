
var cpuCores = 16;
var workers = [];
var numMoves = 0;

createWorkers();

function createWorkers()
{
  for(var i=0; i<cpuCores; i++)
  {
    var worker = new Worker('minimax.worker.js');
    worker.addEventListener('message', handleMessageFromWorker);
    workers.push(worker);
  }
}

var storedMoves = [];
var algorithm = 0;

function selectAlgorithm()
{
  var selectionBox = document.getElementById("algorithm");
  algorithm = selectionBox.selectedIndex;
  console.log("ALGI: "+algorithm);
}
  

//minmax algorithm that does the game
function minimaxPre(depth, player, init, resetCounter)  //TODO: RESETCOUNTER
{
  totalInstances = 0;
  pMoves = possibleMoves(player);
  
  console.log(pMoves);
  
  for(var i=0; i<pMoves.length; i++)
  {
    var move = commitMove(pMoves[i], player);
    storedMoves.push(pMoves[i]);
    if(isInCheck(player))
    {
      revertMove(move);
      continue;
    }
    data = [ board, depth-1, -player, init, i, algorithm ];
    numMoves+=1;
    workers[i%cpuCores].postMessage(data);
    
    revertMove(move);
  }
}


var currentWorker = 0;
var results = [];

var totalInstances = 0;

function handleMessageFromWorker(msg) {
    console.log('incoming message from worker, msg:', msg.data);



    results.push(msg.data);

    currentWorker+=1;

    totalInstances += parseInt(msg.data[6]);
    
    document.getElementById("instances").value = totalInstances;
    
    console.log(totalInstances);

    if(currentWorker==numMoves)
    {
      currentWorker = 0;
      numMoves=0;
      moves = minimaxPost(results);
      
      movePost(moves, player);
      
      results = [];
    }
}



function minimaxPost(moves) {

  var bestMove = [[0,0],[0,0]];

  var bestValue=1000000;

  for(var i=0; i<moves.length; i++)
  {
    if(moves[i][0]<bestValue)
    {
      bestValue = moves[i][0];
      minimaxPostNr = parseInt(moves[i][5]);

      bestMove = storedMoves[minimaxPostNr];
    }
  }
    console.log("Stored Moves: "+storedMoves.length);
    console.log(storedMoves);
    console.log("BEWST: "+bestMove);
    console.log(moves);
  
    storedMoves = new Array();
    return bestMove;
}

