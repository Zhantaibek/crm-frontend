import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--dark)',
      color: 'white',
      padding: '14px 24px',
      borderRadius: '999px',
      fontSize: '.88rem',
      fontWeight: 500,
      zIndex: 9999,
      boxShadow: '0 8px 32px rgba(0,0,0,.2)',
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
};