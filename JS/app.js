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

// Load content data from JSON file
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
    p.style.fontSize = "1.6rem";
    p.style.lineHeight = "1.5";
    p.style.textAlign = "left";

    rightArticleDiv.appendChild(p);
    tipImage.src = contentItem.image;
}

// Fetch JSON data when the page loads
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
            // Fallback data in case the fetch fails
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
