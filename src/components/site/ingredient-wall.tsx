import Image from "next/image";
import type { CSSProperties } from "react";

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
 * began, so the jump is invisible.
 *
 * Two things keep that seam hidden, and both are easy to undo by accident:
 *
 * The columns must not use flex `gap` for their spacing — the gap between
 * copies would be one short and the seam would jump. Each tile carries its
 * own `mb-*`/`mr-*` instead, making every tile exactly `size + gap` along
 * the axis it travels. The *last* tile of the track drops that trailing
 * margin, or the track is one gap longer than `COPIES` copies and the
 * travel lands short (see `Tile`'s `last`).
 *
 * And the track's own box has to measure its content on the travelling
 * axis, because the keyframes' `100%` resolves against that box. The
 * column layout gets this free — a block box is as tall as its content —
 * but the row layout needs `w-max` to escape the parent column-flex's
 * `items-stretch`.
 *
 * This is CSS multi-column no longer: `columns-3` balances its own content
 * and cannot animate each column separately.
 *
 * Below 860px the wall turns 90 degrees: three vertical columns sliding
 * up/down become three horizontal rows sliding left/right, stacked instead
 * of side by side (the text column above them is stacked too at this
 * width — see coming-soon/page.tsx). Same three tracks, same per-track
 * tempo and mirrored direction, just walking the other axis, so `Tile`
 * and the copy-count math are unchanged; only the flex direction and
 * which marquee class plays are swapped per breakpoint.
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
      <div className="flex h-full flex-col items-stretch gap-y-3 min-[860px]:flex-row min-[860px]:items-start min-[860px]:gap-x-4 min-[860px]:gap-y-0">
        {ingredientColumns.map((column, index) => (
          <div
            key={index}
            // `--wall-copies` is what the keyframes divide by, so the
            // travel distance and the number of copies can never drift
            // apart. Change COPIES and the animation follows. The
            // duration/direction custom properties feed `wall-track`,
            // which starts on `wall-left` at the row duration (stacked)
            // and switches to `wall-up` at the column duration (side by
            // side) from 860px up.
            className={cn(
              // `w-max` is load-bearing on the row layout: the parent is a
              // *column* flex container, so `items-stretch` would size this
              // track to the viewport's width while its `shrink-0` tiles
              // overflow past it. `wall-left` resolves its `-100%` against
              // this element's own box, so a viewport-wide track travels a
              // third of the *screen* instead of a third of its content —
              // the row slides part-way and snaps back. Sizing the track to
              // its tiles makes `100%` mean what the keyframes assume.
              // `min-[860px]:w-auto` hands the column layout back to the
              // block box, whose height is already its content.
              "flex w-max flex-none flex-row items-start [--wall-copies:3] min-[860px]:block min-[860px]:w-auto min-[860px]:flex-1",
              "wall-track min-[860px]:[animation-name:wall-up] min-[860px]:[animation-duration:var(--wall-duration)]"
            )}
            style={
              {
                "--wall-duration": `${column.durationSeconds}s`,
                "--wall-duration-row": `${column.durationSecondsRow}s`,
                "--wall-direction": column.reverse ? "reverse" : "normal",
              } as CSSProperties
            }
          >
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              column.tiles.map((tile, position) => (
                <Tile
                  key={`${copy}-${position}`}
                  tile={tile}
                  last={
                    copy === COPIES - 1 && position === column.tiles.length - 1
                  }
                />
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

/**
 * `last` is the track's very final tile — the one whose trailing margin
 * would otherwise be counted into the track's length. The keyframes travel
 * `100% / COPIES`, which is one copy only while the track measures exactly
 * `COPIES × (copy + gap) - gap`; with the trailing margin left on, the
 * track is one gap too long, every loop lands a fraction short of the seam
 * and the drift shows as a snap back. Dropping it on the last tile alone
 * keeps every *interior* gap intact, so the copies stay evenly spaced.
 */
function Tile({ tile, last }: { tile: IngredientTile; last: boolean }) {
  return (
    <div
      className={cn(
        // Rows (stacked, below 860px): every tile in a row shares one
        // height (`h-[32vw]`) and lets its own ratio drive width, so the
        // row reads as a level strip instead of a jagged skyline.
        // Columns (side by side, 860px up): the reverse — the column's
        // width is shared and each tile's ratio drives height, which is
        // what actually varies tile size there.
        "relative flex h-[32vw] shrink-0 items-center justify-center overflow-hidden min-[860px]:h-auto min-[860px]:w-full",
        // The gap between tiles lives here, not on the track — the
        // marquee's seamlessness depends on it. Rows travel along X, so
        // the gap is `mr-*`; columns travel along Y, so it switches to
        // `mb-*`.
        "mr-3 mb-0 min-[860px]:mr-0 min-[860px]:mb-4",
        // Rows travel X and columns travel Y, so the margin to drop on the
        // final tile is the one on the axis in play at that breakpoint.
        last && "mr-0 min-[860px]:mb-0",
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
