const axios = require('axios');

const BASE_URL = 'https://www.tomsarkgh.am/sitemap/events';

/**
 * Fetch events from Tomsarkgh sitemap.
 *
 * @param {string} countryCode - ISO country code (unused).
 * @param {Object} [dateRange] - Optional date range with startDate and endDate.
 * @returns {Promise<Array<Object>>} Normalized event objects.
 */
async function fetchEvents(countryCode, dateRange = {}) {
  const pages = [0, 1];
  const results = [];

  for (const page of pages) {
    try {
      const { data } = await axios.get(`${BASE_URL}/${page}`);
      const entries = data.match(/<url>(.*?)<\/url>/gs) || [];
      for (const entry of entries) {
        const locMatch = entry.match(/<loc>(.*?)<\/loc>/);
        const dateMatch = entry.match(/<lastmod>(.*?)<\/lastmod>/);
        if (locMatch && dateMatch) {
          const url = locMatch[1];
          let name = url.split('/').pop().replace('.html', '');
          name = decodeURIComponent(name).replace(/-/g, ' ');
          const date = dateMatch[1];
          if (dateRange.startDate && new Date(date) < new Date(dateRange.startDate)) {
            continue;
          }
          if (dateRange.endDate && new Date(date) > new Date(dateRange.endDate)) {
            continue;
          }
          results.push({
            name,
            date,
            venue: '',
            url
          });
        }
      }
    } catch (err) {
      // ignore fetch errors for individual pages
    }
  }

  return results;
}

module.exports = { fetchEvents };
