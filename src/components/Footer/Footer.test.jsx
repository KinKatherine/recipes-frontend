// src/components/Footer/Footer.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

// Оборачиваем компонент в MemoryRouter, так как он может содержать <Link>
import { MemoryRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('should render the copyright text', () => {
    // Рендерим компонент в виртуальном DOM
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Ищем текст на "экране"
    const copyrightElement = screen.getByText(/© 2024 recipies/i);

    // Проверяем, что элемент найден и виден
    expect(copyrightElement).toBeInTheDocument();
  });
});
