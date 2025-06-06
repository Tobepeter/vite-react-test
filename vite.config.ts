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
      // NOTE: 其实esm不允许用 __dirname 的，不知道为什么内部是可以的
      //  但是其实 用 import.meta.url 指向一个很奇怪的位置，在 node_modules/.vite/ 中
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5178,
    // open: true,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果您想要添加全局的 SCSS 变量或 mixin，可以在这里配置
        // additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
})
