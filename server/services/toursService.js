// TODO: Replace this mock implementation with real Tourvisor API calls once credentials are available.
// For now, return hard-coded sample tours.

/**
 * Search for tours using Tourvisor API (mock implementation).
 *
 * @param {Object} params
 * @param {string} params.departureCode - IATA code for departure city.
 * @param {string} params.destinationCode - IATA code for destination city.
 * @param {number|string} params.budget - Maximum budget for the tour.
 * @returns {Promise<Array<Object>>} Array of tour objects.
 */
async function searchTours({ departureCode, destinationCode, budget }) {
  // The parameters are currently unused in this mock.
  return [
    {
      operator: 'Mock Operator',
      price: 1000,
      departureDate: '2024-07-01',
      returnDate: '2024-07-10',
      link: 'https://example.com/tour/1'
    },
    {
      operator: 'Demo Travel',
      price: 800,
      departureDate: '2024-08-05',
      returnDate: '2024-08-15',
      link: 'https://example.com/tour/2'
    }
  ];
}

module.exports = { searchTours };
