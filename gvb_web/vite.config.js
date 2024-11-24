import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Icons from 'unplugin-icons/vite'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const baseUrl = env.VITE_API
  return defineConfig({
    envPrefix: ["VITE_"],
    plugins: [
      vue(),
      Icons({
        autoInstall: true,
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      hmr: {
        overlay: false
      },
      open: true,
      proxy: {
        '/uploads': {
          target: 'http://47.121.115.146:5001',
        },
        // 本地后端代理
        "/api": {
          //要访问的跨域的域名
          target: "http://47.121.115.146:5001",
        },
      },

    }
  }
  )

}

