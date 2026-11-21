import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@':            `${import.meta.dirname}/src`,
      '@components':  `${import.meta.dirname}/src/components`,
      '@sections':    `${import.meta.dirname}/src/sections`,
      '@layouts':     `${import.meta.dirname}/src/layouts`,
      '@hooks':       `${import.meta.dirname}/src/hooks`,
      '@utils':       `${import.meta.dirname}/src/utils`,
      '@data':        `${import.meta.dirname}/src/data`,
      '@assets':      `${import.meta.dirname}/src/assets`,
      '@styles':      `${import.meta.dirname}/src/styles`,
      '@contexts':    `${import.meta.dirname}/src/contexts`,
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
