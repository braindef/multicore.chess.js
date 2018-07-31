
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
  console.log("calling minimaxPre");
  moves = possibleMoves(player);
  storedMoves = moves.slice();
  
  for(var i=0; i<moves.length; i++)
  {
    var move = commitMove(moves[i], player);
    if(isInCheck(player))
    {
      console.log("CONTINUED");
      revertMove(move);
      continue;
    }
    data = [ board, depth, player, init, i ];
    console.log("posting message " +i+ " on worker " +i%cpuCores);
    numMoves+=1;
    workers[i%cpuCores].postMessage(data);
    
    revertMove(move);
  }
  console.log(numMoves + "NUM");
}


currentWorker = 0;
results = [];

function handleMessageFromWorker(msg) {
    console.log('incoming message from worker, msg:', msg.data);

    results.push(msg.data);

    currentWorker+=1;

    console.log(currentWorker+ " = "+numMoves);
    
    if(currentWorker==numMoves)
    {
      console.log("CALL       minimaxPost(results); " + currentWorker + " = " +numMoves);
      currentWorker = 0;
      numMoves=0;
      moves = minimaxPost(results);
      console.log("YYY: "+moves);
      
      movePost(moves, player);

    }
}



function minimaxPost(moves) {

  console.log("STORED: "+storedMoves);

  var bestMove = [[0,0],[0,0]];

  var bestValue=1000000;

  for(var i=0; i<moves.length; i++)
  {
    if(moves[i][0]<bestValue)
    {
    console.log(moves);
      bestValue = moves[i][0];
      bestMove = storedMoves[parseInt(moves[i][1])];
    }
          }
    console.log("XXXX: "+bestMove);
    return bestMove;
}

