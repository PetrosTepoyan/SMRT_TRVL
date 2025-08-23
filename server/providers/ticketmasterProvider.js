const axios = require('axios');

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

/**
 * Fetch events from Ticketmaster API.
 *
 * @param {string} countryCode - ISO country code.
 * @param {Object} [dateRange] - Optional date range with startDate and endDate.
 * @returns {Promise<Array<Object>>} Normalized event objects.
 */
async function fetchEvents(countryCode, dateRange = {}) {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return [];
  }

  const params = {
    countryCode,
    apikey: apiKey
  };

  if (dateRange.startDate) {
    params.startDateTime = new Date(dateRange.startDate).toISOString();
  }
  if (dateRange.endDate) {
    params.endDateTime = new Date(dateRange.endDate).toISOString();
  }

  try {
    const response = await axios.get(BASE_URL, { params });
    const events = response.data?._embedded?.events || [];
    return events.map((ev) => ({
      name: ev.name,
      date: ev.dates?.start?.dateTime || ev.dates?.start?.localDate,
      venue: ev._embedded?.venues?.[0]?.name || '',
      url: ev.url
    }));
  } catch (err) {
    return [];
  }
}

module.exports = { fetchEvents };
