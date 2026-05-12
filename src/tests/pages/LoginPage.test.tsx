import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { vi } from 'vitest';

// Мокаем authApi
vi.mock('@/api/auth.api', () => ({
  authApi: {
    login: vi.fn(),
    refresh: vi.fn(),
  },
}));

// Мокаем usersApi
vi.mock('@/api/users.api', () => ({
  usersApi: {
    getMe: vi.fn(),
  },
}));

// Мокаем навигацию
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Мокаем auth store
const mockAuthStore = {
  setAccessToken: vi.fn(),
  setUser: vi.fn(),
  user: null,
  accessToken: null,
  logout: vi.fn(),
  isAuthenticated: () => false,
  isAdmin: () => false,
};

vi.mock('@/store/auth.store', () => ({
  useAuthStore: (selector?: any) => {
    if (selector) return selector(mockAuthStore);
    return mockAuthStore;
  },
}));
const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит форму логина', () => {
    renderLoginPage();

    expect(screen.getByPlaceholderText('ваш@email.ru')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('показывает ошибку при пустом email', async () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/email обязателен/i)).toBeInTheDocument();
    });
  });

  it('показывает ошибку сервера при неверных данных', async () => {
    const { authApi } = await import('@/api/auth.api');
    vi.mocked(authApi.login).mockRejectedValueOnce(new Error('Invalid credentials'));

    renderLoginPage();

    fireEvent.change(screen.getByPlaceholderText('ваш@email.ru'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/неверный email или пароль/i)).toBeInTheDocument();
    });
  });

  it('редиректит на главную при успешном логине', async () => {
    const { authApi } = await import('@/api/auth.api');
    const { usersApi } = await import('@/api/users.api');

    vi.mocked(authApi.login).mockResolvedValueOnce({
      accessToken: 'token',
      refreshToken: 'refresh',
    });
    vi.mocked(usersApi.getMe).mockResolvedValueOnce({
      id: 1,
      name: 'Test',
      surname: '',
      email: 'test@test.com',
      role: 'user',
      createdAt: '2024-01-01',
    });

    renderLoginPage();

    fireEvent.change(screen.getByPlaceholderText('ваш@email.ru'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});