import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/api/products.api';
import { ProductCard } from '@/components/features/ProductCard';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__noise" />
          <div className="hero__circle hero__circle--1" />
          <div className="hero__circle hero__circle--2" />
          <div className="hero__circle hero__circle--3" />
        </div>
        <div className="hero__content">
          <div className="hero__badge">🌿 100% натуральное</div>
          <h1 className="hero__title">Живите <em>в согласии</em><br />с природой</h1>
          <p className="hero__sub">
            Эко-товары для питания, дома и красоты — всё проверено и сертифицировано. Без компромиссов с планетой.
          </p>
          <div className="hero__btns">
            <Link to="/catalog" className="btn btn--primary">Перейти в каталог</Link>
            <Link to="/about" className="btn btn--ghost">Узнать о нас</Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__product-card hero__product-card--1">
            <div className="hero__product-img">🫙</div>
            <div>
              <div className="hero__product-name">Органический мёд</div>
              <div className="hero__product-price">890 ₽</div>
            </div>
          </div>
          <div className="hero__product-card hero__product-card--2">
            <div className="hero__product-img">🧴</div>
            <div>
              <div className="hero__product-name">Натуральный уход</div>
              <div className="hero__product-price">1 290 ₽</div>
            </div>
          </div>
          <div className="hero__product-card hero__product-card--3">
            <div className="hero__product-img">🌿</div>
            <div>
              <div className="hero__product-name">Травяной чай</div>
              <div className="hero__product-price">490 ₽</div>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <div className="scroll-line" />
          <span>Прокрутить</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stats__item">
              <div className="stats__num">1 200+</div>
              <div className="stats__label">Эко-товаров</div>
            </div>
            <div className="stats__divider" />
            <div className="stats__item">
              <div className="stats__num">48 000+</div>
              <div className="stats__label">Довольных покупателей</div>
            </div>
            <div className="stats__divider" />
            <div className="stats__item">
              <div className="stats__num">120+</div>
              <div className="stats__label">Поставщиков-фермеров</div>
            </div>
            <div className="stats__divider" />
            <div className="stats__item">
              <div className="stats__num">6 лет</div>
              <div className="stats__label">На рынке</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Ассортимент</div>
            <h2 className="section-title">Категории товаров</h2>
          </div>
          <div className="categories__grid">
            <div className="cat-card cat-card--large">
              <div className="cat-card__emoji">🥗</div>
              <h3>Эко-питание</h3>
              <p>Органические продукты, суперфуды, натуральные сладости</p>
              <span className="cat-card__count">430 товаров</span>
              <span className="cat-card__arrow">→</span>
            </div>
            <div className="cat-card">
              <div className="cat-card__emoji">🧴</div>
              <h3>Косметика</h3>
              <p>Натуральный уход без химии</p>
              <span className="cat-card__count">280 товаров</span>
              <span className="cat-card__arrow">→</span>
            </div>
            <div className="cat-card">
              <div className="cat-card__emoji">🏡</div>
              <h3>Дом и быт</h3>
              <p>Эко-средства для уборки и быта</p>
              <span className="cat-card__count">310 товаров</span>
              <span className="cat-card__arrow">→</span>
            </div>
            <div className="cat-card">
              <div className="cat-card__emoji">🌱</div>
              <h3>Растения и сад</h3>
              <p>Семена, удобрения, грунт</p>
              <span className="cat-card__count">180 товаров</span>
              <span className="cat-card__arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Популярное</div>
            <h2 className="section-title">Хиты продаж</h2>
            <Link to="/catalog" className="btn btn--outline">Весь каталог</Link>
          </div>
          <div className="products-grid">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why section">
        <div className="container">
          <div className="why__inner">
            <div className="why__left">
              <div className="section-tag">Почему мы</div>
              <h2 className="section-title">Философия<br /><em>ЗемляNova</em></h2>
              <p className="why__text">
                Мы верим, что экологичный выбор не должен быть жертвой. Каждый товар проходит строгую проверку на натуральность, безопасность и этичность производства.
              </p>
              <Link to="/about" className="btn btn--primary">О нас подробнее</Link>
            </div>
            <div className="why__right">
              {[
                { icon: '🌿', title: 'Сертифицировано', desc: 'Все товары имеют экологические сертификаты и проходят лабораторный контроль' },
                { icon: '🚚', title: 'Доставка без пластика', desc: 'Упаковываем в биоразлагаемые материалы, доставляем бережно' },
                { icon: '🤝', title: 'Прямо от фермера', desc: 'Работаем напрямую с 120+ российскими фермерами и мастерами' },
                { icon: '♻️', title: '1% — природе', desc: 'С каждой покупки 1% направляется на восстановление лесов России' },
              ].map((f) => (
                <div className="why__feature" key={f.title}>
                  <div className="why__icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Отзывы</div>
            <h2 className="section-title">Что говорят покупатели</h2>
          </div>
          <div className="testimonials__grid">
            {[
              { initials: 'АС', name: 'Анна С.', city: 'Москва', text: '«Наконец-то нашла магазин, где всё действительно натуральное. Заказываю уже третий раз — качество стабильное, упаковка экологичная.»', accent: false },
              { initials: 'МК', name: 'Михаил К.', city: 'Санкт-Петербург', text: '«Органический мёд — просто бомба. Никакого сравнения с магазинным. Сделал подписку на ежемесячную доставку.»', accent: true },
              { initials: 'ЕВ', name: 'Елена В.', city: 'Екатеринбург', text: '«Перевела весь дом на эко-средства через ЗемляNova. Дети меньше болеют, воздух дома стал другим. Рекомендую всем!»', accent: false },
            ].map((r) => (
              <div className={`review-card ${r.accent ? 'review-card--accent' : ''}`} key={r.name}>
                <div className="review-card__stars">★★★★★</div>
                <p>{r.text}</p>
                <div className="review-card__author">
                  <div className="review-card__avatar">{r.initials}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="blog-preview section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Блог</div>
            <h2 className="section-title">Статьи об эко-жизни</h2>
            <Link to="/blog" className="btn btn--outline">Все статьи</Link>
          </div>
          <div className="blog-preview__grid">
            <article className="blog-card blog-card--large">
              <div className="blog-card__img blog-card__img--1">
                <div className="blog-card__tag">Питание</div>
              </div>
              <div className="blog-card__body">
                <h3>10 суперфудов, которые изменят ваше утро</h3>
                <p>Разбираемся, что такое суперфуды и как их легко ввести в ежедневный рацион без стресса и больших затрат.</p>
                <span className="blog-card__date">12 апреля 2026</span>
              </div>
            </article>
            <article className="blog-card">
              <div className="blog-card__img blog-card__img--2">
                <div className="blog-card__tag">Дом</div>
              </div>
              <div className="blog-card__body">
                <h3>Чистота без химии: эко-уборка</h3>
                <span className="blog-card__date">5 апреля 2026</span>
              </div>
            </article>
            <article className="blog-card">
              <div className="blog-card__img blog-card__img--3">
                <div className="blog-card__tag">Косметика</div>
              </div>
              <div className="blog-card__body">
                <h3>Натуральная косметика: мифы и факты</h3>
                <span className="blog-card__date">28 марта 2026</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section">
        <div className="container">
          <div className="cta__inner">
            <div className="cta__content">
              <h2>Подпишитесь на рассылку</h2>
              <p>Получайте рецепты, советы по эко-жизни и эксклюзивные скидки первыми</p>
            </div>
            <div className="cta__form">
              <input type="email" placeholder="ваш@email.ru" className="cta__input" />
              <button className="btn btn--primary">Подписаться</button>
            </div>
            <div className="cta__bg-text">ECO</div>
          </div>
        </div>
      </section>
    </div>
  );
};