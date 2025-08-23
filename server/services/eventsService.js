const ticketmasterProvider = require('../providers/ticketmasterProvider');
const tomsarkghProvider = require('../providers/tomsarkghProvider');

// Mapping of ISO country codes to provider modules
const providerRegistry = {
  US: ticketmasterProvider,
  AM: tomsarkghProvider
};

/**
 * Retrieve events using the appropriate provider based on country code.
 *
 * @param {string} countryCode - ISO country code.
 * @param {Object} [dateRange] - Optional date range with startDate and endDate.
 * @returns {Promise<Array<Object>>} Array of normalized events.
 */
async function getEvents(countryCode = 'US', dateRange = {}) {
  const code = countryCode.toUpperCase();
  const provider = providerRegistry[code] || ticketmasterProvider;
  if (!provider) {
    return [];
  }
  return provider.fetchEvents(code, dateRange);
}

module.exports = { getEvents, providerRegistry };
