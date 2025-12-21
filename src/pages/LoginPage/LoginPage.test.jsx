import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

describe('LoginPage Component', () => {
  it('should render the login form with a title', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );

    // Ищем заголовок на странице
    const titleElement = screen.getByRole('heading', { name: /вход в систему/i });
    expect(titleElement).toBeInTheDocument();
  });
});
