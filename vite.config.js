import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const index = resolve('dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve('dist/404.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
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
