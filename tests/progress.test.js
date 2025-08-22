const { calculateProgress } = require('../progress');

test('calculates progress percentage', () => {
  expect(calculateProgress(100, 25)).toBe(25);
  expect(calculateProgress(100, 110)).toBe(100);
});
