const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 80, paddleWidth = 10;
let leftY = canvas.height/2 - paddleHeight/2;
let rightY = canvas.height/2 - paddleHeight/2;
let leftScore = 0, rightScore = 0;

let ball = { x: canvas.width/2, y: canvas.height/2, r: 8, dx: 4, dy: 3 };

function drawPaddles() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, leftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, rightY, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(leftScore, canvas.width/4, 30);
  ctx.fillText(rightScore, 3*canvas.width/4, 30);
}

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw
  drawPaddles();
  drawBall();
  drawScore();

  // move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // bounce top/bottom
  if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) {
    ball.dy *= -1;
  }

  // left paddle
  if (ball.x - ball.r < paddleWidth && ball.y > leftY && ball.y < leftY + paddleHeight) {
    ball.dx *= -1;
    ball.x = paddleWidth + ball.r;
  }

  // right paddle
  if (ball.x + ball.r > canvas.width - paddleWidth && ball.y > rightY && ball.y < rightY + paddleHeight) {
    ball.dx *= -1;
    ball.x = canvas.width - paddleWidth - ball.r;
  }

  // score left
  if (ball.x - ball.r < 0) {
    rightScore++;
    resetBall();
  }

  // score right
  if (ball.x + ball.r > canvas.width) {
    leftScore++;
    resetBall();
  }

  requestAnimationFrame(update);
}

function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function restart() {
  leftScore = 0;
  rightScore = 0;
  resetBall();
}

// controls
document.addEventListener("keydown", e => {
  if (e.code === "KeyW" && leftY > 0) leftY -= 20;
  if (e.code === "KeyS" && leftY + paddleHeight < canvas.height) leftY += 20;
  if (e.code === "ArrowUp" && rightY > 0) rightY -= 20;
  if (e.code === "ArrowDown" && rightY + paddleHeight < canvas.height) rightY += 20;
});

update();
