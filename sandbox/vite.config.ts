import { defineConfig } from 'vite'
import path from 'path'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@bedard/pathfinder': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
