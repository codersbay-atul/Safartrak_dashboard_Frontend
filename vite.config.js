import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const apiProxy = {
  '/v1': {
    target: 'https://web.backend.safartrak.zevon.systems',
    changeOrigin: true,
    secure: true,
  },
}

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
})
