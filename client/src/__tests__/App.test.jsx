import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';
import App from '../App.jsx';

// These tests mock the network layer; once real endpoints are available,
// replace the mocks with MSW or similar tools to simulate server responses.
test('fills form and displays results', async () => {
  const mockTours = [
    {
      operator: 'Mock Operator',
      price: 1000,
      departureDate: '2024-07-01',
      returnDate: '2024-07-10',
      link: 'https://example.com/tour/1'
    }
  ];
  const mockEvents = [
    {
      name: 'Mock Event',
      date: '2024-07-05',
      venue: 'Test Venue',
      url: 'https://example.com/event'
    }
  ];

  // Provide no-op scrollTo for JSDOM and mock fetch for API calls.
  global.HTMLElement.prototype.scrollTo = () => {};
  global.fetch = vi.fn((url) => {
    if (url.startsWith('/api/tours')) {
      return Promise.resolve({ json: () => Promise.resolve(mockTours) });
    }
    if (url.startsWith('/api/events')) {
      return Promise.resolve({ json: () => Promise.resolve(mockEvents) });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });

  render(<App />);

  await userEvent.selectOptions(
    screen.getByLabelText(/Departure Country/i),
    'AM'
  );
  await userEvent.selectOptions(
    screen.getByLabelText(/Destination Country/i),
    'AM'
  );
  await userEvent.type(screen.getByLabelText(/Budget/i), '1000');

  await userEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(await screen.findByText('Mock Operator')).toBeInTheDocument();
  expect(await screen.findByText('Mock Event')).toBeInTheDocument();
});

afterEach(() => {
  vi.restoreAllMocks();
});
