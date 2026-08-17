import type { Tone } from "@/lib/site-data";

/**
 * Content for the standalone "Coming Soon" screen
 * (`app/[locale]/coming-soon/page.tsx`).
 *
 * Deliberately *not* split per locale like the other content modules.
 * The headline is a bilingual sticker that flips between English and
 * Thai on a timer, so both faces are on screen in the same session
 * whichever locale is active — picking one by locale would delete half
 * the design. The active locale only decides which face shows first,
 * and which wording the screen reader gets (that part is a message:
 * `comingSoon.heading`).
 *
 * The theme line and the ingredient names are edition copy — 2027
 * changes them — so they live here rather than in the message
 * catalogs. See src/i18n/MESSAGES.md.
 */

export type FaceLang = "en" | "th";

export type ComingSoonFace = {
  lang: FaceLang;
  /** Solid ink text — the first word. */
  solid: string;
  /** The second word, set as a cyan sticker. */
  sticker: string;
  /** The edition theme, set under the headline as outlined ink. */
  theme: string;
  /**
   * Thai must never be letter-spaced or broken across lines: its
   * combining vowels and tone marks belong to the syllable beside
   * them, and tracking pulls them off it. Latin takes the design's
   * negative tracking and may wrap.
   */
  nowrap: boolean;
};

/**
 * Front face first. The flip counter is even on `faces[0]` and odd on
 * `faces[1]`, so this array is ordered, not a lookup — adding a third
 * language means reworking the two-sided flip, not just pushing here.
 */
export const comingSoonFaces: readonly [ComingSoonFace, ComingSoonFace] = [
  {
    lang: "en",
    solid: "COMING",
    sticker: "SOON",
    theme: "SECRET THAIGREDIENT",
    nowrap: false,
  },
  {
    lang: "th",
    solid: "เร็ว ๆ",
    sticker: "นี้",
    theme: "ส่วนผสมลับ ฉบับคนไทย",
    nowrap: true,
  },
];

/** Brand line, English in both locales — it is a lockup, not a sentence. */
export const comingSoonTagline = "MIX THE ORDINARY, CREATE THE EXTRAORDINARY";

/** Seconds each face holds before the block flips. */
export const swapSeconds = 5;

/* ─────────────────────────────────────────────────────────────
   The two ingredient walls
   ───────────────────────────────────────────────────────────── */

export type IngredientTile = {
  src: string;
  /** Tile field. `paper` and `null` (the image bleeds full) are not tones. */
  tone: Tone | "paper" | null;
  /**
   * Tile shape, as the handoff's own width/height for that tile.
   *
   * Height comes from the tile's width, not from the viewport: a column
   * is half a wall, so the tiles scale with the screen and keep the
   * design's near-square masonry proportions at every size. Sizing them
   * off the wall's *height* instead (`cqh`) stretches them into slivers
   * on a tall window — and is unnecessary, because the marquee, not the
   * tile heights, is what keeps a wall full.
   */
  ratio: string;
  /**
   * How the art sits in the tile. `null` bleeds the image to the edges
   * (the patterns and the zigzag strip); the rest are contained at a
   * fixed percentage of one axis, which keeps the paper-cut art
   * optically centred.
   */
  box: string | null;
};

/**
 * Each wall's columns, listed outermost first — the outer column is the
 * one that bleeds off the viewport edge, and the inner one is dropped on
 * the mobile frame where there is no width for two.
 *
 * The four columns are tuned to near-equal total heights (their tile
 * ratios each sum to ~3.7 column-widths), so the durations below
 * translate directly into four similar-but-unequal speeds. Change a
 * tile's ratio and that column's speed changes with it.
 */
export type IngredientColumn = {
  /**
   * The column's marquee, as a whole Tailwind class: one `wall-up`
   * animation at this column's own tempo, `reverse` on the right-hand
   * wall so it travels down instead of up. Played backwards, those
   * keyframes *are* the downward loop, and it stays seamless for the
   * same reason the forward one does — its two ends are one whole copy
   * apart, so the restart is invisible either way.
   *
   * A literal class string rather than a duration the component
   * composes, for two reasons. Tailwind only emits utilities it can see
   * spelled out in the source, so a runtime-built name produces no CSS
   * at all. And it has to be a *class*: the reduced-motion query in
   * globals.css switches these off with an unlayered `animation: none`,
   * which beats a layered utility but loses to an inline style — set
   * this way, the walls stop for the people who asked them to.
   */
  marquee: string;
  tiles: readonly IngredientTile[];
};

export type IngredientWall = {
  /**
   * How far the whole wall leans, as its rotation class. The two walls
   * lean opposite ways so the pair frames the headline rather than
   * shearing the screen one way. Small: past about 4deg the tile borders
   * stop reading as a grid.
   */
  tilt: string;
  columns: readonly [IngredientColumn, IngredientColumn];
};

/**
 * Sixteen tiles, no piece of art repeated anywhere. Reusing the same
 * handful in the same order makes the loop obvious within one pass, and
 * with two walls on screen at once a repeat shows across walls too, not
 * just down a column.
 *
 * Sixteen is also all there is. The set has eighteen usable pieces, and
 * two are spoken for elsewhere on this screen: `bowl-rooster` is the bowl
 * at the centre and `burst-blue` is the corner burst. Putting either in a
 * wall as well turns the centrepiece into wallpaper. Adding a fifth tile
 * per column therefore means a repeat or new art — the columns are four
 * deep because that is the most the art supports.
 *
 * Tones are assigned so no artwork sits on a field its own colour — the
 * pink basket is on green, the green chili on paper, and so on. Every
 * piece is named in a comment where its filename lies, which is most of
 * them: `ds/skewer-yellow` is a lime-and-chili pattern, `ds/bottle-pink`
 * is a green chili, `ds/medicine-tube` is a cucumber. Never pick art out
 * of this set by filename without looking at it first.
 */
export const ingredientWalls: readonly [IngredientWall, IngredientWall] = [
  {
    tilt: "-rotate-3",
    columns: [
      {
        marquee: "animate-[wall-up_46s_linear_infinite]",
        tiles: [
          {
            src: "/assets/illustrations/basket-pink.png",
            tone: "green",
            ratio: "aspect-[220/180]",
            box: "h-full w-[76%]",
          },
          {
            // Tileable market-bag plaid, full-bleed.
            src: "/assets/ds/plaid-grid-01.png",
            tone: null,
            ratio: "aspect-[220/224]",
            box: null,
          },
          {
            src: "/assets/thaigredient/tag-price-67.png",
            tone: "yellow",
            ratio: "aspect-[220/168]",
            box: "h-full w-[78%]",
          },
          {
            // A green chili, whatever the filename says.
            src: "/assets/ds/bottle-pink.png",
            tone: "paper",
            ratio: "aspect-[220/232]",
            box: "h-[86%] w-full",
          },
        ],
      },
      {
        marquee: "animate-[wall-up_54s_linear_infinite]",
        tiles: [
          {
            src: "/assets/illustrations/starburst-red.png",
            tone: "paper",
            ratio: "aspect-[220/196]",
            box: "h-full w-[74%]",
          },
          {
            src: "/assets/thaigredient/skewer-pork.png",
            tone: "cyan",
            ratio: "aspect-[220/212]",
            box: "h-[86%] w-full",
          },
          {
            // Long thin strip — bled full so it reads as a woven band.
            src: "/assets/illustrations/zigzag-strip.png",
            tone: null,
            ratio: "aspect-[220/147]",
            box: null,
          },
          {
            src: "/assets/illustrations/fish-sauce-bottle.png",
            tone: "yellow",
            ratio: "aspect-[220/244]",
            box: "h-[80%] w-full",
          },
        ],
      },
    ],
  },
  {
    tilt: "rotate-3",
    columns: [
      {
        marquee: "animate-[wall-up_50s_linear_infinite_reverse]",
        tiles: [
          {
            // A wide crop of the hero bowl — the asset is 2557×1352, so
            // it needs a tile shaped like it.
            src: "/assets/thaigredient/bowl-mix-hero.png",
            tone: "cyan",
            ratio: "aspect-[220/160]",
            box: "h-full w-[86%]",
          },
          {
            src: "/assets/illustrations/basket-yellow.png",
            tone: "green",
            ratio: "aspect-[220/196]",
            box: "h-full w-[78%]",
          },
          {
            src: "/assets/illustrations/skewer-yellow-floss.png",
            tone: "red",
            ratio: "aspect-[220/244]",
            box: "h-[80%] w-full",
          },
          {
            src: "/assets/illustrations/basket-cyan.png",
            tone: "red",
            ratio: "aspect-[220/205]",
            box: "h-full w-[78%]",
          },
        ],
      },
      {
        marquee: "animate-[wall-up_58s_linear_infinite_reverse]",
        tiles: [
          {
            src: "/assets/illustrations/lime-slice.png",
            tone: "cyan",
            ratio: "aspect-[220/160]",
            box: "h-full w-[70%]",
          },
          {
            // The tileable lime-and-chili pattern, full-bleed.
            src: "/assets/ds/skewer-yellow.png",
            tone: null,
            ratio: "aspect-[220/226]",
            box: null,
          },
          {
            src: "/assets/illustrations/chili-red.png",
            tone: "yellow",
            ratio: "aspect-[220/196]",
            box: "h-[82%] w-full",
          },
          {
            // A cucumber, not a medicine tube.
            src: "/assets/ds/medicine-tube.png",
            tone: "pink",
            ratio: "aspect-[220/244]",
            box: "h-[84%] w-full",
          },
        ],
      },
    ],
  },
];
