import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { usersApi } from '@/api/users.api';
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { registerSchema } from '@/utils/validation';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { values, errors, setValue, validate } = useForm(registerSchema, {
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
    agreed: false,
  });

  const getStrength = () => {
    const p = values.password;
    if (!p) return '';
    if (p.length < 6) return 'weak';
    const hasNum = /\d/.test(p);
    const hasSpec = /[!@#$%^&*]/.test(p);
    if (p.length >= 8 && hasNum && hasSpec) return 'strong';
    if (p.length >= 8 || hasNum) return 'medium';
    return 'weak';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError('');
    setLoading(true);
    try {
      await authApi.signup({ name: values.name, surname: values.surname, email: values.email, password: values.password });
      const { accessToken, refreshToken } = await authApi.login({ email: values.email, password: values.password });
      localStorage.setItem('refreshToken', refreshToken);
      setAccessToken(accessToken);
      const user = await usersApi.getMe();
      setUser(user);
      navigate('/');
    } catch {
      setServerError('Этот email уже занят');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
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

        {serverError && (
          <div style={{ color: '#e74c3c', fontSize: '.85rem', marginBottom: '16px', padding: '10px 14px', background: '#fff5f5', borderRadius: 'var(--radius)', border: '1px solid #fdd' }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="reg-row">
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                className="form-input"
                style={{ borderColor: errors.name ? '#e74c3c' : '' }}
                placeholder="Иван"
                value={values.name}
                onChange={(e) => setValue('name', e.target.value)}
              />
              {errors.name && <div style={{ color: '#e74c3c', fontSize: '.75rem', marginTop: '4px' }}>{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input
                type="text"
                className="form-input"
                placeholder="Иванов"
                value={values.surname}
                onChange={(e) => setValue('surname', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              style={{ borderColor: errors.email ? '#e74c3c' : '' }}
              placeholder="ваш@email.ru"
              value={values.email}
              onChange={(e) => setValue('email', e.target.value)}
            />
            {errors.email && <div style={{ color: '#e74c3c', fontSize: '.75rem', marginTop: '4px' }}>{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <div className="input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                style={{ borderColor: errors.password ? '#e74c3c' : '' }}
                placeholder="Минимум 6 символов"
                value={values.password}
                onChange={(e) => setValue('password', e.target.value)}
              />
              <button type="button" className="input-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            <div className={`password-strength ${getStrength()}`} />
            {errors.password && <div style={{ color: '#e74c3c', fontSize: '.75rem', marginTop: '4px' }}>{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              className="form-input"
              style={{ borderColor: errors.password2 ? '#e74c3c' : '' }}
              placeholder="Повторите пароль"
              value={values.password2}
              onChange={(e) => setValue('password2', e.target.value)}
            />
            {errors.password2 && <div style={{ color: '#e74c3c', fontSize: '.75rem', marginTop: '4px' }}>{errors.password2}</div>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={values.agreed}
                onChange={(e) => setValue('agreed', e.target.checked)}
              />
              <span>Я принимаю <a href="#">условия использования</a> и <a href="#">политику конфиденциальности</a></span>
            </label>
            {errors.agreed && <div style={{ color: '#e74c3c', fontSize: '.75rem', marginTop: '4px' }}>{errors.agreed}</div>}
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-card__switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>

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