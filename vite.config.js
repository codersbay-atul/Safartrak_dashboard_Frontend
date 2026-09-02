import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const apiProxy = {
  '/v1': {
    target: 'http://localhost:5000/api',
    changeOrigin: true,
    secure: false,
  },
  '/admin': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    secure: false,
  },
}

function appVersionPlugin() {
  const version = Date.now().toString()
  const payload = JSON.stringify({ version }, null, 2)

  return {
    name: 'app-version',
    config() {
      return {
        define: {
          __APP_VERSION__: JSON.stringify(version),
        },
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/version.json')) {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(payload)
          return
        }
        next()
      })
    },
    writeBundle(options) {
      const outDir = options.dir || path.resolve('dist')
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'version.json'), payload)
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    appVersionPlugin(),
  ],
  server: {
    port: 3000,
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
})
