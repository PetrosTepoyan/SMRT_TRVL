const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { searchTours } = require('./services/toursService');
const { getEvents } = require('./services/eventsService');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/tours', async (req, res) => {
  try {
    const { departureCode, destinationCode, budget } = req.query;
    const tours = await searchTours({ departureCode, destinationCode, budget });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tours' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { country, startDate, endDate } = req.query;
    const events = await getEvents(country, { startDate, endDate });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
