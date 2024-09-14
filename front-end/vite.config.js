import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  css: {
    postcss: './postcss.config.js',  // Đường dẫn tới file PostCSS config
  },
})
