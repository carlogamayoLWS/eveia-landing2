import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/ChatGPT Image*', '**/Frame 270.png'],
    },
  },
  css: {
    lightningcss: {
      targets: {
        safari: (15 << 16),
        chrome: (109 << 16),
        firefox: (117 << 16),
        edge: (109 << 16),
      },
    },
  },
})
