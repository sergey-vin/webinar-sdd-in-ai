# CruiseVibe

A cruise booking and companion web app — like booking.com for cruise ships, with onboard navigation, entertainment schedules, timezone handling, and terminal logistics.

Built with Next.js, Supabase, Tailwind CSS, and shadcn/ui.

## Features

- **Cruise browsing & booking** — search cruises, view itineraries, book cabins with a multi-step flow
- **Ship deck map** — interactive deck navigation with amenity details and wayfinding directions
- **Entertainment schedule** — daily events filtered by day and category, with favorites
- **Ship clock** — dual clock showing ship time vs home time, with timezone change alerts
- **Terminal logistics** — parking, taxi, rideshare info for departure/arrival terminals
- **Auth** — email/password registration and login via Supabase Auth
- **Mobile-first** — responsive design with bottom navigation, works as a PWA

## Prerequisites

- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
- Docker (for local Supabase)

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/cruiseapp-vibe.git
   cd cruiseapp-vibe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start local Supabase**

   ```bash
   supabase start
   ```

   This prints your local `anon key` and `service_role key`.

4. **Create `.env.local`**

   ```bash
   cp .env.sample .env.local
   ```

   Fill in the keys from the `supabase start` output.

5. **Apply migrations and seed data**

   ```bash
   supabase db push --local --include-all
   ```

6. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001).

## Seed Data

The migrations include seed data with:

- 2 ships (Ocean Majesty, Caribbean Star)
- 3 cruises (Western Caribbean 7-night, Bahamas 5-night, Mediterranean 10-night)
- Cabin categories, itinerary stops, events, timezone schedules
- 2 terminals (PortMiami, Port Everglades) with transport options

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    cruises/            # Browse, detail, booking flow
    dashboard/          # User bookings
    ship/               # Deck map & wayfinding
    schedule/           # Entertainment schedule
    clock/              # Ship clock & timezone
    terminal/           # Terminal logistics
    api/                # API routes (bookings)
  components/
    ui/                 # shadcn/ui components
    layout/             # Header, bottom nav
    cruise/             # Cruise cards, filters, pricing
    ship/               # Deck map, amenity cards
    schedule/           # Event cards, filters
    clock/              # Ship clock, dual clock
    terminal/           # Terminal info, transport
    booking/            # Booking stepper
  lib/
    supabase/           # Supabase client config
    utils/              # Price formatting, timezone helpers
supabase/
  migrations/           # Database schema & seed data
  config.toml           # Local Supabase config
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19)
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (v4, base-ui)
- [Lucide Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)

## License

MIT
