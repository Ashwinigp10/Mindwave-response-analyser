import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        journal: resolve(__dirname, 'journal.html'),
        screening: resolve(__dirname, 'screening.html'),
        'schizophrenia-test': resolve(__dirname, 'schizophrenia-test.html'),
        'bipolar-test': resolve(__dirname, 'bipolar-test.html')
      }
    }
  }
});
