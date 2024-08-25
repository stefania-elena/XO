const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');
const winningLine = document.getElementById('winningLine');

let cells;
let currentPlayer;
let gameActive;
let gameState;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    board.innerHTML = '';
    currentPlayer = 'x';
    gameActive = true;
    gameState = Array(9).fill(null);
    statusDisplay.textContent = `Este rândul jucătorului ${currentPlayer.toUpperCase()}`;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
    winningLine.width = board.offsetWidth;
    winningLine.height = board.offsetHeight;
    const ctx = winningLine.getContext('2d');
    ctx.clearRect(0, 0, winningLine.width, winningLine.height);
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);
    if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
    }
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer.toUpperCase();
    checkResult();
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    if (gameActive) {
        statusDisplay.textContent = `Este rândul jucătorului ${currentPlayer.toUpperCase()}`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            drawWinningLine(a, c);
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Jucătorul ${currentPlayer.toUpperCase()} a câștigat!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes(null);
    if (roundDraw) {
        statusDisplay.textContent = 'Egal!';
        gameActive = false;
        return;
    }
}

function drawWinningLine(start, end) {
    const cellSize = 100;
    const cellGap = 10;

    const startX = (start % 3) * (cellSize + cellGap) + cellSize / 2;
    const startY = Math.floor(start / 3) * (cellSize + cellGap) + cellSize / 2;
    const endX = (end % 3) * (cellSize + cellGap) + cellSize / 2;
    const endY = Math.floor(end / 3) * (cellSize + cellGap) + cellSize / 2;

    const ctx = winningLine.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#9d00ff';
    ctx.stroke();
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
