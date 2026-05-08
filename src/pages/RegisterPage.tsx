import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { usersApi } from '@/api/users.api';
import { useAuthStore } from '@/store/auth.store';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getStrength = () => {
    if (!password) return '';
    if (password.length < 6) return 'weak';
    const hasNum = /\d/.test(password);
    const hasSpec = /[!@#$%^&*]/.test(password);
    if (password.length >= 8 && hasNum && hasSpec) return 'strong';
    if (password.length >= 8 || hasNum) return 'medium';
    return 'weak';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) { setError('Пароль минимум 6 символов'); return; }
    if (password !== password2) { setError('Пароли не совпадают'); return; }
    if (!agreed) { setError('Примите условия использования'); return; }

    setLoading(true);
    try {
      await authApi.signup({ name: `${name} ${surname}`.trim(), email, password });
      const { accessToken, refreshToken } = await authApi.login({ email, password });
      localStorage.setItem('refreshToken', refreshToken);
      setAccessToken(accessToken);
      const user = await usersApi.getMe();
      setUser(user);
      navigate('/');
    } catch {
      setError('Этот email уже занят');
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

        <h2 className="auth-card__title">Создать аккаунт</h2>
        <p className="auth-card__sub">Присоединяйтесь к сообществу эко-покупателей</p>

        {error && (
          <div style={{ color: '#e74c3c', fontSize: '.85rem', marginBottom: '16px', padding: '10px 14px', background: '#fff5f5', borderRadius: 'var(--radius)', border: '1px solid #fdd' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="reg-row">
            <div className="form-group">
              <label>Имя</label>
              <input type="text" className="form-input" placeholder="Иван" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input type="text" className="form-input" placeholder="Иванов" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" placeholder="ваш@email.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div className="input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            <div className={`password-strength ${getStrength()}`} />
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <div className="input-wrap">
              <input
                type="password"
                className="form-input"
                placeholder="Повторите пароль"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>Я принимаю <a href="#">условия использования</a> и <a href="#">политику конфиденциальности</a></span>
            </label>
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-card__switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>

      {/* VISUAL */}
      <div className="auth-visual auth-visual--reg">
        <div className="auth-visual__content">
          <div className="auth-visual__icon">🌱</div>
          <h3>Станьте частью<br />эко-сообщества</h3>
          <p>Тысячи людей уже выбирают осознанное потребление вместе с нами</p>
          <div className="auth-visual__stats">
            <div>
              <div className="auth-stat__num">48 000+</div>
              <div className="auth-stat__label">участников</div>
            </div>
            <div>
              <div className="auth-stat__num">120+</div>
              <div className="auth-stat__label">фермеров</div>
            </div>
            <div>
              <div className="auth-stat__num">1 200+</div>
              <div className="auth-stat__label">товаров</div>
            </div>
          </div>
          <div className="auth-visual__quote">
            «Каждая эко-покупка — маленький вклад в большое дело»
          </div>
        </div>
      </div>
    </div>
  );
};