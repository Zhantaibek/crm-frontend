import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/features/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategoryByName } from '@/utils/emoji';

const CATEGORIES = ['Все', 'Питание', 'Косметика', 'Дом', 'Растения'];

export const CatalogPage = () => {
  const { data: products, isLoading, isError } = useProducts();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    const s = searchParams.get('search');
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
    if (s) setSearch(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activeCategory !== 'Все') {
      result = result.filter((p) => getCategoryByName(p.name.toLowerCase()) === activeCategory);
    }

    result = result.filter((p) => Number(p.price) <= maxPrice);
    if (sortBy === 'price_asc') result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === 'price_desc') result.sort((a, b) => Number(b.price) - Number(a.price));
    return result;
  }, [products, activeCategory, sortBy, maxPrice, search]);

  return (
    <div>
      <div className="page-hero page-hero--catalog">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Каталог
          </div>
          <h1 className="page-hero__title">Каталог товаров</h1>
          <p>Показано {filtered.length} из {products?.length || 0} товаров</p>
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
                  <label key={cat} className="filter-check">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    {cat}
                    <span>
                      {cat === 'Все'
                        ? products?.length || 0
                        : products?.filter(p => getCategoryByName(p.name.toLowerCase()) === cat).length || 0}
                    </span>
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

              {/* SEARCH */}
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <svg
                  width="18" height="18" viewBox="0 0 20 20" fill="none"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
                >
                  <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 13 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Поиск товаров..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: '42px' }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{
                      position: 'absolute', right: '14px', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', color: 'var(--text-light)',
                      fontSize: '1.1rem',
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

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

              {isLoading && (
                <div className="products-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {isError && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
                  Ошибка загрузки товаров
                </div>
              )}

              {!isLoading && (
                <div className="products-grid">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

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