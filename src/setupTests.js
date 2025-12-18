// src/setupTests.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Расширяем expect функциями из jest-dom (например, toBeInTheDocument)
expect.extend(matchers);

// Автоматически очищаем DOM после каждого теста
afterEach(() => {
  cleanup();
});
