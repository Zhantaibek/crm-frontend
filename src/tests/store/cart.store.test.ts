import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/store/cart.store';

const mockProduct = {
  id: 1,
  name: 'Organic Honey',
  price: 890,
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('cart store', () => {
  it('добавляет продукт в корзину', () => {
    useCartStore.getState().add(mockProduct);

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(1);
  });

  it('увеличивает qty если продукт уже в корзине', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().add(mockProduct);

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(2);
  });

  it('удаляет продукт из корзины', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().remove(1);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('очищает корзину', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().add({ id: 2, name: 'Tea', price: 490 });
    useCartStore.getState().clear();

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('считает total правильно', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().add(mockProduct);

    expect(useCartStore.getState().total()).toBe(1780);
  });

  it('считает count правильно', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().add({ id: 2, name: 'Tea', price: 490 });

    expect(useCartStore.getState().count()).toBe(2);
  });

  it('удаляет продукт если qty становится 0', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().changeQty(1, -1);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('изменяет qty продукта', () => {
    useCartStore.getState().add(mockProduct);
    useCartStore.getState().changeQty(1, 2);

    expect(useCartStore.getState().items[0].qty).toBe(3);
  });
});