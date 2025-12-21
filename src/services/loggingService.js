// Используем axios напрямую из библиотеки, а не из кастомного файла
import axios from 'axios';

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Отправляет лог на сервер.
 * @param {string} level - Уровень лога (INFO, WARN, ERROR).
 * @param {string} message - Сообщение лога.
 * @param {object} [context={}] - Дополнительный контекст (например, имя компонента, данные об ошибке).
 */
const sendLogToServer = async (level, message, context = {}) => {
  try {
    // Выводим лог в консоль для локальной отладки
    console[level.toLowerCase()]?.(`[${level}] ${message}`, context);

    // Отправляем лог на сервер. Используем относительный URL, который будет обработан прокси.
    await axios.post('/api/logs', { // Добавляем префикс /api для прокси
      level,
      message,
      timestamp: new Date().toISOString(),
      context: {
        ...context,
        userAgent: navigator.userAgent,
        location: window.location.pathname,
      },
    });
  } catch (error) {
    // Если отправка лога не удалась, выводим ошибку в консоль,
    // чтобы не попасть в бесконечный цикл логирования ошибок.
    console.error('Failed to send log to server:', error);
  }
};

// Создаем удобные методы для каждого уровня логирования
const logger = {
  info: (message, context) => sendLogToServer(LOG_LEVELS.INFO, message, context),
  warn: (message, context) => sendLogToServer(LOG_LEVELS.WARN, message, context),
  error: (message, context) => sendLogToServer(LOG_LEVELS.ERROR, message, context),
};

export default logger;
