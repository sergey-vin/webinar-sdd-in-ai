# Фаза 1: Скелет — План

## 1. Инициализация проекта
- [ ] `create-next-app` с TypeScript, Tailwind, App Router
- [ ] Настройка pnpm
- [ ] Подключение ESLint + Prettier
- [ ] Настройка PWA (next-pwa / @serwist/next)
- [ ] Настройка next-intl (ru/en), файлы переводов

## 2. Supabase
- [ ] Инициализация Supabase (supabase init)
- [ ] Настройка клиента (@supabase/ssr)
- [ ] Supabase Auth: email+password
- [ ] Middleware для защиты роутов

## 3. Схема БД (с заделом на фазы 2-3)
- [ ] Миграция: таблица `profiles` (id, email, display_name, role: user/premium, language, avatar_url, transport_preferences, notification_settings)
- [ ] Миграция: таблица `cities` (id, name_ru, name_en, country, timezone, lat, lng)
- [ ] Миграция: таблица `transport_types` (id, name_ru, name_en, icon)
- [ ] Миграция: таблица `routes` (id, origin_city_id, destination_city_id, transport_type_id, operator, departure_time, arrival_time, price_eur, class)
- [ ] Миграция: таблица `route_segments` (id, route_id, sequence, origin_city_id, destination_city_id, transport_type_id, departure_time, arrival_time, price_eur)
- [ ] RLS-политики для profiles (users read/update own)
- [ ] RLS-политики для cities, transport_types, routes, route_segments (public read)

## 4. Тестовые пользователи
- [ ] Seed: user_a — обычный пользователь (user@cuthere.test / test123)
- [ ] Seed: user_b — премиум пользователь (premium@cuthere.test / test123), с картами лояльности и милями
- [ ] UI-переключатель между юзерами в профиле (dev-only)

## 5. Навигация и страницы
- [ ] Layout: bottom tabs (mobile) / top navbar (desktop)
- [ ] Табы: Поиск, Мои маршруты, Цены, Профиль
- [ ] Страница Поиск — заглушка с placeholder
- [ ] Страница Мои маршруты — заглушка
- [ ] Страница Цены — заглушка
- [ ] Страница Профиль: имя, email, язык, аватар, настройки уведомлений, предпочтения транспорта, переключатель юзеров, кнопка выхода

## 6. Визуальный стиль
- [ ] Подключение shadcn/ui
- [ ] Настройка темы: коралловый (#FF6B6B) акцент, скруглённые углы
- [ ] Шрифт Inter / Nunito
- [ ] Базовые компоненты: Button, Card, Input, Tabs, Avatar

## 7. Playwright
- [ ] Установка и настройка Playwright
- [ ] Smoke-тест: логин user_a, переход по табам
- [ ] Smoke-тест: переключение юзера в профиле
- [ ] Smoke-тест: переключение языка ru/en
