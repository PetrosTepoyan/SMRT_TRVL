const ticketmasterProvider = require('../providers/ticketmasterProvider');
const tomsarkghProvider = require('../providers/tomsarkghProvider');
const ticketmasterEuProvider = require('../providers/ticketmasterEuProvider');

jest.spyOn(ticketmasterProvider, 'fetchEvents').mockResolvedValue(['tm']);
jest.spyOn(tomsarkghProvider, 'fetchEvents').mockResolvedValue(['ts']);
jest.spyOn(ticketmasterEuProvider, 'fetchEvents').mockResolvedValue(['eu']);

const { getEvents } = require('./eventsService');

describe('eventsService provider selection', () => {
  beforeEach(() => {
    ticketmasterProvider.fetchEvents.mockClear();
    tomsarkghProvider.fetchEvents.mockClear();
    ticketmasterEuProvider.fetchEvents.mockClear();
  });

  test('selects provider based on country code and defaults to Ticketmaster', async () => {
    await expect(getEvents('US')).resolves.toEqual(['tm']);
    expect(ticketmasterProvider.fetchEvents).toHaveBeenCalledWith('US', {});

    await expect(getEvents('AM')).resolves.toEqual(['ts']);
    expect(tomsarkghProvider.fetchEvents).toHaveBeenCalledWith('AM', {});

    await expect(getEvents('GB')).resolves.toEqual(['eu']);
    expect(ticketmasterEuProvider.fetchEvents).toHaveBeenCalledWith('GB', {});

    await expect(getEvents('XX')).resolves.toEqual(['tm']);
    expect(ticketmasterProvider.fetchEvents).toHaveBeenCalledWith('XX', {});
  });
});
