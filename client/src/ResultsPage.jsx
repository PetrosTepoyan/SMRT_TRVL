import React from 'react';

/**
 * ResultsPage displays tours and events in two columns.
 * The left column lists tours while the right column lists events.
 */
export default function ResultsPage({ tours = [], events = [] }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{ flex: 2, padding: '1rem', overflowY: 'auto', borderRight: '1px solid #e2e8f0' }}
      >
        <h2>Tours</h2>
        {tours.length === 0 && <p>No tours found.</p>}
        {tours.map((tour, idx) => (
          <div
            key={idx}
            style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}
          >
            <p><strong>{tour.operator}</strong></p>
            <p>Price: ${tour.price}</p>
            <p>
              {tour.departureDate} – {tour.returnDate}
            </p>
            <a href={tour.link} target="_blank" rel="noopener noreferrer">View Tour</a>
          </div>
        ))}
      </div>
      <div
        style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f1f5f9' }}
      >
        <h2>Events</h2>
        {events.length === 0 && <p>No events found.</p>}
        {events.map((event, idx) => (
          <div
            key={idx}
            style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}
          >
            <p><strong>{event.name}</strong></p>
            <p>{event.date}</p>
            <p>{event.venue}</p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">More info</a>
          </div>
        ))}
      </div>
    </div>
  );
}

