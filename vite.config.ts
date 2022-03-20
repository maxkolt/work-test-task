import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import importElementPlus from 'vite-plugin-element-plus'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), importElementPlus({})],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  base: './'
})
