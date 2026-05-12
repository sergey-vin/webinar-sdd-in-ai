# Tech Stack

## Frontend
- **Framework:** Next.js 15 (App Router)
- **Язык:** TypeScript (strict mode)
- **Стили:** Tailwind CSS v4
- **UI-компоненты:** shadcn/ui (base-nova style)
- **Иконки:** Lucide React
- **Карта палуб:** SVG-based (не canvas, не image map)

## Дизайн
- **Подход:** mobile-first, responsive (320px - 1440px)
- **Phone shell:** 390x800 frame на десктопе для demo-preview
- **Цветовая палитра:**
  - Background: #F4F1EB (warm off-white)
  - Ink: #0E1A2B (primary text)
  - Brand: #0B3D5C (deep harbor blue)
  - Accent: #E8623A (coral)
  - Surface: #FFFFFF, #FAF7F1, #EFEBE2
  - Status: good #2F7A5B, warn #C68B12, bad #B43A3A
- **Типографика:**
  - Inter — UI/body text (latin + cyrillic)
  - Instrument Serif — display headings
  - JetBrains Mono — codes, times, booking refs (latin + cyrillic)
- **Скругления:** xs 6px, sm 10px, md 14px, lg 20px, pill 999px
- **Тени:** sm, md, lg (see globals.css)
- **Анимации:** минимальные, CSS transitions 200-300ms, pulse для live indicators

## Backend
- **БД и Auth:** Supabase (local docker для dev)
- **Auth:** email/password, 2 preset demo users (elena@cuthere.demo, james@cuthere.demo)
- **Data:** seed.sql с реалистичными данными (перевозчики, маршруты, поездки, события)
- **RLS:** включен на всех таблицах

## State & Data
- **Состояние:** Zustand (простой, без boilerplate)
- **i18n:** next-intl (EN + RU), [locale] prefix routing
- **Часовые пояса:** Luxon (DateTime, zone conversion)
- **API:** Supabase client queries (не REST endpoints)

## Тестирование
- **E2E:** Playwright (phone viewport 390x800)
- **Test IDs:** data-testid на всех интерактивных элементах

## Архитектурные решения
- PWA: service worker для офлайн-доступа (Phase 4)
- Все времена хранятся в UTC (TIMESTAMPTZ), отображаются через Luxon
- "Корабельное время" — TZ текущей позиции судна
- "Домашнее время" — TZ из профиля пользователя
- Карта палуб — отдельный SVG на каждую палубу, зоны кликабельны
- Demo auth: signInWithPassword + profile-based user switching

## Ограничения
- Не использовать: jQuery, Bootstrap, Material UI, moment.js
- Не генерировать inline-стили — только Tailwind-классы
- Компоненты: один компонент — один файл
- Типы: lib/types.ts (shared) или co-located
- Не mock JSON в /public/data/ — все через Supabase
