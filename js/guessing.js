console.log("guessing.js loaded YES");

//Number Guessing Game

const inputEl = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
const attemptsLeftEl = document.getElementById("attempts-left");
const messageEl = document.getElementById("message");

const MAX_ATTEMPTS = 5;

let secretNumber;
let attemptsLeft;
let isGameOver;

function startNewGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // 1-100
    attemptsLeft = MAX_ATTEMPTS;
    isGameOver = false;

    attemptsLeftEl.textContent = attemptsLeft;
    messageEl.textContent = "Make your first guess!";
    inputEl.value = "";
    inputEl.disabled = false;
    guessBtn.disabled = false;
    inputEl.focus();
}

function endGame(finalMessage) {
    isGameOver = true;
    messageEl.textContent = finalMessage;
    inputEl.disabled = true;
    guessBtn.disabled = true;
}

function handleGuess () {
    if (isGameOver) return;

    const guess = Number(inputEl.value);

    //validate input
    if (!guess || guess < 1 || guess > 100) {
        messageEl.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    attemptsLeft--;
    attemptsLeftEl.textContent = attemptsLeft;

    if (guess === secretNumber) {
        endGame(`Correct! The number was ${secretNumber}. You win!`);
        return;
    }

    if (attemptsLeft === 0) {
        endGame(`Game over! The number was ${secretNumber}.`);
        return;
    }

    if (guess > secretNumber) {
        messageEl.textContent = `Too high. Try again.`;
    } else {
        messageEl.textContent = `Too low. Try again.`;
    }

    inputEl.value = "";
    inputEl.focus();
}

//Events
guessBtn.addEventListener("click", handleGuess);

//Allow pressing Enter in the input
inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        handleGuess();
    }
});

resetBtn.addEventListener("click", startNewGame);

//Start
startNewGame();
