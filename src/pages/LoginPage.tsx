import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { usersApi } from '@/api/users.api';
import { useAuthStore } from '@/store/auth.store';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await authApi.login({ email, password });
      localStorage.setItem('refreshToken', refreshToken);
      setAccessToken(accessToken);
      const user = await usersApi.getMe();
      setUser(user);
      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* FORM */}
      <div className="auth-card">
        <Link to="/" className="auth-card__logo">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="var(--green)" strokeWidth="1.5"/>
            <path d="M10 22 Q14 12 18 14 Q22 16 18 10 Q24 14 26 22" stroke="var(--green)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <span>ЗемляNova</span>
        </Link>

        <h2 className="auth-card__title">Добро пожаловать!</h2>
        <p className="auth-card__sub">Войдите, чтобы делать покупки и отслеживать заказы</p>

        {error && (
          <div style={{ color: '#e74c3c', fontSize: '.85rem', marginBottom: '16px', padding: '10px 14px', background: '#fff5f5', borderRadius: 'var(--radius)', border: '1px solid #fdd' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="ваш@email.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div className="input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div className="auth-card__forgot">
            <a href="#">Забыли пароль?</a>
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="auth-card__switch">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>

      {/* VISUAL */}
      <div className="auth-visual">
        <div className="auth-visual__content">
          <div className="auth-visual__icon">🌿</div>
          <h3>Живите в согласии<br />с природой</h3>
          <p>Более 1 200 эко-товаров с доставкой по всей России</p>
          <div className="auth-visual__perks">
            <div className="auth-perk">✓ Бесплатная доставка от 3 000 ₽</div>
            <div className="auth-perk">✓ Накопительные баллы за покупки</div>
            <div className="auth-perk">✓ Эксклюзивные скидки для участников</div>
            <div className="auth-perk">✓ Отслеживание заказов онлайн</div>
          </div>
        </div>
      </div>
    </div>
  );
};