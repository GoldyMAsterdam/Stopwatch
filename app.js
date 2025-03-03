const startButton = document.getElementById("js--start");
const stopButton = document.getElementById("js--stop");
const resetButton = document.getElementById("js--reset");
const lapButton = document.getElementById("js--lap");
const lapTimesContainer = document.getElementById("lap");
let seconds = 0;
let minutes = 0;
let running = false; 
let timer; 

const secondsTimer = document.getElementById("js--secondsTimer");
const minutesTimer = document.getElementById("js--minutesTimer");
console.log(minutesTimer);

const historyContainer = document.getElementById("history");

startButton.onclick = function() {
    if(running === true){
        return;
    }
    running = true;
    timer = setInterval(function(){
        seconds = seconds + 1;
        if (seconds === 60){
            minutes = minutes + 1;
            minutesTimer.innerText = minutes;
            seconds = 0;
        }
        secondsTimer.innerText = seconds;
    }, 100); // 1000 ms is 1 sec
}  

stopButton.onclick = function() {
    clearInterval(timer);
    running = false;
}

resetButton.onclick = function() {
    clearInterval(timer);
    running = false;
    
    const currentMinutes = minutes;
    const currentSeconds = seconds;
    
    seconds = 0;
    minutes = 0;
    secondsTimer.innerText = seconds;
    minutesTimer.innerText = minutes;

    const historyItem = document.createElement("div");
    historyItem.innerText = `Reset at ${currentMinutes} minutes and ${currentSeconds} seconds`;
    historyContainer.appendChild(historyItem);
}

lapButton.onclick = function() {
    const lapItem = document.createElement("div");
    lapItem.innerText = `Lap at ${minutes} minutes and ${seconds} seconds`;
    lapTimesContainer.appendChild(lapItem);
}