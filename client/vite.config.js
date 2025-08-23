import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vitest runs in a JSDOM environment to simulate the browser.
  // Real network requests are mocked in tests until APIs are available.
  test: {
    environment: 'jsdom',
    globals: true
  }
});
