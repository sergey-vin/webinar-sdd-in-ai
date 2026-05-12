# CruiseApp

Mobile-first PWA companion for cruise ship passengers. Browse the entertainment schedule, explore interactive deck maps, book cabins, check terminal logistics, and keep track of ship time vs home time — all from your phone.

Built as an SDD (Specification-Driven Development) demo: specs were written first, then Claude designed the UI, and Claude Code implemented the app.

## Screenshots

<!-- Add screenshots here -->

## Features

- **Trip dashboard** — live ship status, route progress, weather, quick actions
- **Schedule** — daily entertainment filtered by category, personal "My Schedule"
- **Deck maps** — SVG-based interactive maps with search, zone highlights, "you are here"
- **Cabin booking** — browse decks and cabin types, select and send a booking request
- **Terminal logistics** — directions to/from port, route options, check-in info
- **Timezone display** — ship time vs home timezone, set during onboarding
- **Dark mode** — light / dark / auto theme switching
- **Localization** — English and Russian UI

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, CSS variables for design tokens |
| State | Zustand |
| Icons | Lucide React |
| Data | Static JSON mocks in `public/data/` |
| PWA | Service worker + web manifest |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server (port 3005)
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser (best viewed at mobile width).

## Project structure

```
src/
  app/              # Next.js App Router pages
    page.tsx        # Home / Trip dashboard
    schedule/       # Schedule + My Schedule
    map/            # Interactive deck maps
    booking/        # Cabin booking flow
    logistics/      # Terminal logistics
    settings/       # Theme & language
  components/       # Reusable UI components
    layout/         # TabBar, Header
    home/           # HeroCard, QuickActions, etc.
    schedule/       # CategoryFilters, EventCard
    booking/        # DeckSelector, CabinTypeCard, BookingSummary
  store/            # Zustand stores
  messages/         # i18n JSON (en, ru)
  lib/              # Shared types
public/
  data/             # Mock JSON data
  sw.js             # Service worker
  manifest.json     # PWA manifest
sdd/
  specs/            # Original product specs (mission, tech stack, roadmap)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3005 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
