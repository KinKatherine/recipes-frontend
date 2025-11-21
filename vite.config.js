import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // --- Правило для всех HTTP API-запросов ---
      // Теперь все запросы, начинающиеся с /v1, будут перенаправляться на бэкенд
      '/v1': {
        target: 'http://localhost:3001', // Убедитесь, что порт вашего бэкенда 3001
        changeOrigin: true,
      },
      // --- Правило для WebSocket-соединений чата ---
      '/ws': {
        target: 'ws://localhost:3001', // Убедитесь, что порт вашего бэкенда 3001
        ws: true,
      },
    },
  },
})
