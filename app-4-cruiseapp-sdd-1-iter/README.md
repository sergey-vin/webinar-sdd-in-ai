# CruiseApp

A mobile-first PWA for cruise ship passengers. Browse the entertainment schedule, book cabins, navigate deck maps, track time zones, and plan terminal logistics — all from your phone.

## Features

- **Schedule** — daily events with category filters, personal schedule with reminders
- **Cabin Booking** — browse by deck and type, submit booking requests
- **Deck Maps** — interactive SVG maps with clickable zones and search
- **Time Zones** — dual clock (ship time + home time), timezone change notifications
- **Logistics** — terminal info, transport options (car, taxi, public transit)
- **PWA** — installable, offline-capable via service worker
- **Dark Mode** — toggle between light and dark themes
- **i18n** — Russian and English UI

## Tech Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- shadcn/ui components, Lucide icons
- Zustand for state management
- Mock data (JSON files in `public/data/`)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on [http://localhost:3004](http://localhost:3004).

## Project Structure

```
app/                  # Next.js pages (home, schedule, booking, map, logistics)
components/
  layout/             # Header, bottom nav, theme/locale toggles
  schedule/           # Event cards, filters, my-schedule
  booking/            # Deck selector, cabin cards, booking summary
  map/                # SVG deck map, zone popup, search
  logistics/          # Terminal info, transport options
  ui/                 # shadcn/ui primitives (button, card, badge, tabs)
lib/
  stores/             # Zustand stores (schedule, booking, time, preferences)
  i18n.ts             # Lightweight RU/EN translation system
  types.ts            # TypeScript interfaces
public/
  data/               # Mock JSON data (events, cabins, deck maps, terminal)
  manifest.json       # PWA manifest
  sw.js               # Service worker
sdd/specs/            # Product specs (mission, roadmap, tech stack)
```

## Design

Mobile-first (320px-1440px), cruise-themed palette:

| Token | Color |
|-------|-------|
| Navy | `#1a365d` |
| Gold | `#d4a574` |
| Ocean | `#f0f7ff` |

Fonts: Inter (UI), Playfair Display (headings).

## License

MIT
