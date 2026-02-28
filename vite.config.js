import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Allow connections from any host
    cors: true, // Enable CORS for WebSocket connections
    hmr: {
      port: 3001, // Use different port for HMR WebSocket
      clientPort: 3000, // Client connects to this port
      overlay: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
