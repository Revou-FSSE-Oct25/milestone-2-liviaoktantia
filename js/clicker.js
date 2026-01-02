console.log("clicker.js loaded YES");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const clickBtn = document.getElementById("click-btn");

const timeLeftEl = document.getElementById("time-left");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best-score");
const msgEl = document.getElementById("clicker-message");

const GAME_SECONDS = 10;

let score = 0;
let timeLeft = GAME_SECONDS;
let timerId = null;
let isRunning = false;

function loadBestScore() {
    const saved = localStorage.getItem("clickerBest");
    const best = saved ? Number(saved) : 0;
    bestEl.textContent = best;
}

function saveBestScoreIfNeeded() {
    const currentBest = Number(bestEl.textContent);
    if (score > currentBest) {
        localStorage.setItem("clickerBest", String(score));
        bestEl.textContent = score;
    }
}

function updateUI() {
    scoreEl.textContent = score;
    timeLeftEl.textContent = timeLeft;
}

function endGame () {
    isRunning = false;
    clickBtn.disabled = true;
    startBtn.disabled = false;

    clearInterval(timerId);
    timerId = null;

    saveBestScoreIfNeeded();
    msgEl.textContent = `Time's up! Final score ${score}.`;
}

function tick() {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
        endGame();
    }
}

function startGame () {
    if (isRunning) return;

    score = 0;
    timeLeft = GAME_SECONDS;
    isRunning = true;

    updateUI();
    msgEl.textContent = "Go! Click as fast as you can.";
    clickBtn.disabled = false;
    startBtn.disabled = true;

    timerId = setInterval(tick, 1000);
}

function resetGame() {
    isRunning = false;

    clearInterval(timerId);
    timerId = null;

    score = 0;
    timeLeft = GAME_SECONDS;
    updateUI();

    clickBtn.disabled = true;
    startBtn.disabled = false;
    msgEl.textContent = "Click Start to begin.";
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

clickBtn.addEventListener("click", function() {
    if (!isRunning) return;
    score++;
    scoreEl.textContent = score;
});

//Init
loadBestScore();
updateUI();
