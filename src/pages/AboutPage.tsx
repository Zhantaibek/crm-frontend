import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div>
      <div className="page-hero page-hero--about">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / О нас
          </div>
          <h1 className="page-hero__title">О магазине<br /><em>ЗемляNova</em></h1>
        </div>
      </div>

      {/* STORY */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__inner">
            <div className="about-story__visual">
              <div className="about-story__img-wrap">
                <div className="about-story__img-main">🌾</div>
                <div className="about-story__badge-year">2018</div>
                <div className="about-story__img-secondary">🌿</div>
              </div>
            </div>
            <div className="about-story__content">
              <div className="section-tag">Наша история</div>
              <h2 className="section-title">С заботой о людях<br />и планете</h2>
              <p>ЗемляNova началась в 2018 году с небольшого фермерского рынка в Подмосковье. Основатели — агроном Иван Лесов и эколог Мария Зеленцова — хотели создать место, где городской человек может легко получить доступ к чистым, настоящим продуктам.</p>
              <p>Сегодня мы объединяем более 120 фермеров, мастеров и эко-производителей по всей России. Каждый продукт проходит трёхступенчатую проверку: документы, лаборатория, дегустация.</p>
              <div className="about-story__values">
                {[
                  { num: '01', text: 'Честность в составе' },
                  { num: '02', text: 'Поддержка местных' },
                  { num: '03', text: 'Минимальный след' },
                ].map((v) => (
                  <div className="about-story__value" key={v.num}>
                    <div className="about-story__value-num">{v.num}</div>
                    <div>{v.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Команда</div>
            <h2 className="section-title">Люди за проектом</h2>
          </div>
          <div className="team__grid">
            {[
              { emoji: '🌾', name: 'Иван Лесов', role: 'Со-основатель, агроном', desc: '15 лет в органическом земледелии. Лично знаком с каждым фермером-партнёром.' },
              { emoji: '🌿', name: 'Мария Зеленцова', role: 'Со-основатель, эколог', desc: 'Эксперт по сертификации и экологическому законодательству. Автор нашего кодекса качества.' },
              { emoji: '🧪', name: 'Дмитрий Орлов', role: 'Руководитель лаборатории', desc: 'Химик-технолог. Разработал систему проверки товаров в три этапа.' },
              { emoji: '🚚', name: 'Светлана Нова', role: 'Логистика и доставка', desc: 'Выстроила эко-логистику с нулевым пластиком от склада до двери покупателя.' },
            ].map((m) => (
              <div className="team-card" key={m.name}>
                <div className="team-card__avatar">{m.emoji}</div>
                <h3>{m.name}</h3>
                <span>{m.role}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="certifications section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Документы</div>
            <h2 className="section-title">Сертификаты и награды</h2>
          </div>
          <div className="cert-grid">
            {[
              { icon: '🏆', title: 'Лучший эко-маркет 2024', desc: 'Премия «Зелёный бизнес России»' },
              { icon: '📜', title: 'Organic Certified', desc: 'Сертификат IFOAM, действителен до 2027' },
              { icon: '🌍', title: 'B Corp Certified', desc: 'Социально ответственный бизнес' },
              { icon: '♻️', title: 'Zero Waste Partner', desc: 'Ассоциация нулевых отходов России' },
            ].map((c) => (
              <div className="cert-card" key={c.title}>
                <div className="cert-card__icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 