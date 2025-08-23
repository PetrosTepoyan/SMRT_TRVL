import React, { useState, useRef } from 'react';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';

/**
 * App wraps LandingPage and ResultsPage in a scroll-snap container.
 * After a successful search it scrolls smoothly to the results section.
 */
export default function App() {
  const [tours, setTours] = useState([]);
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null);

  const handleSearch = async ({ departure, destination, budget, startDate, endDate }) => {
    const tourParams = new URLSearchParams({
      departureCode: departure,
      destinationCode: destination,
      budget
    });
    const eventParams = new URLSearchParams({
      country: destination,
      startDate,
      endDate
    });
    try {
      const [tourRes, eventRes] = await Promise.all([
        fetch(`/api/tours?${tourParams.toString()}`),
        fetch(`/api/events?${eventParams.toString()}`)
      ]);
      const toursData = await tourRes.json();
      const eventsData = await eventRes.json();
      setTours(toursData);
      setEvents(eventsData);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.clientHeight,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    height: '100vh',
    overflowY: 'auto',
    scrollSnapType: 'y mandatory'
  };
  const pageStyle = {
    scrollSnapAlign: 'start'
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={pageStyle}>
        <LandingPage onSearch={handleSearch} />
      </div>
      <div style={pageStyle}>
        <ResultsPage tours={tours} events={events} />
      </div>
    </div>
  );
}

