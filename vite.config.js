/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true, 
      },
    },
  },
  // --- Конфигурация для Vitest ---
  test: {
    globals: true, // Позволяет использовать describe, it, expect без импортов
    environment: 'jsdom', // Имитируем окружение браузера
    setupFiles: './src/setupTests.js', // Файл для начальной настройки
  },
})
