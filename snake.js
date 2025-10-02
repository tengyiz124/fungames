const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

let snake, food, dx, dy, score, gameOver;

function init() {
  snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
  dx = 20; 
  dy = 0;
  score = 0;
  food = spawnFood();
  gameOver = false;
  document.getElementById("score").innerText = "Score: " + score;
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  // walls
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) return true;
  // self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width/2 - 80, canvas.height/2);
    return;
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  moveSnake();
  if (checkCollision()) {
    gameOver = true;
  }
  drawSnake();
  drawFood();
}

function changeDirection(e) {
  if ((e.code === "ArrowUp" || e.code === "KeyW") && dy === 0) { dx = 0; dy = -20; }
  else if ((e.code === "ArrowDown" || e.code === "KeyS") && dy === 0) { dx = 0; dy = 20; }
  else if ((e.code === "ArrowLeft" || e.code === "KeyA") && dx === 0) { dx = -20; dy = 0; }
  else if ((e.code === "ArrowRight" || e.code === "KeyD") && dx === 0) { dx = 20; dy = 0; }
}

document.addEventListener("keydown", changeDirection);

function restart() {
  init();
}

init();
setInterval(gameLoop, 100);
