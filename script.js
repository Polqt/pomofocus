const timerEnds = new Audio("./sounds/bells.mp3");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const sessionTimer = document.querySelector(".minutes");
const secondsTimer = document.querySelector(".seconds");

let myInterval;
let state = true;
let isRunning = false;
let isPaused = false;
let totalSeconds;

const appTimer = () => {
    const sessionAmount = Number.parseInt(sessionTimer.textContent);

    if (state) {
        state = false;
        isRunning = true;
        totalSeconds = sessionAmount * 60;

        myInterval = setInterval(updateSeconds, 1000);
    } else if (isPaused) {
        isPaused = false; 
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert("Timer has already been started.");
    }
}

const updateSeconds = () => {
    if (totalSeconds > 0 && !isPaused) {
        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        sessionTimer.textContent = `${minutesLeft}`;
        secondsTimer.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
    } else if (totalSeconds === 0) {
        timerEnds.play();
        clearInterval(myInterval);
        state = true;
        isRunning = false;
    }
}

const pauseTimer = () => {
    if (isRunning && !isPaused) {
        clearInterval(myInterval);
        isPaused = true;
    } else if (isPaused) {
        alert("Timer is already paused.");
    };
}

const resetTimer = () => {
    clearInterval(myInterval);
    state = true;
    isRunning = false;
    isPaused = false;
    sessionTimer.textContent = "25";
    secondsTimer.textContent = "00";
    totalSeconds = 0;
}

startButton.addEventListener("click", appTimer);
pauseButton.addEventListener("click", pauseTimer);

document.addEventListener("keydown", (event) => {
    if (event.key === 'r' || event.key === 'R') {
        resetTimer();
    }
});