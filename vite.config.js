import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Проксируем все запросы, начинающиеся с /api
      '/api': {
        // Укажите здесь порт вашего локального бэкенд-сервера
        target: 'http://localhost:3001', 
        changeOrigin: true, // Необходимо для виртуальных хостов
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем /api из пути запроса
      },
      // Проксируем WebSocket-соединения
      '/ws': {
        target: 'ws://localhost:3001', // Укажите порт вашего WebSocket-сервера
        ws: true, // Включаем поддержку WebSocket
      },
    },
  },
})
