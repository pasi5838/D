let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const statusDisplay = document.getElementById("game-status");
const scoreDisplay = document.getElementById("score");
const boardElement = document.getElementById("board");

function drawBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameActive || board[index]) return;
    board[index] = currentPlayer;
    drawBoard();
    checkResult();
}

function checkResult() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    let roundWon = false;
    for (const condition of winPatterns) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Pemain ${currentPlayer} menang!`;
        gameActive = false;
        if (currentPlayer === "X") scoreX++;
        else scoreO++;
        scoreDisplay.textContent = `Skor X: ${scoreX} | Skor O: ${scoreO}`;
        confettiEffect();
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "Seri!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Giliran: ${currentPlayer}`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusDisplay.textContent = "Giliran: X";
    drawBoard();
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreDisplay.textContent = "Skor X: 0 | Skor O: 0";
    restartGame();
}

function confettiEffect() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

drawBoard();
