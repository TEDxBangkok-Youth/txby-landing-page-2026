# TEDxBangkok Youth 2026 — Landing Page

Landing page for **TEDxBangkok Youth 2026 · "ส่วนผสมลับ ฉบับคนไทย"**, implemented
from the [Claude Design](https://claude.ai/design) source `TEDx Youth 2026.dc.html`.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui**.

## Getting started

This project uses **pnpm** (pinned via the `packageManager` field). Enable it once with
Corepack, then install:

```bash
corepack enable pnpm
```

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

## Stack & structure

- `src/app/layout.tsx` — loads the **Chakra Petch** (display) and **Sarabun** (body)
  Thai fonts via `next/font/google` and exposes them as `--font-chakra` / `--font-sarabun`.
- `src/app/globals.css` — shadcn base plus the **TEDxBangkok Youth brand system**:
  brand colors (`bg-pink`, `text-ink`, `bg-cyan`, …), sticker shadows, and the
  paper-grain `.grain-overlay` effect, ported 1:1 from the design tokens.
- `src/app/page.tsx` — the full one-page composition: Hero, Past Events, TED Club,
  Speakers, Team wall, Sponsors, Final CTA and Footer.
- `src/components/site/sticker-button.tsx` — the `.txby-btn` sticker button
  (CVA variants: `pink · yellow · cyan · green · red · outline`, sizes `md · lg`).
- `src/components/site/site-nav.tsx` — the shared top bar (padding, 7xl column,
  link and logo sizing) used by both `nav-bar.tsx` (landing: fixed, scroll-faded,
  mobile sheet) and `event-nav.tsx` (event pages: sticky, solid). Change spacing
  here, not in the two callers.
- `src/components/site/image-slot.tsx` — placeholder drop-zone that stands in for
  the design's `<image-slot>` web component (posters, speaker/team photos, logos).
- `src/lib/site-data.ts` — editable event info (`ticketUrl`, `ticketPrice`,
  `eventDate`) and the generated speakers / team / sponsors / past-events collections.
- `src/app/events/[year]/page.tsx` — one page per past edition (`/events/2025`),
  prerendered for every year in `src/lib/events.ts`. Runs on the **TEDx main CI**
  scope only (black / white / grey + TED red, Inter + IBM Plex Sans Thai) — no
  Thaigredient or TED Club language. Sections: hero (theme + รายละเอียด),
  speakers (ชื่อเล่น / ชื่อจริง / one-liner), รูปบรรยากาศในงาน, and the talk
  index linking to YouTube.
- `src/app/[locale]/coming-soon/page.tsx` — the standalone **Coming Soon** teaser
  (`/en/coming-soon`), implemented from the Claude Design source
  `TEDx Youth 2026 - Split Masonry.dc.html`. Deliberately separate from the main
  site: no nav, no footer, no links out, and nothing to click — it announces the
  2026 theme and nothing else. Pinned to `100dvh` and never scrolls; instead the
  wall of ingredient tiles drifts upward forever in three columns, each at its
  own tempo, fading out at the top and bottom edges. Each column's tile list is
  repeated and travels exactly one copy, so the loop has no visible seam — see
  the note in `ingredient-wall.tsx` before changing the tile spacing. The
  headline flips between English and Thai every 5s, so both languages appear
  whichever locale is active — its copy lives in `src/lib/content/coming-soon.ts`
  rather than the message catalogs (see `src/i18n/MESSAGES.md`).
- `src/lib/events.ts` — the per-year content. Adding next year's page is adding
  one `EventYear` object; the `youtubeId` / `playlistUrl` placeholders
  (`REPLACEME*`) are the only values that must be swapped for real ids.
- `public/assets/illustrations/` — the sticker illustrations from the design.

## Editing content

Event details and the placeholder collections live in `src/lib/site-data.ts`.
Swap the `<ImageSlot>` placeholders in `src/app/page.tsx` for real `<Image>`s
(speaker portraits, past posters, sponsor logos) as they are confirmed. 
