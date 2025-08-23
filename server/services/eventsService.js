const fs = require('fs');
const path = require('path');

// Default provider when no match is found.
const defaultProvider = require('../providers/ticketmasterProvider');

// Dynamically load provider modules based on the files in the providers folder.
const providersDir = path.join(__dirname, '../providers');
const providerRegistry = {};

fs.readdirSync(providersDir).forEach((file) => {
  if (!file.endsWith('Provider.js') || file.includes('.test.')) {
    return;
  }
  const provider = require(path.join(providersDir, file));
  const codes = provider.supportedCountryCodes || [];
  codes.forEach((code) => {
    providerRegistry[code.toUpperCase()] = provider;
  });
});

/**
 * Retrieve events using the appropriate provider based on country code.
 *
 * @param {string} countryCode - ISO country code.
 * @param {Object} [dateRange] - Optional date range with startDate and endDate.
 * @returns {Promise<Array<Object>>} Array of normalized events.
 */
async function getEvents(countryCode = 'US', dateRange = {}) {
  const code = countryCode.toUpperCase();
  const provider = providerRegistry[code] || defaultProvider;
  if (!provider) {
    return [];
  }
  return provider.fetchEvents(code, dateRange);
}

module.exports = { getEvents, providerRegistry };
