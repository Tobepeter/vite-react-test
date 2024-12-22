import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // TODO: 不配置也能用，很奇怪，配置了，但是函数的装饰器又给我传递奇怪的参数，不是标准的装饰器参数来的?
    //  但是不安装这个插件，hmr的装饰器可以用，decorate写的又不能用了，很奇怪
    // react({
    //   babel: {
    //     plugins: [['@babel/plugin-proposal-decorators', { version: '2023-05' }]],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    // open: true,
    host: true,
  },
})
