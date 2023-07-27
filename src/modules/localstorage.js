export function storeScores(scoresArray) {
  localStorage.setItem('submittedScores', JSON.stringify(scoresArray));
}

export function getRecentScores() {
  const storedScores = localStorage.getItem('submittedScores');
  return storedScores ? JSON.parse(storedScores) : [];
}
