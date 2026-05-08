import { useState } from 'react';
import { useProducts, useCreateProduct, useDeleteProduct } from '@/hooks/useProducts';

export const ProductsPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const { data: products, isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const deleteMutation = useDeleteProduct();

  const handleCreate = () => {
    if (!name || !price) { setError('Заполните все поля'); return; }
    createMutation.mutate(
      { name, price: Number(price) },
      { onSuccess: () => { setName(''); setPrice(''); setError(''); },
        onError: () => setError('Ошибка при создании товара') }
    );
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="admin-page">
      <h1>Товары</h1>
      <div className="admin-form">
        <h3>Добавить товар</h3>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-group">
          <label>Название</label>
          <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название товара" />
        </div>
        <div className="form-group">
          <label>Цена</label>
          <input className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
        </div>
        <button className="btn btn--primary" onClick={handleCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Создаём...' : 'Добавить'}
        </button>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr><th>ID</th><th>Название</th><th>Цена</th><th>Дата</th><th></th></tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{Number(p.price).toLocaleString()} ₽</td>
                <td>{new Date(p.createdAt).toLocaleDateString('ru-RU')}</td>
                <td>
                  <button className="btn btn--ghost" onClick={() => deleteMutation.mutate(p.id)} disabled={deleteMutation.isPending}>
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