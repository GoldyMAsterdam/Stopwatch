const startButton = document.getElementById("js--start");
const stopButton = document.getElementById("js--stop");
const resetButton = document.getElementById("js--reset");
let seconds = 0;
let minutes = 0;
let running = false; 
let timer; 

const secondsTimer = document.getElementById("js--secondsTimer");
const minutesTimer = document.getElementById("js--minutesTimer");

const RangeValue = document.getElementById("js--RangeValue");
const slider = document.getElementById("js--slider");
const body = document.getElementById("js--body");
console.log(body);
slider.value = 2;
RangeValue.innerText = slider.value + "x";

slider.addEventListener("input", function() {
    localStorage.setItem("sliderValue", slider.value);
    RangeValue.innerText = slider.value;  
});

startButton.onclick = function() {
    if (running === true) {
        return;
    }
    running = true;
    timer = setInterval(function() {
        seconds = seconds + 1;
        if (seconds === 60) {
            minutes = minutes + 1;
            minutesTimer.innerText = minutes;
            seconds = 0;
        }
        secondsTimer.innerText = seconds;
    }, 100); // 100 ms is 1/10 sec
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
    
    loadDynamicContent(); 
}

slider.oninput = function() {
    RangeValue.innerText = slider.value + "x";
    body.style.fontSize = slider.value + "rem";
}

const contentData = [
    {
        title: "Running Tips",
        text: "Start slow and gradually increase your pace. Remember to breathe deeply and maintain good posture.",
        image: "IMG/photo-1741518401564-6c3ea0d461ae.avif"
    },
    {
        title: "Fitness Goals",
        text: "Set realistic goals and track your progress. Consistency is key to achieving your fitness objectives.",
        image: "IMG/photo-1741518401564-6c3ea0d461ae.avif"
    },
    {
        title: "Workout Timer",
        text: "Use this stopwatch for interval training. 30 seconds work, 10 seconds rest is a great starting point.",
        image: "IMG/photo-1741518401564-6c3ea0d461ae.avif"
    },
    {
        title: "Stay Hydrated",
        text: "Remember to drink water before, during, and after your workout sessions for optimal performance.",
        image: "IMG/photo-1741518401564-6c3ea0d461ae.avif"
    }
];

function loadDynamicContent() {
    const rightArticle = document.getElementById("right-article");
    const rightArticleTitle = rightArticle.querySelector("h2");
    const rightArticleDiv = rightArticle.querySelector("div");
    const tipImage = document.getElementById("js--tip-image");
    
    const randomIndex = Math.floor(Math.random() * contentData.length);
    const contentItem = contentData[randomIndex];
    
    rightArticleTitle.textContent = contentItem.title;
    
    rightArticleDiv.innerHTML = "";
    
    const p = document.createElement("p");
    p.textContent = contentItem.text;
    p.style.fontSize = "1.6rem";
    p.style.lineHeight = "1.5";
    p.style.textAlign = "left";
    rightArticleDiv.appendChild(p);
    
    tipImage.src = contentItem.image;
}

document.addEventListener("DOMContentLoaded", loadDynamicContent);