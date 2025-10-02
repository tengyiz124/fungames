const boardElement = document.getElementById("game-board");
const scoreElement = document.getElementById("score");

let board = [];
let score = 0;

function initBoard() {
  board = Array(4).fill().map(() => Array(4).fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}

function addRandomTile() {
  let empty = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) empty.push({r, c});
    }
  }
  if (empty.length > 0) {
    const {r, c} = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() > 0.1 ? 2 : 4;
  }
}

function updateBoard() {
  boardElement.innerHTML = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      const value = board[r][c];
      if (value > 0) {
        tile.innerText = value;
        tile.style.background = getColor(value);
      }
      boardElement.appendChild(tile);
    }
  }
  scoreElement.innerText = "Score: " + score;
}

function getColor(val) {
  switch (val) {
    case 2: return "#eee4da";
    case 4: return "#ede0c8";
    case 8: return "#f2b179";
    case 16: return "#f59563";
    case 32: return "#f67c5f";
    case 64: return "#f65e3b";
    case 128: return "#edcf72";
    case 256: return "#edcc61";
    case 512: return "#edc850";
    case 1024: return "#edc53f";
    case 2048: return "#edc22e";
    default: return "#3c3a32";
  }
}

function slide(row) {
  row = row.filter(v => v);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i+1]) {
      row[i] *= 2;
      score += row[i];
      row[i+1] = 0;
    }
  }
  row = row.filter(v => v);
  while (row.length < 4) row.push(0);
  return row;
}

function rotateLeft() {
  let newBoard = Array(4).fill().map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newBoard[3-c][r] = board[r][c];
    }
  }
  board = newBoard;
}

function moveLeft() {
  let moved = false;
  for (let r = 0; r < 4; r++) {
    let newRow = slide(board[r]);
    if (newRow.toString() !== board[r].toString()) moved = true;
    board[r] = newRow;
  }
  if (moved) {
    addRandomTile();
    updateBoard();
  }
}

function moveRight() {
  board = board.map(r => r.reverse());
  moveLeft();
  board = board.map(r => r.reverse());
}

function moveUp() {
  rotateLeft();
  moveLeft();
  rotateLeft();
  rotateLeft();
  rotateLeft();
}

function moveDown() {
  rotateLeft();
  rotateLeft();
  rotateLeft();
  moveLeft();
  rotateLeft();
}

document.addEventListener("keydown", e => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") moveLeft();
  else if (e.code === "ArrowRight" || e.code === "KeyD") moveRight();
  else if (e.code === "ArrowUp" || e.code === "KeyW") moveUp();
  else if (e.code === "ArrowDown" || e.code === "KeyS") moveDown();
});

function restart() {
  initBoard();
}

initBoard();
