import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/features/ProductCard';
import { vi } from 'vitest';

const mockAdd = vi.fn();
const mockShowToast = vi.fn();

vi.mock('@/store/cart.store', () => ({
  useCartStore: (selector?: any) => {
    const store = { add: mockAdd };
    if (selector) return selector(store);
    return store;
  },
}));

vi.mock('@/App', () => ({
  useToastContext: () => ({ showToast: mockShowToast }),
}));

vi.mock('@/utils/emoji', () => ({
  getProductEmoji: () => '🌿',
}));

const mockProduct = {
  id: 1,
  name: 'Organic Honey',
  price: 890,
  createdAt: '2024-01-01',
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит название и цену продукта', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Organic Honey')).toBeInTheDocument();
    expect(screen.getByText(/890/)).toBeInTheDocument();
  });

  it('добавляет продукт в корзину при клике', () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockAdd).toHaveBeenCalledWith({
      id: 1,
      name: 'Organic Honey',
      price: 890,
      emoji: '🌿',
    });
  });

  it('показывает toast после добавления в корзину', () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockShowToast).toHaveBeenCalledWith('Organic Honey добавлен в корзину 🌿');
  });
});