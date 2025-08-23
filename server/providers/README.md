# Event Providers

Each provider module must export a `fetchEvents` function and a list of ISO
country codes it supports via `supportedCountryCodes`.

```js
const supportedCountryCodes = ['US'];

/**
 * Fetch events for a country.
 * @param {string} countryCode
 * @param {{startDate?: string, endDate?: string}} [dateRange]
 * @returns {Promise<Array<{name:string,date:string,venue:string,url:string}>>}
 */
async function fetchEvents(countryCode, dateRange = {}) {
  // ...
}

module.exports = { fetchEvents, supportedCountryCodes };
```

The returned events should be normalized objects containing `name`, `date`,
`venue`, and `url` fields. `eventsService` automatically loads all providers in
this directory and selects them based on their declared country codes. Requests
for unsupported countries fall back to the Ticketmaster provider.
