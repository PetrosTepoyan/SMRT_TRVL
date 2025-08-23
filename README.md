# SMRT_TRVL

A simple starter web page for planning smart travel.

## Project Structure

The project is split into a frontend and backend:

- **client/** – React frontend powered by Vite. Start the development server with `npm run dev` inside the `client` folder.
- **server/** – Express backend for API and services. Start the server with `npm start` inside the `server` folder.

### Configuration

The backend uses environment variables for external API credentials. Copy `server/.env.example` to `server/.env` and fill in your values:

```
PORT=3000
TOURVISOR_LOGIN=your_login
TOURVISOR_PASSWORD=your_password
TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

### API Endpoints

- `GET /api/tours` – fetch tours from Tourvisor using the credentials above.
- `GET /api/events` – fetch events data from Ticketmaster.

## Results Page and Navigation

Searches on the landing page fetch tours and events and then scroll the viewport to a full-screen results page. The layout uses
CSS scroll snapping to treat the landing and results sections as vertical pages. Tours appear in the larger left column with
links to Tourvisor, while events are listed on the right with links to their ticket providers.

## Development

Install dependencies and start the development server:

```bash
npm install
npm start
```

## Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Testing

Execute Jest tests:

```bash
npm test
```

The starter page displays a friendly “Hello” that animates to the top and fades away, revealing a form to enter your start destination, desired destination, and budget. Clicking the **Search** button shows a progress bar to indicate activity.

## Assets

The world map relies on a [GeoJSON file of world countries](https://github.com/holtzy/D3-graph-gallery/blob/master/DATA/world.geojson) from the D3 Graph Gallery project. A local copy is bundled with the app at `client/public/world.geojson` so the map can render offline.
