// script.js
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");

let currentPlayer = "x";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

function createBoard() {
  board.innerHTML = "";
  boardState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    board.appendChild(cell);
  });
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      gameActive = false;
      statusText.textContent = `Player ${boardState[a]} Wins!`;
      document.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
      return true;
    }
  }

  if (!boardState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a Draw!";
    return true;
  }

  return false;
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (!checkWinner()) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player X's Turn`;
  createBoard();
  document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("taken"));
}

createBoard();
board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

