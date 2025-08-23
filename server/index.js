const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const { searchTours } = require('./services/toursService');

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
    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        ...req.query
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
