# CUThere

Multi-modal travel companion (responsive PWA) for ferries, flights, trains, and city transit. Built as a demo project showcasing **Spec-Driven Development (SDD)** with Claude Code.

## What it does

- **Trip timeline** with live status, boarding passes with QR codes
- **Interactive deck maps** with venue locations, cabin marker, event integration
- **TZ-aware schedule** (ship time / home time / local time) with countdown timers
- **Cross-carrier search** and route planning (door-to-door)
- **Club loyalty card** with tier tracking and perks
- **i18n** (English + Russian), mobile-first design with desktop phone frame

Demo scenario: Berlin -> Helsinki (flight) -> Tallinn (ferry) -> Stockholm (ferry), with on-board navigation and entertainment schedule.

## Tech stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router), TypeScript strict |
| Styling | Tailwind CSS v4, shadcn/ui |
| Backend | Supabase (Postgres + Auth + RLS) |
| State | Zustand |
| i18n | next-intl (EN + RU) |
| Time | Luxon |
| Deck maps | SVG |
| Testing | Playwright (24 e2e tests) |

## Prerequisites

- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) (`brew install supabase/tap/supabase`)
- Docker Desktop (for local Supabase)

## Getting started

```bash
# 1. Clone and install
git clone <repo-url>
cd cruiseapp-sdd-N-iter-design
npm install

# 2. Set up environment
cp .env.sample .env.local

# 3. Start local Supabase (Docker must be running)
supabase start

# 4. Apply migrations and seed data
echo "y" | supabase db push --local --include-all 2>&1

# 5. Start the app
npm run dev
```

Open [http://localhost:3006](http://localhost:3006) in your browser.

## Demo users

| User | Email | Password | Tier | Trip |
|------|-------|----------|------|------|
| Elena | elena@cuthere.demo | demo123456 | Gold | Active (BER->HEL->TLL->STO) |
| James | james@cuthere.demo | demo123456 | Blue | Upcoming (TLL->HEL) |

Sign in via the demo user picker on the Trip tab (no registration needed).

## Project structure

```
app/[locale]/          # Next.js pages (trip, search, route, club, profile)
components/            # React components by feature
lib/                   # Utilities, types, stores, Supabase clients
messages/              # i18n translation files (en.json, ru.json)
supabase/              # Config, migrations, seed.sql
tests/e2e/             # Playwright e2e tests
sdd/                   # Specs and original design brief
plan/                  # Task tracker and decision log
```

## Running tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run all tests
npx playwright test
```

Tests run on a 390x800 mobile viewport against the local dev server.

## SDD methodology

This project was built using Spec-Driven Development:

1. **Specs first** (`sdd/specs/`) -- mission, tech stack, roadmap written before code
2. **Iterative implementation** -- 4 phases, each with Playwright tests and git commits
3. **Decision logging** (`plan/logs.txt`) -- every architectural choice documented
4. **Task tracking** (`plan/tasks.md`) -- progress tracked in-repo for agent continuity
5. **Continuous spec updates** -- specs evolved as user feedback arrived

The full conversation history and iterative design process is documented in `plan/logs.txt`.

## License

MIT
