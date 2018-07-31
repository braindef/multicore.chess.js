
cpuCores = 10;
workers = [];
numMoves = 0;

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


//minmax algorithm that does the game
function minimaxPre(depth, player, init, resetCounter)  //TODO: RESETCOUNTER
{
  totalInstances = 0;
  moves = possibleMoves(player);
  storedMoves = moves.slice();
  
  for(var i=0; i<moves.length; i++)
  {
    var move = commitMove(moves[i], player);
    if(isInCheck(player))
    {
      revertMove(move);
      continue;
    }
    data = [ board, depth-1, player, init, i ];
    numMoves+=1;
    workers[i%cpuCores].postMessage(data);
    
    revertMove(move);
  }
}


currentWorker = 0;
results = [];

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

    }
    

}



function minimaxPost(moves) {

  console.log(moves);

  var bestMove = [[0,0],[0,0]];

  var bestValue=1000000;

  for(var i=0; i<moves.length; i++)
  {
    if(moves[i][0]<bestValue)
    {
      console.log(moves);
      bestValue = moves[i][0];
      bestMove = storedMoves[parseInt(moves[i][5])] ;
    }
          }
    return bestMove;
}

