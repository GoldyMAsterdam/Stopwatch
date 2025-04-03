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

slider.value = 2;
RangeValue.innerText = slider.value + "x";

const savedFontSize = localStorage.getItem("sliderValue");
if (savedFontSize) {
    slider.value = savedFontSize;
    RangeValue.innerText = slider.value + "x";
    updateFontSize(savedFontSize);
}

slider.addEventListener("input", function() {
    const value = slider.value;
    localStorage.setItem("sliderValue", value);
    RangeValue.innerText = value + "x";
    updateFontSize(value);
});

function updateFontSize(size) {
    document.documentElement.style.fontSize = (62.5 * size / 2) + "%";
}

startButton.onclick = function() {
    if (running === true) {
        return;
    }
    running = true;
    timer = setInterval(function() {
        seconds = seconds + 1;
        if (seconds === 60) {
            minutes = minutes + 1;
            minutesTimer.innerText = minutes < 10 ? "0" + minutes : minutes;
            seconds = 0;
        }
        secondsTimer.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 100);
}

stopButton.onclick = function() {
    clearInterval(timer);
    running = false;
}

resetButton.onclick = function() {
    clearInterval(timer);
    running = false;
    seconds = 0;
    minutes = 0;
    secondsTimer.innerText = "00";
    minutesTimer.innerText = "00";
    loadDynamicContent();
}

let contentData = [];
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
    rightArticleDiv.appendChild(p);
    tipImage.src = contentItem.image;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            contentData = data;
            loadDynamicContent();
        })
        .catch(error => {
            console.error('There was a problem fetching the content data:', error);
            contentData = [
                {
                    "title": "Fitness Tip",
                    "text": "Unable to load content. Try refreshing the page.",
                    "image": "IMG/placeholder.jpg"
                }
            ];
            loadDynamicContent();
        });
});
