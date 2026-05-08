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
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button className="btn btn--ghost" onClick={() => deleteMutation.mutate(u.id)} disabled={deleteMutation.isPending}>
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