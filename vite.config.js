import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Единое правило для всех запросов к API (и HTTP, и WebSocket)
      '/api': {
        target: 'http://localhost:3001', // Порт нашего мокового сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true, // Включаем проксирование WebSocket через этот же путь
      },
    },
  },
})
