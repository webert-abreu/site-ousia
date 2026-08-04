import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        links: resolve(__dirname, 'links/index.html'),
        criativos: resolve(__dirname, 'criativos/estaticos/modelo-base.html')
      }
    }
  }
})
