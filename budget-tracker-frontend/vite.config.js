import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Make sure this line is included

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Fix import alias issues
    },
  },
})
