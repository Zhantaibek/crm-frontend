import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/features/ProductCard';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Все', 'Питание', 'Косметика', 'Дом', 'Растения'];

const getCategoryByName = (name: string): string => {
  if (name.includes('чай') || name.includes('мёд') || name.includes('джем') ||
      name.includes('полба') || name.includes('паста') || name.includes('иван')) return 'Питание';
  if (name.includes('масло ши') || name.includes('розовая') || name.includes('подсолнечника')) return 'Косметика';
  if (name.includes('мыло') || name.includes('мочалка')) return 'Дом';
  if (name.includes('биогумус')) return 'Растения';
  return 'Питание';
};

export const CatalogPage = () => {
  const { data: products, isLoading, isError } = useProducts();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(10000);

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (activeCategory !== 'Все') {
      result = result.filter((p) => getCategoryByName(p.name.toLowerCase()) === activeCategory);
    }

    result = result.filter((p) => Number(p.price) <= maxPrice);

    if (sortBy === 'price_asc') result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === 'price_desc') result.sort((a, b) => Number(b.price) - Number(a.price));

    return result;
  }, [products, activeCategory, sortBy, maxPrice]);

  return (
    <div>
      <div className="page-hero page-hero--catalog">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Каталог
          </div>
          <h1 className="page-hero__title">Каталог товаров</h1>
          <p>Более 1 200 проверенных эко-товаров</p>
        </div>
      </div>

      <section className="catalog-section section">
        <div className="container">
          <div className="catalog__layout">

            {/* SIDEBAR */}
            <aside className="catalog__sidebar">
              <div className="filter-block">
                <h4>Категории</h4>
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="filter-check" onClick={() => setActiveCategory(cat)}>
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>

              <div className="filter-block">
                <h4>Цена до {maxPrice.toLocaleString()} ₽</h4>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="price-range__labels">
                  <span>0 ₽</span>
                  <span>10 000 ₽</span>
                </div>
              </div>
            </aside>

            {/* PRODUCTS */}
            <div className="catalog__main">
              <div className="catalog__toolbar">
                <span className="catalog__count">Показано {filtered.length} товаров</span>
                <select
                  className="catalog__sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">По популярности</option>
                  <option value="price_asc">По цене (возр.)</option>
                  <option value="price_desc">По цене (убыв.)</option>
                </select>
              </div>

              {isLoading && <div className="loading">Загрузка...</div>}
              {isError && <div className="error">Ошибка загрузки товаров</div>}

              <div className="products-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filtered.length === 0 && !isLoading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-mid)' }}>
                  Товары не найдены. Попробуйте изменить фильтры.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};