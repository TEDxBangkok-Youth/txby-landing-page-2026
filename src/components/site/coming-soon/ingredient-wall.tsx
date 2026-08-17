import Image from "next/image";
import type { CSSProperties } from "react";

import { toneField } from "@/components/site/tones";
import type {
  IngredientColumn,
  IngredientTile,
  IngredientWall as Wall,
} from "@/lib/content/coming-soon";
import { cn } from "@/lib/utils";

/**
 * One of the two walls of Thaigredient ingredient tiles flanking the
 * Coming Soon headline: columns of framed paper-cut art drifting
 * forever, each at its own tempo, the whole wall leaning a few degrees.
 *
 * The left wall travels up and the right one travels down, so the pair
 * counter-slides against itself instead of sliding as one slab.
 *
 * Purely decorative — the page's meaning is in the headline and the
 * bowl — so the whole wall is hidden from assistive tech and every tile
 * carries an empty alt rather than twelve near-meaningless labels.
 *
 * Each column's tiles are rendered `COPIES` times, and the `wall-up`
 * keyframes move the column by exactly one copy. When the animation
 * restarts, the next copy is sitting precisely where the previous one
 * began, so the jump is invisible. This is why the columns must not use
 * flex `gap` for their spacing — the gap between copies would be one
 * short and the seam would show. Each tile carries its own `mb-*`
 * instead, making every tile exactly `height + gap` tall.
 *
 * This is not CSS multi-column: `columns-2` balances its own content and
 * cannot animate each column separately.
 */
export function IngredientWall({
  wall,
  side,
}: {
  wall: Wall;
  side: "left" | "right";
}) {
  const [outer, inner] = wall.columns;

  return (
    <div
      aria-hidden
      className={cn(
        // The wall's FOOTPRINT — and it is exactly `--wall-w` wide plus the
        // bleed it hangs off the screen edge, no more. `--wall-w` is set by
        // the stage, not here, because the stage's own inline padding is
        // measured from the same value; widening a wall in one place would
        // otherwise slide it under the headline without anything saying so.
        //
        // This box clips, and the tilt happens INSIDE it (see below). That
        // is the whole reason the footprint is knowable. Tilting this box
        // instead would make the wall reach inward by half its height times
        // sin(tilt) — about 20px on a phone, 32px on a tall desktop window
        // — an excursion that grows with the viewport's *height*, so the
        // gutter beside it would have to carry a `vh` term to survive it,
        // and on a 390px screen that term plus the wall ate 60% of the
        // width. Clipping here costs a straight edge on the inner side and
        // buys a layout that composes.
        "pointer-events-none absolute inset-y-0 overflow-hidden",
        "w-[calc(var(--wall-w)+var(--wall-bleed))]",
        side === "left"
          ? "left-[calc(-1*var(--wall-bleed))]"
          : "right-[calc(-1*var(--wall-bleed))]",
        // Fades top and bottom so tiles dissolve at both edges instead of
        // being guillotined where they meet the header row and the tagline
        // band.
        //
        // `black` here is a stencil, not a colour: only the alpha of a mask
        // is read, so this says "opaque" and no theme has any say over it.
        // Nothing to route through a token.
        "[mask-image:linear-gradient(to_bottom,transparent_0,black_10%,black_90%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_10%,black_90%,transparent_100%)]"
      )}
    >
      {/* The tilted content, inflated past the clip on every side so the
          lean cannot swing a bare corner into view. A box rotated by θ
          inside a clip cut to its own size uncovers `H·sinθ/2`
          horizontally and `W·sinθ/2` vertically; the horizontal term
          tracks the wall's height, hence the `vh`, and the vertical one is
          small because a wall is never wide.

          The horizontal inflation is then given straight back as padding.
          Without that the columns inherit the extra width — they are
          `flex-1` of whatever box holds them — so each tile is drawn wider
          than the wall and the clip takes a slice off its inner edge. The
          symptom is a wall of half-tiles, worst on a phone where a wall is
          one column wide and the slice is a fifth of the only tile there
          is. One variable sets both halves so they cannot disagree. */}
      <div
        className={cn(
          "absolute -inset-y-4 [--tilt-pad:calc(3vh+16px)]",
          "-left-[var(--tilt-pad)] -right-[var(--tilt-pad)]",
          "px-[var(--tilt-pad)]",
          "flex items-start gap-x-2 min-[860px]:gap-x-3",
          wall.tilt
        )}
      >
        {/* The outer column is the one that bleeds off the edge. On the
            mobile frame the wall is barely wider than one column, so the
            inner one is dropped rather than squeezed — two 40px columns
            read as noise, and a single wider column also gives the
            marquee a taller copy to cover the viewport with. */}
        <Column column={outer} />
        <Column column={inner} className="hidden min-[860px]:block" />
      </div>
    </div>
  );
}

function Column({
  column,
  className,
}: {
  column: IngredientColumn;
  className?: string;
}) {
  return (
    <div
      className={cn("flex-1", column.marquee, className)}
      // `--wall-copies` is what the keyframes divide by, so the travel
      // distance and the number of copies can never drift apart: change
      // COPIES and the animation follows. Inline is safe for this one —
      // it is a length the animation reads, not the animation itself,
      // so it is not what the reduced-motion rule has to override.
      style={{ "--wall-copies": COPIES } as CSSProperties}
    >
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        column.tiles.map((tile, position) => (
          <Tile key={`${copy}-${position}`} tile={tile} />
        ))
      )}
    </div>
  );
}

/**
 * How many times each column's list is repeated.
 *
 * Five, which is more than it looks. The animation travels one copy, so
 * what has to cover the wall is the remaining `COPIES - 1`. A copy is
 * only about 3.7 column-widths tall and a column is half of a wall that
 * is at most 210px wide, so one copy tops out around 460px while the wall
 * is as tall as the viewport. Four spare copies are what keeps a
 * 1440px-tall window from running out of tiles at the bottom; three
 * clears an 800px one but not that.
 *
 * A gap at the foot of a wall is the failure this prevents, and it only
 * appears on tall windows — so if these numbers are ever retuned, check
 * them by measuring travel against wall height on a tall viewport, not by
 * looking at a laptop.
 *
 * The cost is bounded: only the copies actually on screen are fetched
 * (`next/image` lazy-loads by default, and every copy after the first
 * hits a warm cache for the same URL), so this buys height in DOM nodes
 * rather than in bytes.
 */
const COPIES = 5;

/** Paper is a surface, not one of the five accent tones. */
function fieldClass(tone: IngredientTile["tone"]) {
  if (tone === null) return null;
  return tone === "paper" ? "bg-tg-paper" : toneField[tone];
}

function Tile({ tile }: { tile: IngredientTile }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        // The gap between tiles lives here, not on the column — the
        // marquee's seamlessness depends on it.
        "mb-2 min-[860px]:mb-3",
        // The sticker frame: ink border, hard offset shadow, no blur.
        "border-sticker border-line-strong shadow-control min-[860px]:shadow-card",
        "rounded-lg min-[860px]:rounded-sticker",
        tile.ratio,
        fieldClass(tile.tone)
      )}
    >
      {tile.box ? (
        <div className={cn("relative", tile.box)}>
          <Image
            src={tile.src}
            alt=""
            fill
            sizes={TILE_SIZES}
            className="object-contain"
          />
        </div>
      ) : (
        <Image
          src={tile.src}
          alt=""
          fill
          sizes={TILE_SIZES}
          className="object-cover"
        />
      )}
    </div>
  );
}

/**
 * A tile is half a wall on the desktop frame and a whole one on mobile,
 * and a wall is 21vw — so these are the two real widths. Viewport-
 * relative rather than a fixed px hint: the tiles scale with the screen,
 * so a fixed hint under-serves the art on large displays.
 */
const TILE_SIZES = "(min-width: 860px) 11vw, 21vw";
