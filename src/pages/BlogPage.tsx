import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import type { Post } from '@/types/post.types';

const CATEGORIES = ['Все', 'Питание', 'Косметика', 'Дом', 'Интервью', 'Рецепты'];

const IMGS = ['blog-full-card__img--1', 'blog-full-card__img--2', 'blog-full-card__img--3',
              'blog-full-card__img--4', 'blog-full-card__img--5', 'blog-full-card__img--6'];

export const BlogPage = () => {
  const { data: posts, isLoading } = usePosts();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filtered = activeCategory === 'Все'
    ? posts
    : posts?.filter((p) => p.category === activeCategory);

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

          {isLoading && <div>Загрузка...</div>}

          <div className="blog__grid">
            {filtered?.map((post, i) => (
              <article
                key={post.id}
                className="blog-full-card"
                onClick={() => setSelectedPost(post)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`blog-full-card__img ${IMGS[i % IMGS.length]}`}>
                  <div className="blog-full-card__tag">{post.category}</div>
                </div>
                <div className="blog-full-card__body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-full-card__footer">
                    <span>{new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedPost && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(30,26,21,.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            style={{
              background: 'var(--cream)', borderRadius: 'var(--radius-lg)',
              padding: '48px', maxWidth: '680px', width: '100%',
              maxHeight: '80vh', overflowY: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'var(--beige-mid)', border: 'none',
                width: '36px', height: '36px', borderRadius: '50%',
                fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>

            <div className="section-tag" style={{ marginBottom: '16px', display: 'inline-block' }}>
              {selectedPost.category}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>
              {selectedPost.title}
            </h2>

            <div style={{ display: 'flex', gap: '16px', fontSize: '.8rem', color: 'var(--text-light)', marginBottom: '24px' }}>
              <span>{new Date(selectedPost.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '16px' }}>
              {selectedPost.excerpt}
            </p>

            <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '1rem' }}>
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};