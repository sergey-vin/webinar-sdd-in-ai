# Roadmap

## Фаза 1: Scaffold + DB + Auth + Layout + Home
Цель: работающий скелет приложения с авторизацией и главным экраном.

- **1.1 Project Bootstrap** — Next.js 15, Tailwind, shadcn/ui, дизайн-токены, Supabase helpers
- **1.2 Database + Seed** — все таблицы (14), индексы, RLS, seed с 2 demo users и реалистичными данными
- **1.3 Layout + Auth + Trip Timeline** — i18n (EN+RU), AppShell (phone frame + tabs + header), Zustand stores, demo user picker, trip timeline

## Фаза 2: Core Screens
Цель: все основные экраны on-trip companion.

- **2.1 Boarding Pass** — страница деталей leg, boarding pass с QR, mono шрифты для кодов
- **2.2 Schedule (TZ-aware)** — расписание событий, переключатель ship/home/local time, фильтр по категориям
- **2.3 Deck Map** — SVG карты палуб, переключатель палуб, тап по venue -> tooltip
- **2.4 Profile + Locale** — профиль, настройки (TZ, язык), переключение demo users, EN/RU switcher

## Фаза 3: Search + Route + Club
Цель: поиск, планирование и лояльность.

- **3.1 Search & Compare** — форма поиска, результаты с карточками перевозчиков, фильтр по mode, сортировка по цене/времени
- **3.2 Route Planner** — построение multi-leg маршрута door-to-door
- **3.3 Club Card** — визуальная карта лояльности, tier progress, список привилегий

## Фаза 4: Polish + PWA
Цель: финальная полировка и offline.

- **4.1 PWA + Offline** — manifest.json, service worker, offline indicator, кеширование данных
- **4.2 Final Polish** — loading skeletons, error boundaries, анимации, полные RU переводы, responsive тестирование, обновление спеков

## Milestones
Каждый пункт (1.1, 1.2, ...) — отдельный git commit с Playwright тестом.
