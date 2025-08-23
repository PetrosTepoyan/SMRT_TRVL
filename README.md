# SMRT_TRVL

A simple starter web page for planning smart travel.

## Project Structure

The project is split into a frontend and backend:

- **client/** – React frontend powered by Vite. Start the development server with `npm run dev` inside the `client` folder.
- **server/** – Express backend for API and services. Start the server with `npm start` inside the `server` folder.

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
