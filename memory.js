const board = document.getElementById("game-board");
const statusText = document.getElementById("status");

let cards = [];
let flippedCards = [];
let matchedCount = 0;

function createBoard() {
  board.innerHTML = "";
  matchedCount = 0;
  statusText.innerText = "Find all the pairs!";

  let symbols = ["🍎","🍌","🍇","🍓","🍊","🍉","🍒","🥝"];
  symbols = [...symbols, ...symbols]; // double for pairs
  symbols.sort(() => 0.5 - Math.random()); // shuffle

  cards = symbols.map((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = "";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
    return card;
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  card.classList.add("flipped");
  card.innerText = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;
    if (matchedCount === cards.length) {
      statusText.innerText = "🎉 You matched them all!";
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerText = "";
    card2.innerText = "";
  }
  flippedCards = [];
}

function restart() {
  createBoard();
}

createBoard();
