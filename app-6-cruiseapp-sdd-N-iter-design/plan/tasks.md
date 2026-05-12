# CUThere — Task Tracker

## Phase 1: Scaffold + DB + Auth + Layout + Home ✅

### 1.1 Project Bootstrap ✅
- [x] Init Next.js 15 with TypeScript + Tailwind
- [x] Install deps (supabase, zustand, luxon, next-intl, lucide, playwright)
- [x] Init shadcn/ui, add components (button, card, badge, avatar, tabs, separator, scroll-area)
- [x] Configure globals.css with CUThere design tokens
- [x] Set up fonts (Inter, Instrument Serif, JetBrains Mono)
- [x] Create .env.local with Supabase keys
- [x] Create lib/supabase/client.ts + server.ts
- [x] Create lib/utils.ts, lib/types.ts, lib/constants.ts, lib/time.ts
- [x] Update sdd/specs/ for CUThere scope
- [x] Create CLAUDE.md + plan/tasks.md
- [x] Git commit: `60e8ee4`

### 1.2 Database + Seed ✅
- [x] Write initial migration (14 tables, indexes, RLS)
- [x] Write seed.sql (2 users, 5 carriers, 8 locations, 2 vessels, 6 routes, 2 trips, 6 legs, 8 events, 15 perks)
- [x] Start Supabase, apply migration
- [x] Generate TypeScript types
- [x] Verify in Studio
- [x] Git commit: `f364158`

### 1.3 Layout + Auth + Trip Timeline ✅
- [x] Set up i18n (config, middleware, messages EN+RU)
- [x] Create root [locale] layout with NextIntlClientProvider
- [x] Build AppShell (phone frame, bottom tabs, header)
- [x] Create Zustand stores (auth, trip, ui)
- [x] Build demo-user-picker
- [x] Build trip timeline page + components (timeline, timeline-card, leg-status-pill)
- [x] Placeholder pages for schedule, search, route, club, profile
- [x] Write Playwright tests (4 passing)
- [x] Git commit: `a2534be`

## Phase 2: Core Screens ✅

### 2.1 Boarding Pass ✅
- [x] Leg detail page (app/[locale]/trip/[legId]/page.tsx)
- [x] Boarding pass component (QR, mono fonts, carrier color header)
- [x] 3 Playwright tests passing
- [x] Git commit: `9988426`

### 2.2 Schedule (TZ-aware) ✅
- [x] Schedule page + components (events from vessel)
- [x] TZ toggle (ship/home/local)
- [x] Category filter chips
- [x] 3 Playwright tests passing
- [x] Git commit: `55f50f4`

### 2.3 Deck Map ✅
- [x] SVG ship outline with venue hotspots (emoji icons)
- [x] Deck map page + components (deck tabs, venue list)
- [x] Interactive venue taps (tooltip on click)
- [x] 3 Playwright tests passing
- [x] Git commit: `a55af27`

### 2.4 Profile + Locale ✅
- [x] Profile page with settings + home timezone display
- [x] Demo user switching
- [x] Locale switcher (EN↔RU with URL update)
- [x] 4 Playwright tests passing
- [x] Git commit: `e4d3e03`

## Phase 3: Search + Route + Club ✅

### 3.1 Search & Compare ✅
- [x] Search form + results + carrier logos + mode filter
- [x] Sort: cheapest / fastest / greenest (CO₂)
- [x] 3 Playwright tests passing
- [x] Git commit: `7b6e181`

### 3.2 Route Planner ✅
- [x] Multi-leg route builder with add/remove waypoints
- [x] 2 Playwright tests passing
- [x] Git commit: `5bbbf9d`

### 3.3 Club Card ✅
- [x] Visual club card with tier color + progress bar + perks list
- [x] 2 Playwright tests passing
- [x] Git commit: `78cdd61`

## Phase 4: Polish + PWA ✅

### 4.1 PWA + Offline ✅
- [x] Manifest, service worker (cache-first static, network-first API)
- [x] SW registration component, offline indicator banner
- [x] Git commit: `f64090d`

### 4.2 Final Polish ✅
- [x] Error boundary (class component with retry)
- [x] Complete RU translations (parity verified)
- [x] Git commit: `1641780`

## Post-Phase Fixes & Improvements

### Seed Data Fixes ✅
- [x] Added airport→terminal bus transfer leg for Elena
- [x] Redesigned Elena's trip: BER✈HEL → 🚌→West Terminal → ⛴HEL→TLL → ⛴TLL→STO
- [x] Added reverse Eckerö route TLL→HEL for James
- [x] Fixed Tallink terminal (West Terminal)
- [x] Fixed deck/vessel mismatch (Megastar)
- [x] Git commit: `f6bad9f`

### TZ & Spec Compliance ✅
- [x] Added tzShortLabel() — timezone abbreviations on all times (EET, EEST, etc.)
- [x] TZ labels on timeline cards, boarding pass, header
- [x] TZ change indicator between timeline legs (pill: "EET → EEST")
- [x] CO₂ "greenest" sort option in search
- [x] Git commit: `af8d410`

### UX Improvements ✅
- [x] Schedule link from boarding pass for vessel legs (commit: `12b6418`)
- [x] Time-left countdown on boarding pass for active legs (commit: `bc05f63`)
- [x] Fixed inconsistent phone shell width on desktop (commit: `0f2e45f`)

### Deck Map & Events Overhaul ✅
- [x] Spec: added "Карта палубы и события на борту" section to mission.md
- [x] Created lib/cabin.ts — parseCabinInfo utility (seat_info → deck, x, y)
- [x] Rewrote deck-map.tsx: realistic SVG with room rects, corridors, cabin zones, venue zones
- [x] Cabin marker: teal pulsing 🛏 on matching deck, auto-navigate to cabin deck
- [x] Created venue-events-card.tsx: tap venue → events with time, countdown, save toggle
- [x] Created saved-event-preview.tsx: compact event card for timeline
- [x] Updated timeline.tsx + trip page: saved events between leg cards
- [x] Added i18n keys (noEventsAtVenue EN+RU)
- [x] Updated deck-map e2e test
- [x] 24 Playwright tests passing
- [x] Git commit: `b392774`

## Summary
- **Total Playwright tests**: 24 (all passing)
- **All 4 phases complete** + post-phase polish
