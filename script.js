console.log("Hello Universe!")
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < 9; i += 3) {
    if (gameState[i] === gameState[i + 1] && gameState[i + 1] === gameState[i + 2] && gameState[i] !== '') {
      roundWon = true;
      break;
    }
  }
  if (!roundWon) {
    for (let i = 0; i < 3; i++) {
      if (gameState[i] === gameState[i + 3] && gameState[i + 3] === gameState[i + 6] && gameState[i] !== '') {
        roundWon = true;
        break;
      }
    }
  }
  if (!roundWon && gameState[0] === gameState[4] && gameState[4] === gameState[8] && gameState[0] !== '') {
    roundWon = true;
  }
  if (!roundWon && gameState[2] === gameState[4] && gameState[4] === gameState[6] && gameState[2] !== '') {
    roundWon = true;
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    playVideo();
    document.getElementById('win-box').style.display = 'flex';
    document.getElementById('winner-greet').textContent = currentPlayer + ' has won!';

    return;

  }

  if (!gameState.includes('')) {
    statusDisplay.textContent = `It's a tie!`;
    gameActive = false;
    return;
  }

  handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
    console.log('clickedCellEvent', clickedCellEvent);
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
   
    console.log('restart');
    document.getElementById('win-box').style.display = 'none';
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

var video = document.getElementById("video")

video.playbackRate = 5;


function playVideo() {
    video.style.display = 'block';
    video.style.opacity = '0.7';
    video.play();
    video.currentTime = 0;
    video.play();

    // Stop playback when the end time is reached
    video.addEventListener('timeupdate', function() {
      if (this.currentTime >= 13) {
        this.pause();
        video.style.opacity = '0';
        video.style.display = 'none';
      }
    });
}
document.querySelector('video').playbackRate = 5;