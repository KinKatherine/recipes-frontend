// src/services/loggingService.test.js
import { describe, it, expect, vi } from 'vitest';
import logger from './loggingService';
import axios from 'axios'; // Импортируем напрямую

// "Мокаем" (подменяем) модуль axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(), // Подменяем только post-метод
  },
}));

describe('loggingService', () => {
  it('should send an INFO log to the server with correct data', async () => {
    const message = 'User logged in';
    const context = { userId: 123 };

    await logger.info(message, context);

    expect(axios.post).toHaveBeenCalled();
    // Проверяем, что URL теперь содержит /api
    expect(axios.post).toHaveBeenCalledWith('/api/logs', expect.any(Object));

    const sentData = axios.post.mock.calls[0][1];
    expect(sentData.level).toBe('INFO');
    expect(sentData.message).toBe(message);
    expect(sentData.context.userId).toBe(123);
  });
});
