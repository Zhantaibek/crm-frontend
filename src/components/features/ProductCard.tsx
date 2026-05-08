import type { Product } from '@/types/product.types';
import { useCartStore } from '@/store/cart.store';
import { useToastContext } from '@/App';
import { getProductEmoji } from '@/utils/emoji';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const add = useCartStore((s) => s.add);
  const { showToast } = useToastContext();
  const emoji = getProductEmoji(product.name);

  const handleAdd = () => {
    add({ id: product.id, name: product.name, price: Number(product.price), emoji });
    showToast(`${product.name} добавлен в корзину 🌿`);
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        {emoji}
      </div>
      <div className="product-card__body">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__footer">
          <div className="product-card__price">{Number(product.price).toLocaleString()} ₽</div>
          <button className="product-card__add" onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};