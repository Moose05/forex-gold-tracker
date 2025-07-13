import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ 
  base: '/forex-gold-tracker/',
  plugins: [react()],
});
