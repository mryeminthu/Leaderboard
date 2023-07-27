import './style.css';
import { createGame, addScore } from './modules/api.js';
import { getRecentScores, storeScores } from './modules/localstorage.js';

const submitForm = document.querySelector('.add_score');
const refreshButton = document.querySelector('.refresh button');
const scoresContainer = document.querySelector('.scores-container');
const errorMsg = document.querySelector('.error-msg');

let chessGameId;
let submittedScores = [];

(async function leaderboardApp() {
  async function refreshScores(scoresArray) {
    scoresContainer.innerHTML = '';

    scoresArray.sort((a, b) => b.score - a.score);

    scoresArray.forEach((scoreObj) => {
      const scoreElement = document.createElement('p');
      scoreElement.textContent = `${scoreObj.user}: ${scoreObj.score}`;
      scoresContainer.appendChild(scoreElement);
    });
  }

  submitForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameInput = document.querySelector("input[placeholder='Your name']");
    const scoreInput = document.querySelector("input[placeholder='Your score']");

    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value, 10);

    if (!name || !score) {
      errorMsg.style.display = 'block';
      return;
    }

    await addScore(chessGameId, name, score);
    nameInput.value = '';
    scoreInput.value = '';

    errorMsg.style.display = 'none';
    scoresContainer.style.display = 'block';

    submittedScores.push({ user: name, score });

    storeScores(submittedScores);
    refreshScores(submittedScores);
  });

  refreshButton.addEventListener('click', () => {
    errorMsg.style.display = 'none';
    scoresContainer.style.display = 'block';

    submittedScores = getRecentScores();

    refreshScores(submittedScores);
  });

  async function initializeChessGame() {
    const chessGameName = 'Chess Game';
    chessGameId = await createGame(chessGameName);

    submittedScores = getRecentScores();

    refreshScores(submittedScores);
  }

  initializeChessGame();
}());
