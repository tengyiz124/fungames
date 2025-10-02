const colors = ["green", "red", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let round = 0;
let waitingForInput = false;

function flashColor(color) {
  const btn = document.getElementById(color);
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 500);
}

function playSequence() {
  let i = 0;
  waitingForInput = false;
  const interval = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      waitingForInput = true;
    }
  }, 800);
}

function nextRound() {
  playerSequence = [];
  round++;
  document.getElementById("score").innerText = "Round: " + round;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  playSequence();
}

function handlePlayerInput(color) {
  if (!waitingForInput) return;

  flashColor(color);
  playerSequence.push(color);

  // check so far
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      alert("❌ Wrong sequence! Game Over.");
      restart();
      return;
    }
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextRound, 1000);
  }
}

function startGame() {
  sequence = [];
  round = 0;
  nextRound();
}

function restart() {
  sequence = [];
  playerSequence = [];
  round = 0;
  waitingForInput = false;
  document.getElementById("score").innerText = "Round: 0";
}

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => handlePlayerInput(color));
});
