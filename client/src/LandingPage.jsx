import React, { useState } from 'react';
import countries from './countries.json';
import WorldMap from './WorldMap';

/**
 * LandingPage shows the trip form and a world map side by side.
 * It loads country options from countries.json and notifies
 * the parent component when the form is submitted.
 */
export default function LandingPage({ onSearch }) {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSearch({
        departure,
        destination,
        budget,
        startDate,
        endDate,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <form onSubmit={handleSubmit} className="landing-form">
        <h2>Plan your trip</h2>
        <div>
          <label htmlFor="departure">Departure Country</label>
          <select
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {countries.sourceCountries.map((c) => (
              <option key={c.code} value={c.code}>{`${c.flag} ${c.name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="destination">Destination Country</label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {countries.destinationCountries.map((c) => (
              <option key={c.code} value={c.code}>{`${c.flag} ${c.name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start Date</label>
          <input
            id="start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end">End Date</label>
          <input
            id="end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Search'}
        </button>
      </form>
      <div className="landing-map">
        <WorldMap />
      </div>
    </div>
  );
}
