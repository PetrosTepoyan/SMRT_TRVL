const ticketmasterProvider = require('./ticketmasterProvider');

// Placeholder provider for several EU markets using Ticketmaster API.
const supportedCountryCodes = ['GB', 'DE', 'FR', 'ES', 'IT'];

async function fetchEvents(countryCode, dateRange = {}) {
  return ticketmasterProvider.fetchEvents(countryCode, dateRange);
}

module.exports = { fetchEvents, supportedCountryCodes };
