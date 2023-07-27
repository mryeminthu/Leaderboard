const STORAGE_KEY = 'recentScores';

export function getRecentScores() {
  const storedScores = localStorage.getItem(STORAGE_KEY);
  return storedScores ? JSON.parse(storedScores) : [];
}

export function storeScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}
