var w = null; // initialize variable

// function to start the timer
function startTimer(color)
{
   // First check whether Web Workers are supported
   if (typeof(Worker)!=="undefined"){
      // Check whether Web Worker has been created. If not, create a new Web Worker based on the Javascript file simple-timer.js
      if (w==null){
         w = new Worker("simpleTimer.js");
      }
      // Update timer div with output from Web Worker
      w.onmessage = function (event) {
         document.getElementById(color).innerHTML = "turn " + color + " (" + event.data + "s)";
      };
   }
}

// function to stop the timer
function stopTimer()
{
   w.terminate();
   timerStart = true;
   w = null;
}
