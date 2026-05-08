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
            <tr><th>ID</th><th>Пользователь</th><th>Товары</th><th>Дата</th><th></th></tr>
          </thead>
          <tbody>
            {orders?.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.userId}</td>
                <td>{o.products.map((p) => p.product.name).join(', ')}</td>
                <td>{new Date(o.createAt).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button className="btn btn--ghost" onClick={() => deleteMutation.mutate(o.id)} disabled={deleteMutation.isPending}>
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