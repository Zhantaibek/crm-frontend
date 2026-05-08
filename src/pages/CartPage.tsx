import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart.store';
import { ordersApi } from '@/api/orders.api';
import { useAuthStore } from '@/store/auth.store';
import { useToastContext } from '@/App';
import { useState } from 'react';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, remove, changeQty, clear, total } = useCartStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const { showToast } = useToastContext();
  const [loading, setLoading] = useState(false);

  const delivery = total() >= 3000 ? 0 : 290;

  const handleCheckout = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setLoading(true);
    try {
      const productIds = items.map((i) => i.id);
      await ordersApi.create({ productIds });
      clear();
      showToast('Заказ оформлен! 🌿');
      navigate('/');
    } catch {
      showToast('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-hero page-hero--cart">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Корзина
          </div>
          <h1 className="page-hero__title">Корзина</h1>
        </div>
      </div>

      <section className="cart-section section">
        <div className="container">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <h3>Корзина пуста</h3>
              <p>Добавьте товары из каталога</p>
              <button className="btn btn--primary" onClick={() => navigate('/catalog')}>
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div className="cart__layout">
              <div>
                {/* Заголовок + кнопка очистки */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>
                    Товары
                  </h2>
                  <button
                    onClick={() => { clear(); showToast('Корзина очищена'); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: '1px solid var(--beige-dark)',
                      background: 'white',
                      color: 'var(--text-mid)',
                      fontSize: '.82rem',
                      cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff5f5';
                      e.currentTarget.style.color = '#e74c3c';
                      e.currentTarget.style.borderColor = '#fdd';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = 'var(--text-mid)';
                      e.currentTarget.style.borderColor = 'var(--beige-dark)';
                    }}
                  >
                    🗑 Очистить всё
                  </button>
                </div>

                {/* Список товаров */}
                <div className="cart__items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item__img">
                        {item.emoji || '🌿'}
                      </div>
                      <div className="cart-item__info">
                        <div className="cart-item__name">{item.name}</div>
                        <div className="cart-item__price">{item.price.toLocaleString()} ₽ / шт</div>
                      </div>
                      <div className="cart-item__qty">
                        <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                      </div>
                      <div className="cart-item__total">
                        {(item.price * item.qty).toLocaleString()} ₽
                      </div>
                      <button className="cart-item__remove" onClick={() => remove(item.id)}>×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="cart__summary">
                <h3>Итого</h3>

                <div className="cart__summary-row">
                  <span>Товаров ({items.reduce((s, i) => s + i.qty, 0)} шт)</span>
                  <span>{total().toLocaleString()} ₽</span>
                </div>

                <div className="cart__summary-row">
                  <span>Доставка</span>
                  <span style={{ color: delivery === 0 ? 'var(--green)' : 'inherit' }}>
                    {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
                  </span>
                </div>

                {total() < 3000 && (
                  <div style={{ fontSize: '.78rem', color: 'var(--green)', marginBottom: '8px' }}>
                    До бесплатной доставки: {(3000 - total()).toLocaleString()} ₽
                  </div>
                )}

                <div className="cart__summary-row cart__summary-row--total">
                  <span>К оплате</span>
                  <span>{(total() + delivery).toLocaleString()} ₽</span>
                </div>

                <div className="cart-promo">
                  <input type="text" className="promo-input" placeholder="Промокод" />
                  <button className="promo-apply">Применить</button>
                </div>

                <button
                  className="btn btn--primary btn--full"
                  style={{ marginTop: '16px' }}
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Оформляем...' : 'Оформить заказ'}
                </button>

                <button
                  className="btn btn--ghost btn--full"
                  style={{ marginTop: '8px' }}
                  onClick={() => navigate('/catalog')}
                >
                  Продолжить покупки
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};