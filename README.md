CRM Frontend
Фронтенд для эко-маркета ЗемляNova — построен на React + TypeScript + Vite.
Стек

React 19 + TypeScript
Vite — сборщик
React Router v7 — роутинг
Zustand — глобальный стейт (авторизация, корзина)
TanStack Query — серверный стейт и кэширование
Axios — HTTP клиент с interceptors
Zod — валидация форм
Vitest + React Testing Library — тесты

Структура проекта
src/
├── api/              # HTTP клиент и методы запросов
│   ├── client.ts     # Axios инстанс с interceptors (auth + refresh)
│   ├── auth.api.ts
│   ├── products.api.ts
│   ├── orders.api.ts
│   └── users.api.ts
├── components/
│   ├── features/     # ProductCard, OrderCard, CartItem
│   ├── layout/       # Header, Footer
│   └── ui/           # Toast, Skeleton, ErrorBoundary
├── hooks/            # useProducts, useOrders, useUsers, useForm, useToast
├── pages/
│   ├── admin/        # AdminLayout, ProductsPage, OrdersPage, UsersPage
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   ├── CartPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   ├── BlogPage.tsx
│   ├── AboutPage.tsx
│   └── ContactsPage.tsx
├── router/           # PrivateRoute, AdminRoute, index.tsx
├── store/            # auth.store.ts, cart.store.ts
├── styles/           # global.css, variables.css
├── tests/            # Vitest тесты
├── types/            # TypeScript типы
└── utils/            # emoji.ts, validation.ts
Быстрый старт
bash# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для продакшена
npm run build
Приложение запустится на http://localhost:5173

Убедитесь что бэкенд запущен на http://localhost:5000

Переменные окружения
Создай .env файл в корне:
VITE_API_URL=http://localhost:5000
Тесты
bash# Запустить все тесты
npm test

# Запустить в watch режиме
npm run test:ui
Покрыто тестами:

LoginPage — рендер, валидация, логин, редирект
ProductCard — рендер, добавление в корзину, toast
cart.store — add, remove, clear, total, count, changeQty

Функциональность
Публичные страницы:

Главная с категориями и хитами продаж
Каталог с фильтрацией по категории, цене и поиском
Блог, О нас, Контакты

Авторизация:

Регистрация с подтверждением email
Вход / выход
Автоматическое обновление access token через refresh token
Восстановление сессии при перезагрузке страницы

Личный кабинет:

Просмотр и редактирование профиля
История заказов

Корзина:

Добавление / удаление товаров
Изменение количества
Бесплатная доставка от 3000 ₽
Оформление заказа

Админ панель (только для роли admin):

Управление товарами (CRUD)
Просмотр и удаление заказов
Управление пользователями

Роутинг
ПутьДоступОписание/ВсеГлавная/catalogВсеКаталог товаров/cartАвторизованКорзина/profileАвторизованЛичный кабинет/loginГостьВход/registerГостьРегистрация/admin/productsАдминУправление товарами/admin/ordersАдминУправление заказами/admin/usersАдминУправление пользователями
Авторизация и токены
Axios interceptor автоматически:

Добавляет Authorization: Bearer <token> к каждому запросу
При получении 401 обновляет access token через refresh token
При неудаче — разлогинивает и редиректит на /login

Состояние авторизации хранится в Zustand (auth.store.ts), корзина персистируется в localStorage через zustand/middleware/persist.