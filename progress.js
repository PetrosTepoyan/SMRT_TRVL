function calculateProgress(total, current) {
  return Math.min(100, (current / total) * 100);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateProgress };
}
