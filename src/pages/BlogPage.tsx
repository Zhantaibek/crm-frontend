import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Все', 'Питание', 'Косметика', 'Дом', 'Интервью', 'Рецепты'];

const POSTS = [
  { id: 1, cat: 'Питание', img: 'blog-full-card__img--1', title: '10 суперфудов, которые изменят ваше утро', desc: 'Разбираемся, что такое суперфуды и как их легко ввести в ежедневный рацион без стресса и больших затрат. Чиа, спирулина, ашваганда — объясняем простым языком.', date: '12 апреля 2026', time: '8 мин чтения' },
  { id: 2, cat: 'Дом', img: 'blog-full-card__img--2', title: 'Чистота без химии: полное руководство по эко-уборке', desc: 'Сода, уксус, лимон и эфирные масла против агрессивной бытовой химии. Проверяем на практике и делимся результатами.', date: '5 апреля 2026', time: '6 мин чтения' },
  { id: 3, cat: 'Косметика', img: 'blog-full-card__img--3', title: 'Натуральная косметика: мифы и реальность', desc: 'Разбираем главные заблуждения о «натуральном» на этикетке и учимся читать составы правильно.', date: '28 марта 2026', time: '5 мин чтения' },
  { id: 4, cat: 'Интервью', img: 'blog-full-card__img--4', title: '«Фермерство — это не ностальгия, это будущее»', desc: 'Разговор с Иваном Лесовым о том, как органическое земледелие меняет деревню и почему молодёжь возвращается на землю.', date: '20 марта 2026', time: '10 мин чтения' },
  { id: 5, cat: 'Рецепты', img: 'blog-full-card__img--5', title: '5 рецептов с суперфудами на каждый день', desc: 'Быстрые и вкусные блюда из наших товаров. Смузи с чиа, каша с годжи, тост с авокадо и многое другое.', date: '15 марта 2026', time: '4 мин чтения' },
  { id: 6, cat: 'Дом', img: 'blog-full-card__img--6', title: 'Упаковка будущего: как мы отказались от пластика', desc: 'История нашего перехода на биоразлагаемую упаковку. Что сработало, что нет, и как это повлияло на доставку.', date: '8 марта 2026', time: '7 мин чтения' },
];

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('Все');

  const filtered = activeCategory === 'Все'
    ? POSTS
    : POSTS.filter((p) => p.cat === activeCategory);

  return (
    <div>
      <div className="page-hero page-hero--blog">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Блог
          </div>
          <h1 className="page-hero__title">Блог об эко-жизни</h1>
          <p>Рецепты, советы, истории — всё для осознанного потребления</p>
        </div>
      </div>

      <section className="blog-section section">
        <div className="container">
          <div className="blog__categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog__grid">
            {filtered.map((post) => (
              <article className="blog-full-card" key={post.id}>
                <div className={`blog-full-card__img ${post.img}`}>
                  <div className="blog-full-card__tag">{post.cat}</div>
                </div>
                <div className="blog-full-card__body">
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <div className="blog-full-card__footer">
                    <span>{post.date}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};