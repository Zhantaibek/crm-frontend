import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToastContext } from '@/App';

export const ContactsPage = () => {
  const { showToast } = useToastContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Вопрос о товаре');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      showToast('Заполните все поля');
      return;
    }
    showToast('Сообщение отправлено! ✅');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <div className="page-hero page-hero--contacts">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Контакты
          </div>
          <h1 className="page-hero__title">Свяжитесь с нами</h1>
        </div>
      </div>

      <section className="contacts-section section">
        <div className="container">
          <div className="contacts__layout">
            <div className="contacts__info">
              <h2>Мы всегда на связи</h2>
              <p>Есть вопрос о товаре, доставке или сотрудничестве? Напишите нам — ответим в течение нескольких часов.</p>

              {[
                { icon: '📧', label: 'Email', content: <a href="mailto:hello@zemlyanova.ru">hello@zemlyanova.ru</a> },
                { icon: '📞', label: 'Телефон', content: <a href="tel:+74951234567">+7 (495) 123-45-67</a> },
                { icon: '🕐', label: 'Режим работы', content: <span>Пн–Пт: 9:00 – 20:00<br />Сб–Вс: 10:00 – 18:00</span> },
                { icon: '📍', label: 'Пункт выдачи', content: <span>Москва, ул. Органическая, 7</span> },
              ].map((item) => (
                <div className="contact-item" key={item.label}>
                  <div className="contact-item__icon">{item.icon}</div>
                  <div>
                    <strong>{item.label}</strong>
                    {item.content}
                  </div>
                </div>
              ))}

              <div className="contacts__social">
                <a href="#" className="social-btn">VK</a>
                <a href="#" className="social-btn">TG</a>
                <a href="#" className="social-btn">WA</a>
              </div>
            </div>

            <div className="contacts__form-wrap">
              <div className="contacts__form">
                <h3>Написать сообщение</h3>
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="ваш@email.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Тема</label>
                  <select
                    className="form-input"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option>Вопрос о товаре</option>
                    <option>Доставка и оплата</option>
                    <option>Сотрудничество</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Сообщение</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Ваш вопрос или предложение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button className="btn btn--primary btn--full" onClick={handleSubmit}>
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};