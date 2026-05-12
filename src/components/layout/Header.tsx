import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { authApi } from '@/api/auth.api';

export const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const count = useCartStore((s) => s.count());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try { await authApi.logout(); } finally {
      logout();
      navigate('/login');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="header" id="header">
        <div className="header__inner">
          {/* LOGO */}
          <Link to="/" className="logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="var(--green)" strokeWidth="1.5"/>
              <path d="M10 22 Q14 12 18 14 Q22 16 18 10 Q24 14 26 22" stroke="var(--green)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M10 26 Q18 20 26 26" stroke="var(--brown-light)" strokeWidth="1" fill="none"/>
            </svg>
            <span>ЗемляNova</span>
          </Link>

          {/* NAV */}
          <nav className="nav">
            <Link to="/" className="nav__link">Главная</Link>
            <Link to="/catalog" className="nav__link">Каталог</Link>
            <Link to="/about" className="nav__link">О нас</Link>
            <Link to="/blog" className="nav__link">Блог</Link>
            <Link to="/contacts" className="nav__link">Контакты</Link>
          </nav>

          {/* ACTIONS */}
          <div className="header__actions">

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" title="Поиск" onClick={() => setSearchOpen(!searchOpen)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 13 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {searchOpen && (
                <form
                  onSubmit={handleSearch}
                  style={{
                    position: 'absolute', top: '48px', right: 0,
                    background: 'white', border: '1px solid var(--beige-dark)',
                    borderRadius: 'var(--radius-lg)', padding: '12px',
                    boxShadow: 'var(--shadow-lg)', width: '280px', zIndex: 200,
                    display: 'flex', gap: '8px',
                  }}
                >
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{ padding: '8px 12px', fontSize: '.88rem' }}
                  />
                  <button type="submit" className="btn btn--primary" style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}>
                    Найти
                  </button>
                </form>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="icon-btn" title="Корзина">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2h2l2.5 10h9l2-7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor"/>
                <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor"/>
              </svg>
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>

            {/* AUTH */}
            <div className="auth-area">
              {isAuthenticated() ? (
                <>
                  {isAdmin() && (
                    <Link to="/admin/products" className="nav__link" style={{ fontSize: '.85rem' }}>
                      Админ
                    </Link>
                  )}
                  <div className="user-avatar-btn" title={user?.name} onClick={() => navigate('/profile')}>
                    {user?.name?.[0]?.toUpperCase()}{user?.surname?.[0]?.toUpperCase()}
                  </div>
                  <button
                    className="btn--auth"
                    onClick={handleLogout}
                    style={{ background: 'var(--beige-mid)', color: 'var(--text)', fontSize: '.8rem', padding: '6px 14px' }}
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn--auth">Войти</Link>
              )}
            </div>

            {/* BURGER */}
            <button className="burger" onClick={() => setMobileOpen(!mobileOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Главная</Link>
        <Link to="/catalog" onClick={() => setMobileOpen(false)}>Каталог</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>О нас</Link>
        <Link to="/blog" onClick={() => setMobileOpen(false)}>Блог</Link>
        <Link to="/contacts" onClick={() => setMobileOpen(false)}>Контакты</Link>
        <Link to="/cart" onClick={() => setMobileOpen(false)}>Корзина</Link>
        {isAuthenticated()
          ? <button onClick={() => { handleLogout(); setMobileOpen(false); }}>Выйти</button>
          : <Link to="/login" onClick={() => setMobileOpen(false)}>Войти</Link>
        }
      </div>
    </>
  );
};