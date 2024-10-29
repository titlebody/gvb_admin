import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const baseUrl = env.VITE_API
  return defineConfig({
    envPrefix: ["VITE_"],
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/uploads': {
          target: 'http://47.121.115.146:5001',
        },
        '/api':{
          target: "http://47.121.115.146:5001",
        }
        
      }
    }
  })

}

