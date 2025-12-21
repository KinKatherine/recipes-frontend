// src/components/Footer/Footer.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Footer Component', () => {
  it('should render the copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // ИСПРАВЛЕНО: Ищем правильный текст, который есть в компоненте
    const copyrightElement = screen.getByText(/@recipes/i);

    expect(copyrightElement).toBeInTheDocument();
  });
});
