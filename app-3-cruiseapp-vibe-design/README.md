# CUThere — Cruise Travel Companion

A mobile-first web app prototype for cruise and ferry travelers. Live trip tracking, boarding passes, ship navigation, timezone-aware schedules, multi-carrier search, and route planning — all in one place.

Built as a design/vibe-coding demo with **Claude Code**.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Screens

| Screen | Description |
|--------|-------------|
| **Trip Timeline** | Live voyage progress, ship clock, quick actions, journey timeline |
| **Boarding Pass** | 3D flip card with QR code, passenger info, wallet integration |
| **Schedule** | Timezone switcher (ship/local/home), category filters, expandable events |
| **Ship Map** | 7 unique SVG deck plans (decks 4–10), tappable rooms, wayfinding |
| **Search** | Multi-carrier aggregator with filter/sort, CO₂ display |
| **Route** | Door-to-door planner with SVG map, step-by-step directions |
| **Club Card** | Loyalty card, tier progress, perks, activity history |
| **Profile** | Travel docs, preferences, offline settings |

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** with custom design tokens
- **Lucide React** icons
- Fonts: Inter, Instrument Serif, JetBrains Mono
- No backend — all mock data

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser. Best viewed at mobile width (390px).

## Project Structure

```
src/
  app/           — Next.js App Router (layout, page, globals.css)
  components/
    shell/       — Tab bar, top bar
    screens/     — All 8 screen components
    ui/          — Shared UI (avatar)
  lib/
    mock-data.ts — All mock data
    types.ts     — TypeScript interfaces
```

## License

MIT
