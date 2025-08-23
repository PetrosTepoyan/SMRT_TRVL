const axios = require('axios');
const ticketmasterProvider = require('./ticketmasterProvider');
const tomsarkghProvider = require('./tomsarkghProvider');
const ticketmasterEuProvider = require('./ticketmasterEuProvider');

// Mock axios to avoid real HTTP requests. Real API calls should be mocked with
// more detailed fixtures when the providers are fully implemented.
jest.mock('axios');

describe('event providers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ticketmasterProvider returns normalized events', async () => {
    const original = process.env.TICKETMASTER_API_KEY;
    process.env.TICKETMASTER_API_KEY = 'dummy';
    axios.get.mockResolvedValue({
      data: {
        _embedded: {
          events: [
            {
              name: 'Concert',
              dates: { start: { dateTime: '2024-01-01T00:00:00Z' } },
              _embedded: { venues: [{ name: 'Hall' }] },
              url: 'https://example.com/concert'
            }
          ]
        }
      }
    });
    const events = await ticketmasterProvider.fetchEvents('US');
    expect(Array.isArray(events)).toBe(true);
    expect(events[0]).toEqual({
      name: 'Concert',
      date: '2024-01-01T00:00:00Z',
      venue: 'Hall',
      url: 'https://example.com/concert'
    });
    process.env.TICKETMASTER_API_KEY = original;
  });

  test('ticketmasterEuProvider returns normalized events', async () => {
    const original = process.env.TICKETMASTER_API_KEY;
    process.env.TICKETMASTER_API_KEY = 'dummy';
    axios.get.mockResolvedValue({
      data: {
        _embedded: {
          events: [
            {
              name: 'Concert',
              dates: { start: { dateTime: '2024-01-01T00:00:00Z' } },
              _embedded: { venues: [{ name: 'Hall' }] },
              url: 'https://example.com/concert'
            }
          ]
        }
      }
    });
    const events = await ticketmasterEuProvider.fetchEvents('GB');
    expect(Array.isArray(events)).toBe(true);
    expect(events[0]).toEqual({
      name: 'Concert',
      date: '2024-01-01T00:00:00Z',
      venue: 'Hall',
      url: 'https://example.com/concert'
    });
    process.env.TICKETMASTER_API_KEY = original;
  });

  test('tomsarkghProvider returns normalized events', async () => {
    const sitemap = '<url><loc>https://example.com/event1.html</loc><lastmod>2024-01-02</lastmod></url>';
    axios.get.mockResolvedValue({ data: sitemap });
    const events = await tomsarkghProvider.fetchEvents('AM');
    expect(Array.isArray(events)).toBe(true);
    expect(events[0]).toEqual({
      name: 'event1',
      date: '2024-01-02',
      venue: '',
      url: 'https://example.com/event1.html'
    });
  });
});
