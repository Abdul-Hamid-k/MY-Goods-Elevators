import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages (/repo-name/) and on a custom domain.
  base: './',
  plugins: [react()],
})
