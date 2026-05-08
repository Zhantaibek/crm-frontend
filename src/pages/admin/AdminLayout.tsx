import { Outlet, NavLink } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>Админ панель</h3>
        <nav>
          <NavLink to="/admin/users">Пользователи</NavLink>
          <NavLink to="/admin/products">Товары</NavLink>
          <NavLink to="/admin/orders">Заказы</NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};