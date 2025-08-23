const { searchTours } = require('./toursService');

// Tests rely on the current mock implementation; when real API calls are
// introduced this suite should be updated to mock HTTP requests instead.
test('searchTours returns properly shaped array', async () => {
  const tours = await searchTours({ departureCode: 'AM', destinationCode: 'AM', budget: 1000 });
  expect(Array.isArray(tours)).toBe(true);
  expect(tours.length).toBeGreaterThan(0);
  const tour = tours[0];
  expect(typeof tour.operator).toBe('string');
  expect(typeof tour.price).toBe('number');
  expect(typeof tour.departureDate).toBe('string');
  expect(typeof tour.returnDate).toBe('string');
  expect(typeof tour.link).toBe('string');
});
