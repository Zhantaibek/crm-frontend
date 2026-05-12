import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: 'var(--cream)',
          fontFamily: 'var(--font-body)',
        }}>
          <div style={{ textAlign: 'center', padding: '40px', maxWidth: '480px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌿</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '12px', color: 'var(--dark)' }}>
              Что-то пошло не так
            </h2>
            <p style={{ color: 'var(--text-mid)', marginBottom: '28px', lineHeight: 1.6 }}>
              Произошла непредвиденная ошибка. Попробуйте обновить страницу.
            </p>
            <button
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}