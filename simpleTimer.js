var timerStart = true;

function myTimer(d0)
{
   // get current time
   var d=(new Date()).valueOf();
   // calculate time difference between now and initial time
   var diff = d-d0;
   // calculate number of seconds
   var seconds = Math.floor(diff/1000);
   var myVar = null;
   // if number of seconds less than 10, add a leading "0"
   seconds = seconds.toString();
   // return output to Web Worker
   postMessage(seconds);
}
                
if (timerStart){
   // get current time
   var d0=(new Date()).valueOf();
   // repeat myTimer(d0) every 100 ms
   myVar=setInterval(function(){myTimer(d0)},500);
   // timer should not start anymore since it has been started
   timerStart = false;
}
