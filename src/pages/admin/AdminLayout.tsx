import { Outlet, NavLink, Link } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', fontSize: '.88rem', opacity: .6 }}>
            ← На сайт
          </Link>
        </div>

        <h3>Панель управления</h3>
        <nav>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            📦 Товары
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            🛒 Заказы
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            👥 Пользователи
          </NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};