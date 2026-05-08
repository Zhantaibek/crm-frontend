import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import { createContext, useContext } from 'react';

interface ToastContextType {
  showToast: (msg: string) => void;
}

export const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToastContext = () => useContext(ToastContext);

export const App = () => {
  const { message, showToast, hideToast } = useToast();

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