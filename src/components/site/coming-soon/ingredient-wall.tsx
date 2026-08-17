import Image from "next/image";
import type { CSSProperties } from "react";

import { toneField } from "@/components/site/tones";
import type {
  IngredientTile,
  IngredientWall as Wall,
} from "@/lib/content/coming-soon";
import { cn } from "@/lib/utils";

/**
 * One of the two walls flanking the Coming Soon headline: a single column
 * of framed paper-cut cards drifting forever, the left one travelling up
 * and the right one down, so the pair counter-slides against itself
 * instead of sliding as one slab.
 *
 * Purely decorative — the page's meaning is in the headline and the bowl —
 * so the whole wall is hidden from assistive tech and every card carries
 * an empty alt rather than sixteen near-meaningless labels.
 *
 * The card list is rendered `COPIES` times and the `wall-up` keyframes
 * move the column by exactly one copy. When the animation restarts, the
 * next copy is sitting precisely where the previous one began, so the jump
 * is invisible. This is why the column must not use flex `gap` for its
 * spacing — the gap between copies would be one short and the seam would
 * show. Each card carries its own `mb-*` instead, making every card
 * exactly `height + gap` tall.
 */
export function IngredientWall({
  wall,
  side,
}: {
  wall: Wall;
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        // The flank: exactly `--wall-w` wide, flush to the screen edge,
        // clipping whatever runs past it. `--wall-w` is set by the stage,
        // not here, because the stage's own inline padding is measured from
        // the same value — widening a wall in one place would otherwise
        // slide it under the headline with nothing to say so.
        "pointer-events-none absolute inset-y-0 w-[var(--wall-w)] overflow-hidden",
        side === "left" ? "left-0" : "right-0",
        // Fades top and bottom so cards dissolve at both edges instead of
        // being guillotined where they meet the header row and the tagline
        // band.
        //
        // `black` here is a stencil, not a colour: only the alpha of a mask
        // is read, so this says "opaque" and no theme has any say over it.
        // Nothing to route through a token.
        "[mask-image:linear-gradient(to_bottom,transparent_0,black_9%,black_91%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_9%,black_91%,transparent_100%)]"
      )}
    >
      {/* The leaning column, held clear of the flank's edges by exactly the
          distance its lean can carry it.

          This inset is the whole reason cards are no longer clipped. A box
          rotated by θ about its centre displaces a point at distance d from
          that centre sideways by d·sinθ, so over a visible band as tall as
          the viewport the column sweeps ±(V/2)·sinθ. Run the column at the
          full flank width and that sweep pushes its corners straight
          through the clip, taking a slice off every card near the top and
          bottom — which is what a full-height 3deg lean was doing before.

          `--tilt-sweep` is that budget, in `vh` because the sweep scales
          with the viewport's HEIGHT and not its width. Half goes to each
          side. It is deliberately generous for a 1.5deg lean: being wrong
          here costs a visibly chopped card, being over-generous costs a
          slightly narrower one. */}
      <div
        className={cn(
          "absolute inset-x-[calc(var(--tilt-sweep)/2)] inset-y-0",
          wall.tilt
        )}
      >
        <div
          className={cn("w-full", wall.column.marquee)}
          // What the keyframes divide the travel by, so the distance and
          // the number of copies rendered cannot drift apart: change COPIES
          // and the animation follows. Inline is safe for this one — it is
          // a length the animation reads, not the animation itself, so it
          // is not what the reduced-motion rule has to override.
          style={{ "--wall-copies": COPIES } as CSSProperties}
        >
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            wall.column.tiles.map((tile, position) => (
              <Card key={`${copy}-${position}`} tile={tile} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * How many times the card list is repeated.
 *
 * Three. The animation travels one copy, so what has to cover the flank is
 * the remaining `COPIES - 1`. A copy is about 7.3 card-widths tall now that
 * a wall is one card wide instead of two — roughly 1300px on a desktop
 * frame against a flank of 670 — so two copies clear a laptop on their
 * own, and the third is what covers a 1440px-tall window, where the flank
 * grows at the same time as the cards get narrower.
 *
 * A gap at the foot of a wall is the failure this prevents, and it only
 * appears on tall windows — so if these numbers are retuned, check them by
 * measuring travel against flank height on a tall viewport, not by looking
 * at a laptop.
 */
const COPIES = 3;

/** Paper is a surface, not one of the five accent tones. */
function fieldClass(tone: IngredientTile["tone"]) {
  if (tone === null) return null;
  return tone === "paper" ? "bg-tg-paper" : toneField[tone];
}

function Card({ tile }: { tile: IngredientTile }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        // The gap between cards lives here, not on the column — the
        // marquee's seamlessness depends on it.
        "mb-3 min-[860px]:mb-4",
        // The sticker frame: ink border, hard offset shadow, no blur.
        "border-sticker border-line-strong shadow-control min-[860px]:shadow-card",
        "rounded-lg min-[860px]:rounded-sticker",
        tile.ratio,
        tile.tilt,
        fieldClass(tile.tone)
      )}
    >
      {tile.box ? (
        <div className={cn("relative", tile.box)}>
          <Image
            src={tile.src}
            alt=""
            fill
            sizes={CARD_SIZES}
            className="object-contain"
          />
        </div>
      ) : (
        <Image
          src={tile.src}
          alt=""
          fill
          sizes={CARD_SIZES}
          className="object-cover"
        />
      )}
    </div>
  );
}

/**
 * A card is as wide as its flank less the lean's budget, and a flank is
 * 15vw. Viewport-relative rather than a fixed px hint: the cards scale
 * with the screen, so a fixed hint under-serves the art on large displays.
 */
const CARD_SIZES = "15vw";
