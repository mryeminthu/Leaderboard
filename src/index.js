import './style.css';
import { createGame, addScore, getScores } from './modules/api.js';
import { storeScores } from './modules/localstorage.js';

const submitForm = document.querySelector('.add_score');
const refreshButton = document.querySelector('.refresh button');
const scoresContainer = document.querySelector('.scores-container');
const errorMsg = document.querySelector('.error-msg');

let chessGameId;
let submittedScores = [];

function refreshScores(scoresArray) {
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

refreshButton.addEventListener('click', async () => {
  errorMsg.style.display = 'none';
  scoresContainer.style.display = 'block';

  try {
    const scoresData = await getScores(chessGameId);
    submittedScores = scoresData.result || [];

    refreshScores(submittedScores);
  } catch (error) {
    // Handle the error
  }
});

(async function initialize() {
  const chessGameName = 'Chess Game';
  chessGameId = await createGame(chessGameName);

  try {
    const scoresData = await getScores(chessGameId);
    submittedScores = scoresData.result || [];
  } catch (error) {
    // Handle the error
  }

  refreshScores(submittedScores);
}());
