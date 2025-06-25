// Select all the important elements
const cells = document.querySelectorAll(".cell");
const playerDisplay = document.getElementById("player");
const restartButton = document.getElementById("restart");
const statusText = document.querySelector(".status");

// Game state variables
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

// Add click event to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

// Restart button event
restartButton.addEventListener("click", restartGame);

// Function to handle a cell click
function handleCellClick(index) {
  // Ignore if cell is already filled or game is over
  if (gameBoard[index] !== "" || !gameActive) return;

  // Fill the clicked cell with current player symbol
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check for win or draw
  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.textContent = currentPlayer;
}

// Function to check if someone won
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      // Add winning animation class
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

// Function to restart the game
function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  playerDisplay.textContent = currentPlayer;
  statusText.innerHTML = `Current Player: <span id="player">X</span>`;

  // Clear cell content and animations
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}
