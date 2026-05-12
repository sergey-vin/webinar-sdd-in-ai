# CruiseApp

A mobile-first web app for browsing and booking cruise vacations — with onboard ship navigation, entertainment schedules, time zone management, and transfer planning.

Built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- **Cruise Search & Booking** — Browse cruises by region, view itineraries, choose cabins, and book
- **My Cruise Dashboard** — Overview of your active booking with voyage progress
- **Ship Map** — Interactive SVG deck plans with venue search and "You are here" marker
- **Daily Schedule** — Activities filtered by category (shows, food, sports, kids, etc.) with a personal planner
- **Ship Clock** — Live ship time vs. home time, upcoming clock changes, and port time zone timeline
- **Transfer Planner** — Transport options to the terminal (car, taxi, shuttle, public transit), parking info, and a departure checklist

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.sample .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (local via Docker, optional)

## Project Structure

```
app/
  page.tsx                    # Home — cruise search
  cruises/[id]/page.tsx       # Cruise details & cabin selection
  cruises/[id]/book/page.tsx  # Booking form & confirmation
  my-cruise/
    page.tsx                  # Dashboard
    ship-map/page.tsx         # Interactive deck maps
    schedule/page.tsx         # Daily activities
    clock/page.tsx            # Ship time & time zones
    transfer/page.tsx         # Transfer & checklist
components/
  bottom-nav.tsx              # Mobile bottom navigation
  cruise-card.tsx             # Cruise listing card
  ui/                         # shadcn/ui components
lib/
  mock-data.ts                # Demo data (3 cruises, venues, schedule, etc.)
  types.ts                    # TypeScript interfaces
```

## Local Supabase (optional)

The app currently runs on mock data. To use a local Supabase instance:

```bash
supabase start
```

Default ports are remapped to the `243xx` range (see `supabase/config.toml`).

## License

MIT
