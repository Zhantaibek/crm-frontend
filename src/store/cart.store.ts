
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartProduct {
  id: number;
  name: string;
  price: number;
  emoji?: string;
}

interface CartItem extends CartProduct {
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (product: CartProduct) => void;
  remove: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, qty: 1 }] });
        }
      },

      remove: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      changeQty: (id, delta) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        if (item.qty + delta <= 0) {
          get().remove(id);
        } else {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, qty: i.qty + delta } : i
            ),
          });
        }
      },

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      count: () =>
        get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: 'cart',
    }
  )
);