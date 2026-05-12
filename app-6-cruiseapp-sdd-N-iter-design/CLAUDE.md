# CUThere — Project Rules

## What is this
CUThere is a multi-modal travel companion demo app (ferries, flights, transit).
It demonstrates Spec-Driven Development (SDD) best practices.

## Tech Stack
- Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui, Lucide icons
- Backend: Supabase (local docker, API port 64321, DB port 64322, studio 64323)
- State: Zustand | i18n: next-intl (EN + RU) | Time: Luxon | Deck maps: SVG

## Running the App
- `npm run dev` is already running in background — do NOT restart it
- Supabase local: API http://127.0.0.1:64321, Studio http://127.0.0.1:64323
- App runs at http://localhost:3006

## Database
- Real Supabase DB with seed.sql, NOT mock JSON
- Migrations in supabase/migrations/, format: YYYYMMDDHHMMSS_description.sql
- Apply: `echo "y" | supabase db push --local --include-all 2>&1`
- NEVER db reset, NEVER change old migrations, only add new ones
- After schema changes: `supabase gen types typescript --local > lib/supabase/types.ts`

## Design System
- Colors: bg #F4F1EB, ink #0E1A2B, brand #0B3D5C, accent #E8623A
- Fonts: Inter (body), Instrument Serif (display headings), JetBrains Mono (codes/times)
- Radius: xs 6px, sm 10px, md 14px, lg 20px
- Mobile-first, phone frame 390x800 on desktop
- Use Tailwind classes ONLY, no inline styles
- Use shadcn/ui primitives from components/ui/

## Auth
- Two demo users, switch via profile page click
- elena@cuthere.demo / demo123456 (Gold tier, active trip)
- james@cuthere.demo / demo123456 (Blue tier, upcoming trip)
- No registration flow, no OAuth

## i18n
- All UI strings via useTranslations() from next-intl
- Translation files: messages/en.json, messages/ru.json
- When adding strings, add to BOTH files

## Code Practices
- One component per file
- Types in lib/types.ts (shared) or co-located
- All times stored UTC, displayed via Luxon in ship/home timezone
- Zustand stores in lib/stores/
- Keep changes minimal, don't refactor outside scope
- Add data-testid attributes on all interactive/testable elements

## Specs & Tracking
- Specs in sdd/specs/ — update when architecture evolves
- Tasks in plan/tasks.md — check off as you go
- Decisions log in plan/logs.txt
- Git commit at each milestone

## Testing
- Playwright e2e tests in tests/e2e/
- Run: `npx playwright test`
- Phone viewport (390x800) is default
- Test helpers in tests/fixtures/test-utils.ts

## File Structure
- Pages: app/[locale]/<tab>/page.tsx
- Components: components/<feature>/<component>.tsx
- Supabase: lib/supabase/{client,server,types}.ts
- Stores: lib/stores/<name>-store.ts
- Hooks: lib/hooks/use-<name>.ts
- Translations: messages/{en,ru}.json
