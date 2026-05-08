import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="logo logo--white">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="var(--green-light)" strokeWidth="1.5"/>
                <path d="M10 22 Q14 12 18 14 Q22 16 18 10 Q24 14 26 22" stroke="var(--green-light)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span>ЗемляNova</span>
            </Link>
            <p>Эко-товары для питания, красоты и дома. С любовью к природе и людям.</p>
          </div>

          <div className="footer__nav">
            <div className="footer__nav-col">
              <h5>Магазин</h5>
              <Link to="/catalog">Каталог</Link>
              <a href="#">Новинки</a>
              <a href="#">Акции</a>
              <a href="#">Подписка</a>
            </div>
            <div className="footer__nav-col">
              <h5>О нас</h5>
              <Link to="/about">Компания</Link>
              <Link to="/blog">Блог</Link>
              <a href="#">Партнёрам</a>
              <a href="#">Вакансии</a>
            </div>
            <div className="footer__nav-col">
              <h5>Помощь</h5>
              <Link to="/contacts">Контакты</Link>
              <a href="#">Доставка</a>
              <a href="#">Возврат</a>
              <a href="#">FAQ</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 ЗемляNova. Все права защищены.</span>
          <span>Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  );
};