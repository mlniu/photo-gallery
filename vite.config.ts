import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  server: {
    // 允许IP访问
    host: "0.0.0.0",
    // 应用端口 (默认:3000)
    port: Number(3100),
    proxy: {
     ['/dev-api']: {
       changeOrigin: true,
       // 接口地址
       //target: "http://localhost:7000",
       target: "https://4d054j3683.imdo.co",
       rewrite: (path) =>
         path.replace(new RegExp("^/dev-api"), ""),
     }
   },
   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
