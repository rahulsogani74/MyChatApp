import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser', // Use terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      },
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open the app in the browser
  },
});
