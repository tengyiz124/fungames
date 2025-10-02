const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, w: 40, h: 40, dy: 0, jumping: false };
let gravity = 1.2;
let obstacles = [];
let score = 0;
let gameOver = false;
let speed = 4;
let spawnTimer;

function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
}

function drawObstacles() {
  ctx.fillStyle = "brown";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
  });
}

function updateObstacles() {
  obstacles.forEach(obs => obs.x -= speed);
  obstacles = obstacles.filter(obs => obs.x + obs.w > 0);

  // collision check
  obstacles.forEach(obs => {
    if (
      dino.x < obs.x + obs.w &&
      dino.x + dino.w > obs.x &&
      dino.y < obs.y + obs.h &&
      dino.y + dino.h > obs.y
    ) {
      gameOver = true;
    }
  });
}

function jump() {
  if (!dino.jumping) {
    dino.dy = -15;
    dino.jumping = true;
  }
}

function updateDino() {
  dino.y += dino.dy;
  dino.dy += gravity;

  if (dino.y > 150) {
    dino.y = 150;
    dino.dy = 0;
    dino.jumping = false;
  }
}

function updateScore() {
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 220, 100);
    return;
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawDino();
  drawObstacles();
  updateDino();
  updateObstacles();
  updateScore();

  requestAnimationFrame(gameLoop);
}

function spawnObstacle() {
  const height = Math.random() * 30 + 20;
  obstacles.push({ x: canvas.width, y: 200 - height, w: 20, h: height });
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") jump();
});

function restart() {
  dino = { x: 50, y: 150, w: 40, h: 40, dy: 0, jumping: false };
  obstacles = [];
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "Score: 0";
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnObstacle, 2000);
  gameLoop();
}

// start game
restart();

