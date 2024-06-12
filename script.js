const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
let isGameActive = true;

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function restartButton() {
  isGameActive = true;
  document.getElementById('end-message').textContent = '';
  currentPlayer = players[0];
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
  }
}

document.getElementById('restart-button').addEventListener('click', restartButton);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function() {
    if (isGameActive) {
      if (this.textContent === '') {
        this.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
          document.getElementById('end-message').textContent = `Player ${currentPlayer} wins!`;
          isGameActive = false;
        } else if (checkTie()) {
          document.getElementById('end-message').textContent = `It's a tie!`;
          isGameActive = false;
        } else {
          currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
          document.getElementById('current-turn').textContent = currentPlayer;
          document.getElementById('current-turn').classList.toggle('x-turn');
          document.getElementById('current-turn').classList.toggle('o-turn');
        }
      }
    }
  });
}