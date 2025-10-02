const board = document.getElementById("game-board");
const scoreText = document.getElementById("score");

let holes = [];
let score = 0;
let activeIndex = -1;
let gameInterval;

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.dataset.index = i;
    hole.innerText = "🐹"; // mole emoji
    hole.addEventListener("click", () => whack(i));
    board.appendChild(hole);
    holes.push(hole);
  }
}

function startGame() {
  score = 0;
  scoreText.innerText = "Score: " + score;
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 1000);
}

function showMole() {
  if (activeIndex >= 0) {
    holes[activeIndex].classList.remove("active");
  }
  activeIndex = Math.floor(Math.random() * holes.length);
  holes[activeIndex].classList.add("active");
}

function whack(index) {
  if (index === activeIndex && holes[index].classList.contains("active")) {
    score++;
    scoreText.innerText = "Score: " + score;
    holes[index].classList.remove("active");
    activeIndex = -1;
  }
}

function restart() {
  holes = [];
  createBoard();
  startGame();
}

createBoard();
startGame();
