// src/services/loggingService.test.js
import { describe, it, expect, vi } from 'vitest';
import logger from './loggingService';
import axios from '../api/axios';

// "Мокаем" (подменяем) модуль axios, чтобы он не делал реальных запросов
vi.mock('../api/axios', () => ({
  default: {
    post: vi.fn(), // Подменяем только post-метод
  },
}));

describe('loggingService', () => {
  it('should send an INFO log to the server with correct data', async () => {
    const message = 'User logged in';
    const context = { userId: 123 };

    // Вызываем наш логгер
    await logger.info(message, context);

    // Проверяем, что axios.post был вызван
    expect(axios.post).toHaveBeenCalled();

    // Проверяем, что он был вызван с правильным URL
    expect(axios.post).toHaveBeenCalledWith('/logs', expect.any(Object));

    // Проверяем, что в теле запроса содержатся правильные данные
    const sentData = axios.post.mock.calls[0][1]; // [0][1] - второй аргумент первого вызова
    expect(sentData.level).toBe('INFO');
    expect(sentData.message).toBe(message);
    expect(sentData.context.userId).toBe(123);
  });
});
