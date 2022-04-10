import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],
  css: {
    preprocessorOptions: {
      additionalData: `@import "src/assets/styles/index.scss"`
    }
  }, 
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'components': resolve(__dirname, './src/components')
    }
  }
  
})
