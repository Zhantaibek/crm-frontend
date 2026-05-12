import { useOrders, useDeleteOrder } from '@/hooks/useOrders';

export const OrdersPage = () => {
  const { data: orders, isLoading } = useOrders();
  const deleteMutation = useDeleteOrder();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>Заказы</h1>
      <div className="admin-table">
        <table>
          <thead>
            <tr><th>ID</th><th>Пользователь</th><th>Товары</th><th>Сумма</th><th>Дата</th><th></th></tr>
          </thead>
          <tbody>
            {orders?.map((o) => {
              const sum = o.products.reduce((s, p) => s + Number(p.product.price), 0);
              return (
                <tr key={o.id}>
                  <td style={{ color: 'var(--text-light)' }}>#{o.id}</td>
                  <td style={{ fontWeight: 500 }}>#{o.userId}</td>
                  <td style={{ color: 'var(--text-mid)', maxWidth: '240px' }}>
                    {o.products.map((p) => p.product.name).join(', ')}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--green)' }}>
                    {sum.toLocaleString()} ₽
                  </td>
                  <td style={{ color: 'var(--text-light)' }}>{new Date(o.createAt).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <button
                      onClick={() => deleteMutation.mutate(o.id)}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};