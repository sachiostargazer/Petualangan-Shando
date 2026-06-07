const character = document.getElementById("character");
const block = document.getElementById("block");
const scoreText = document.getElementById("score");
const menu = document.getElementById("menu");
const gameArea = document.getElementById("game");
const gameOverPanel = document.getElementById("gameOverPanel");

// Audio
const jumpSound = new Audio('jump.wav');
const hitSound = new Audio('hit.wav');

let score = 0;
let isGameRunning = false;

function startGame() {
    menu.style.display = "none";
    gameArea.style.display = "block";
    isGameRunning = true;
    score = 0;
    block.style.animation = "move 1.5s infinite linear";
    window.focus();
}

function gameOver() {
    isGameRunning = false;
    block.style.animation = "none";
    hitSound.play();
    document.getElementById("finalScore").innerHTML = "SKOR: " + Math.floor(score / 10);
    gameOverPanel.style.display = "flex";
}

function resetGame() {
    gameOverPanel.style.display = "none";
    score = 0;
    isGameRunning = true;
    block.style.animation = "move 1.5s infinite linear";
}

setInterval(() => {
    if(isGameRunning) {
        score++;
        scoreText.innerHTML = "Score: " + Math.floor(score / 10);
        
        let charBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        
        if(blockLeft < 50 && blockLeft > 20 && charBottom < 40) gameOver();
    }
}, 10);

document.addEventListener('keydown', (e) => {
    if(e.code === "Space" && isGameRunning && character.classList != "animate") {
        character.classList.add("animate");
        jumpSound.currentTime = 0;
        jumpSound.play();
        setTimeout(() => character.classList.remove("animate"), 500);
    }
});