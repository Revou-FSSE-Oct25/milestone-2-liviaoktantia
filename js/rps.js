console.log("rps.js loaded YES");

//DOM selection
const moveButtons = document.querySelectorAll("button[data-move]");
const resetBtn = document.getElementById("reset-score");

const yourScoreEl = document.getElementById("you-score");
const cpuScoreEl = document.getElementById("cpu-score");
const messageEl = document.getElementById("rps-message");

//State
let youScore = 0;
let cpuScore = 0;

const moves = ["rock", "paper", "scissors"];

//Helper: computer move
function getComputerMove() {
    const index = Math.floor(Math.random() * moves.length);
    return moves[index];
}

//Decide winner using switch
function decideWinner (playerMove, cpuMove) {
    if (playerMove === cpuMove) {
        return "draw";        
    }

    switch (playerMove) {
        case "rock":
            return cpuMove === "scissors" ? "win" : "lose";
        case "paper":
            return cpuMove === "rock" ? "win" : "lose";
        case "scissors":
            return cpuMove === "paper" ? "win" : "lose";
        default:
            return "draw"
    }
}

//Update scores in DOM
function updateScore () {
    yourScoreEl.textContent = youScore;
    cpuScoreEl.textContent = cpuScore;
}

//Play one round
function playRound(playerMove) {
    const cpuMove = getComputerMove();
    const result = decideWinner(playerMove, cpuMove);

    if (result === "win") youScore++;
    if (result === "lose") cpuScore++;

    updateScore();
    if (result === "draw") {
        messageEl.textContent = `Draw! You both chose ${playerMove}.`;
    } else if (result === "win") {
        messageEl.textContent = `You win! ${playerMove} beats ${cpuMove}.`;
    } else {
        messageEl.textContent = `You lose! ${cpuMove} beats ${playerMove}.`;
    }
}

//Events
moveButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const playerMove = btn.dataset.move;
        playRound(playerMove);
    });
});

resetBtn.addEventListener("click", function () {
    youScore = 0;
    cpuScore = 0;
    updateScore();
    messageEl.textContent = "Score reset. Make your move.";
});
