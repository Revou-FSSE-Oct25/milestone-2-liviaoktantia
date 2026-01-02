const ctaBtn = document.getElementById("cta-btn");
const ctaResult = document.getElementById("cta-result");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

const games = [
    { name: "Number Guessing", url: "guessing.html" },
    { name: "RockPaperScissors", url: "rps.html" },
    { name: "Clicker Game", url: "clicker.html" },
];

ctaBtn.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * games.length);
    const picked = games[randomIndex];

    ctaResult.textContent = `Try: ${picked.name}. Use the menu or click Play on the card to open it.`;
});
