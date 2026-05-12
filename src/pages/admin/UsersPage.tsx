import { useUsers, useDeleteUser } from '@/hooks/useUsers';

export const UsersPage = () => {
  const { data: users, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>Пользователи</h1>
      <div className="admin-table">
        <table>
          <thead>
            <tr><th>ID</th><th>Имя</th><th>Email</th><th>Роль</th><th>Дата</th><th></th></tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((u) => (
              <tr key={u.id}>
                <td style={{ color: 'var(--text-light)' }}>#{u.id}</td>
                <td style={{ fontWeight: 500 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge--admin' : 'admin-badge--user'}`}>
                    {u.role}
                  </span>
                </td>
                <td style={{ color: 'var(--text-light)' }}>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button
                    onClick={() => deleteMutation.mutate(u.id)}
                    disabled={deleteMutation.isPending}
                    style={{
                      padding: '6px 14px', borderRadius: '999px',
                      border: '1px solid #fdd', background: '#fff5f5',
                      color: '#e74c3c', fontSize: '.78rem', cursor: 'pointer',
                    }}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};