import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/api/auth.api';
import { usersApi } from '@/api/users.api';

interface ToastContextType {
  showToast: (msg: string) => void;
}

export const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToastContext = () => useContext(ToastContext);

export const App = () => {
  const { message, showToast, hideToast } = useToast();
  const { setAccessToken, setUser } = useAuthStore();

  useEffect(() => {
    const restoreSession = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return;

      try {
        const { accessToken } = await authApi.refresh(refreshToken);
        setAccessToken(accessToken);
        const user = await usersApi.getMe();
        setUser(user);
      } catch {
        localStorage.removeItem('refreshToken');
      }
    };

    restoreSession();
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="app">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        {message && <Toast message={message} onClose={hideToast} />}
      </div>
    </ToastContext.Provider>
  );
};