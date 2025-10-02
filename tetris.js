const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");

const ROW = 20;
const COL = 10;
const SQ = 20; 
const VACANT = "#111";

let score = 0;
let board = [];

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = "#333";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function drawBoard() {
  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

function initBoard() {
  board = [];
  for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
      board[r][c] = VACANT;
    }
  }
}

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "orange"],
  [I, "cyan"],
  [J, "purple"]
];

function randomPiece() {
  let r = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;
  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];
  this.x = 3;
  this.y = -2;
}

Piece.prototype.fill = function (color) {
  for (let r = 0; r < this.activeTetromino.length; r++) {
    for (let c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

Piece.prototype.draw = function () {
  this.fill(this.color);
};

Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    this.lock();
    p = randomPiece();
  }
};

Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  let kick = 0;
  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL / 2) {
      kick = -1;
    } else {
      kick = 1;
    }
  }
  if (!this.collision(kick, 0, nextPattern)) {
    this.unDraw();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

Piece.prototype.lock = function () {
  for (let r = 0; r < this.activeTetromino.length; r++) {
    for (let c = 0; c < this.activeTetromino.length; c++) {
      if (!this.activeTetromino[r][c]) continue;
      if (this.y + r < 0) {
        alert("Game Over 😢");
        restart();
        return;
      }
      board[this.y + r][this.x + c] = this.color;
    }
  }
  // check lines
  for (let r = 0; r < ROW; r++) {
    let isRowFull = true;
    for (let c = 0; c < COL; c++) {
      isRowFull = isRowFull && (board[r][c] !== VACANT);
    }
    if (isRowFull) {
      for (let y = r; y > 1; y--) {
        for (let c = 0; c < COL; c++) {
          board[y][c] = board[y - 1][c];
        }
      }
      for (let c = 0; c < COL; c++) {
        board[0][c] = VACANT;
      }
      score += 10;
    }
  }
  document.getElementById("score").innerText = "Score: " + score;
  drawBoard();
};

Piece.prototype.collision = function (x, y, piece) {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece.length; c++) {
      if (!piece[r][c]) continue;
      let newX = this.x + c + x;
      let newY = this.y + r + y;
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }
      if (newY < 0) continue;
      if (board[newY][newX] !== VACANT) {
        return true;
      }
    }
  }
  return false;
};

// Tetromino shapes
const I = [
  [[0,0,0,0],
   [1,1,1,1],
   [0,0,0,0],
   [0,0,0,0]],
  [[0,0,1,0],
   [0,0,1,0],
   [0,0,1,0],
   [0,0,1,0]]
];

const J = [
  [[1,0,0],
   [1,1,1],
   [0,0,0]],
  [[0,1,1],
   [0,1,0],
   [0,1,0]],
  [[0,0,0],
   [1,1,1],
   [0,0,1]],
  [[0,1,0],
   [0,1,0],
   [1,1,0]]
];

const L = [
  [[0,0,1],
   [1,1,1],
   [0,0,0]],
  [[0,1,0],
   [0,1,0],
   [0,1,1]],
  [[0,0,0],
   [1,1,1],
   [1,0,0]],
  [[1,1,0],
   [0,1,0],
   [0,1,0]]
];

const O = [
  [[1,1],
   [1,1]]
];

const S = [
  [[0,1,1],
   [1,1,0],
   [0,0,0]],
  [[0,1,0],
   [0,1,1],
   [0,0,1]]
];

const T = [
  [[0,1,0],
   [1,1,1],
   [0,0,0]],
  [[0,1,0],
   [0,1,1],
   [0,1,0]],
  [[0,0,0],
   [1,1,1],
   [0,1,0]],
  [[0,1,0],
   [1,1,0],
   [0,1,0]]
];

const Z = [
  [[1,1,0],
   [0,1,1],
   [0,0,0]],
  [[0,0,1],
   [0,1,1],
   [0,1,0]]
];

let p;
function drop() {
  p.moveDown();
}

let dropStart;
function animate(time = 0) {
  if (!dropStart) dropStart = time;
  let delta = time - dropStart;
  if (delta > 500) {
    p.moveDown();
    dropStart = time;
  }
  if (!gameOver) {
    requestAnimationFrame(animate);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft") p.moveLeft();
  else if (e.code === "ArrowRight") p.moveRight();
  else if (e.code === "ArrowUp") p.rotate();
  else if (e.code === "ArrowDown") p.moveDown();
});

function restart() {
  initBoard();
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  p = randomPiece();
  drawBoard();
  dropStart = null;
  gameOver = false;
  animate();
}

restart();
