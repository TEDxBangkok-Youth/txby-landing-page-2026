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
 * The theme line is edition copy — 2027 changes it — so it lives here
 * rather than in the catalogs. See src/i18n/MESSAGES.md.
 */

export type FaceLang = "en" | "th";

export type ComingSoonFace = {
  lang: FaceLang;
  /** Solid paper fill. */
  solid: string;
  /** Outlined: transparent fill over a paper text stroke. */
  outlined: string;
  /** The edition theme, set under the headline in navy. */
  theme: string;
  /**
   * Thai sets both headline words on one line; English stacks them.
   * Drives the flex direction of the two words, nothing else.
   */
  inline: boolean;
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
    outlined: "SOON",
    theme: "SECRET THAIGREDIENT",
    inline: false,
  },
  {
    lang: "th",
    solid: "เร็ว ๆ",
    outlined: "นี้",
    theme: "ส่วนผสมลับ ฉบับคนไทย",
    inline: true,
  },
];

/** Brand line, English in both locales — it is a lockup, not a sentence. */
export const comingSoonTagline = "MIX THE ORDINARY, CREATE THE EXTRAORDINARY";

/** Seconds each face holds before the block flips. */
export const swapSeconds = 5;

export type IngredientTile = {
  src: string;
  /** Tile field. `paper` and `null` (the image bleeds full) are not tones. */
  tone: Tone | "paper" | null;
  /**
   * Tile shape, as the handoff's own width/height for that tile.
   *
   * Height comes from the tile's width, not from the viewport: the column
   * is a third of the wall, so the tiles scale with the screen and keep
   * the design's near-square masonry proportions at every size. Sizing
   * them off the wall's *height* instead (`cqh`) stretches them into
   * slivers on a tall window — and is unnecessary now that the marquee,
   * not the tile heights, is what keeps the wall full.
   */
  ratio: string;
  /**
   * How the art sits in the tile. `null` bleeds the image to the edges
   * (the patterns and the zigzag strip); the rest are contained at a fixed
   * percentage of one axis, which keeps the paper-cut art optically
   * centred.
   */
  box: string | null;
};

export type IngredientColumn = {
  /**
   * The column's marquee: one `wall-up` animation, at its own tempo, and
   * in its own direction. The outer columns travel up and the middle one
   * runs `reverse` to travel down, so the wall counter-slides against
   * itself instead of sliding as one slab.
   *
   * `reverse` rather than a second set of keyframes: `wall-up` played
   * backwards *is* the downward loop, and it stays seamless for the same
   * reason the forward one does — the start and end positions are one
   * whole copy apart, so the two are visually identical and the restart
   * is invisible whichever way it is played.
   *
   * The three columns are tuned to identical total heights (their tile
   * ratios each sum to 5.33), so these durations translate directly into
   * three similar-but-unequal speeds. Change a tile's ratio and that
   * column's speed changes with it.
   */
  marquee: string;
  tiles: readonly IngredientTile[];
};

/**
 * Three columns of six, scrolling forever — the outer two up, the middle
 * one down.
 *
 * Every tile is a different piece of art: repeating the same nine in the
 * same order made the loop obvious within one pass. The component renders
 * each column's list several times over and animates it by exactly one
 * copy, so the next copy lands where the previous one began and the seam
 * never shows.
 *
 * Tones are assigned so no artwork sits on a field its own colour — the
 * pink basket is on green, the green chili on paper, and so on.
 */
export const ingredientColumns: readonly IngredientColumn[] = [
  {
    marquee: "animate-[wall-up_46s_linear_infinite]",
    tiles: [
      {
        src: "/assets/illustrations/chili-red.png",
        tone: "yellow",
        ratio: "aspect-[220/244]",
        box: "h-[74%] w-full",
      },
      {
        src: "/assets/illustrations/lime-slice.png",
        tone: "cyan",
        ratio: "aspect-[220/160]",
        box: "h-full w-[70%]",
      },
      {
        src: "/assets/thaigredient/skewer-pork.png",
        tone: "paper",
        ratio: "aspect-[220/196]",
        box: "h-[78%] w-full",
      },
      {
        src: "/assets/illustrations/basket-pink.png",
        tone: "green",
        ratio: "aspect-[220/180]",
        box: "h-full w-[76%]",
      },
      {
        src: "/assets/illustrations/starburst-red.png",
        tone: "paper",
        ratio: "aspect-[220/168]",
        box: "h-full w-[74%]",
      },
      {
        // Tileable market-bag plaid, full-bleed.
        src: "/assets/ds/plaid-grid-01.png",
        tone: null,
        ratio: "aspect-[220/224]",
        box: null,
      },
    ],
  },
  {
    // The middle column: same keyframes, played backwards, so it
    // travels down against the two beside it.
    marquee: "animate-[wall-up_54s_linear_infinite_reverse]",
    tiles: [
      {
        src: "/assets/illustrations/basket-yellow.png",
        tone: "green",
        ratio: "aspect-[220/180]",
        box: "h-full w-[78%]",
      },
      {
        // Named for a skewer in the source set, but it is the tileable
        // lime + chili pattern — used full-bleed, no field behind it.
        src: "/assets/ds/skewer-yellow.png",
        tone: null,
        ratio: "aspect-[220/226]",
        box: null,
      },
      {
        src: "/assets/illustrations/skewer-yellow-floss.png",
        tone: "red",
        ratio: "aspect-[220/194]",
        box: "h-[80%] w-full",
      },
      {
        src: "/assets/thaigredient/bowl-mix-hero.png",
        tone: "cyan",
        ratio: "aspect-[220/160]",
        box: "h-full w-[86%]",
      },
      {
        // Misnamed in the source set: it is a cucumber, not a tube.
        src: "/assets/ds/medicine-tube.png",
        tone: "yellow",
        ratio: "aspect-[220/244]",
        box: "h-[80%] w-full",
      },
      {
        src: "/assets/thaigredient/burst-blue.png",
        tone: "paper",
        ratio: "aspect-[220/168]",
        box: "h-full w-[72%]",
      },
    ],
  },
  {
    marquee: "animate-[wall-up_50s_linear_infinite]",
    tiles: [
      {
        src: "/assets/thaigredient/bowl-rooster.png",
        tone: "yellow",
        ratio: "aspect-[220/224]",
        box: "h-full w-[80%]",
      },
      {
        src: "/assets/illustrations/fish-sauce-bottle.png",
        tone: "paper",
        ratio: "aspect-[220/196]",
        box: "h-[76%] w-full",
      },
      {
        src: "/assets/illustrations/basket-cyan.png",
        tone: "red",
        ratio: "aspect-[220/194]",
        box: "h-full w-[78%]",
      },
      {
        src: "/assets/thaigredient/tag-price-67.png",
        tone: "yellow",
        ratio: "aspect-[220/168]",
        box: "h-full w-[78%]",
      },
      {
        // Misnamed in the source set: it is a green chili, not a bottle.
        src: "/assets/ds/bottle-pink.png",
        tone: "paper",
        ratio: "aspect-[220/244]",
        box: "h-[76%] w-full",
      },
      {
        // Long thin strip — bled full so it reads as a woven band.
        src: "/assets/illustrations/zigzag-strip.png",
        tone: null,
        ratio: "aspect-[220/147]",
        box: null,
      },
    ],
  },
];
