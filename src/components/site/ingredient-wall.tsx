import Image from "next/image";

import { toneField } from "@/components/site/tones";
import {
  ingredientColumns,
  type IngredientTile,
} from "@/lib/content/coming-soon";
import { cn } from "@/lib/utils";

/**
 * The wall of Thaigredient ingredient tiles on the Coming Soon screen:
 * three columns of paper-cut art drifting upward forever, each at its own
 * tempo. Purely decorative — the page's meaning is in the headline — so
 * the whole wall is hidden from assistive tech and every tile carries an
 * empty alt rather than eighteen near-meaningless labels.
 *
 * Each column's tiles are rendered `COPIES` times, and the `wall-up`
 * keyframes move the column up by exactly one copy. When the animation
 * restarts, the next copy is sitting precisely where the previous one
 * began, so the jump is invisible. This is why the columns must not use
 * flex `gap` for their spacing — the gap between copies would be one
 * short and the seam would show. Each tile carries its own `mb-*`
 * instead, making every tile exactly `height + gap` tall.
 *
 * This is CSS multi-column no longer: `columns-3` balances its own content
 * and cannot animate each column separately.
 */
export function IngredientWall() {
  return (
    <div
      aria-hidden
      className={cn(
        "box-border h-full max-h-full min-h-0 overflow-hidden",
        "pr-[clamp(24px,3vw,34px)] pl-[clamp(20px,2vw,24px)]",
        // Fades top and bottom so tiles dissolve at both edges instead of
        // being guillotined by the overflow clip. The bottom fade is the
        // design's; the top one is what the movement asks for.
        // Temporarily disabled — restore before merging.
        // "[mask-image:linear-gradient(to_bottom,transparent_0,#000_56px,#000_calc(100%-96px),transparent_100%)]",
        // "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,#000_56px,#000_calc(100%-96px),transparent_100%)]"
      )}
    >
      <div className="flex items-start gap-x-3 min-[860px]:gap-x-4">
        {ingredientColumns.map((column, index) => (
          <div
            key={index}
            // `--wall-copies` is what the keyframes divide by, so the
            // travel distance and the number of copies can never drift
            // apart. Change COPIES and the animation follows.
            className={cn("flex-1 [--wall-copies:3]", column.marquee)}
          >
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              column.tiles.map((tile, position) => (
                <Tile key={`${copy}-${position}`} tile={tile} />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * How many times each column's list is repeated.
 *
 * Three, not two. The animation travels one copy, so what stays on screen
 * is the remaining `COPIES - 1`; that has to cover the wall's height or a
 * gap opens at the bottom as the column runs out. Tile heights now come
 * from their width, so one copy is tall in proportion to the viewport's
 * *width* while the wall is as tall as its *height* — two copies leave one
 * spare and fall short on a portrait window. Three always covers it.
 */
const COPIES = 3;

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
        "mb-3 min-[860px]:mb-4",
        // The sticker frame: ink border, hard offset shadow, no blur. The
        // smaller offset is the handoff's mobile frame; `shadow-card` is
        // the 3px/4px desktop one.
        "border-sticker border-line-strong shadow-control min-[860px]:shadow-card",
        "rounded-xl min-[860px]:rounded-sticker",
        tile.ratio,
        fieldClass(tile.tone)
      )}
    >
      {tile.box ? (
        <div className={cn("relative", tile.box)}>
          <Image src={tile.src} alt="" fill sizes={TILE_SIZES} className="object-contain" />
        </div>
      ) : (
        <Image src={tile.src} alt="" fill sizes={TILE_SIZES} className="object-cover" />
      )}
    </div>
  );
}

/**
 * Three columns splitting the wall, which is half the viewport beside the
 * type column and all of it when stacked. Viewport-relative rather than a
 * fixed px hint: the tiles scale with the screen, so a fixed hint
 * under-serves the art on large displays.
 */
const TILE_SIZES = "(min-width: 860px) 17vw, 32vw";
