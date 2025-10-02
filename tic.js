const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameOver = false;

// create 9 cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleMove(i, cell));
  board.appendChild(cell);
}

function handleMove(index, cell) {
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    statusText.innerText = `🎉 Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (cells.every(c => c)) {
    statusText.innerText = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return wins.some(combo => {
    const [a,b,c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restart() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  statusText.innerText = "Player X's turn";
  Array.from(board.children).forEach(cell => cell.innerText = "");
}
