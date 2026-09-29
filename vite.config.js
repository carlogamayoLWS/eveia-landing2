import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { contactApiDevPlugin } from './vite.contactApiDev.js'

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.RESEND_API_KEY) process.env.RESEND_API_KEY = env.RESEND_API_KEY
  if (env.CONTACT_FROM) process.env.CONTACT_FROM = env.CONTACT_FROM
  if (env.CONTACT_TO) process.env.CONTACT_TO = env.CONTACT_TO
  if (env.CONTACT_CC) process.env.CONTACT_CC = env.CONTACT_CC

  return {
    plugins: [react(), spaFallback(), contactApiDevPlugin()],
    server: {
      watch: {
        ignored: ['**/ChatGPT Image*', '**/Frame 270.png'],
      },
      proxy: {
        '/eveia-api': {
          target: 'https://api.eveia.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/eveia-api/, ''),
        },
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
  }
})
