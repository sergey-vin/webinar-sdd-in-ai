# CUThere — Development Notes

Mobile-first cruise travel companion app. All data is mocked (no backend).

## Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide React
- Dev server: `npm run dev` (port 3003)

## Key patterns
- Client-side screen routing via useState in `src/app/page.tsx`
- SSR-safe: no Math.random() or Date in initial render — use useEffect
- Design tokens defined as CSS vars in `globals.css`, mapped via Tailwind @theme
