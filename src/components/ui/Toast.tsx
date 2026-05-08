import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        opacity: visible ? 1 : 0,
        transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'white',
        color: 'var(--dark)',
        padding: '14px 20px',
        borderRadius: '16px',
        fontSize: '.9rem',
        fontWeight: 500,
        boxShadow: '0 8px 40px rgba(30,26,21,.15), 0 2px 8px rgba(30,26,21,.08)',
        border: '1px solid var(--beige-dark)',
        maxWidth: '420px',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{
        width: '36px', height: '36px',
        background: 'var(--green-pale)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem',
        flexShrink: 0,
      }}>
        🌿
      </div>

      <div style={{ flex: 1, fontSize: '.88rem', color: 'var(--text)' }}>
        {message}
      </div>

      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{
          width: '28px', height: '28px',
          borderRadius: '8px',
          background: 'var(--beige-mid)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
          color: 'var(--text-light)',
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );
};