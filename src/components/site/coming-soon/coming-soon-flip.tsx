"use client";

import { useEffect, useState } from "react";

import {
  comingSoonFaces,
  swapSeconds,
  type ComingSoonFace,
  type FaceLang,
} from "@/lib/content/coming-soon";
import { cn } from "@/lib/utils";

/**
 * The bilingual headline sticker — "COMING SOON" over the edition theme,
 * and its Thai face — flipping on the X axis every few seconds.
 *
 * Both faces are stacked in one 3D block and the block rotates, on a
 * single clock. The faces do not run timers of their own; which one is
 * visible is derived from the flip count, and their opacity swaps at the
 * midpoint via a zero-duration transition with a delay, while the block
 * is edge-on. Two timers drift apart and you eventually catch the wrong
 * face mid-flip.
 *
 * The flipping text is `aria-hidden`; the page renders a static heading
 * in the active locale for assistive tech (its `sr-only` `<h1>`), so a
 * screen reader gets one stable headline rather than a label that
 * rewrites itself every five seconds.
 */
export function ComingSoonFlip({ startLang }: { startLang: FaceLang }) {
  // Even count → faces[0] (English), odd → faces[1] (Thai).
  const [flips, setFlips] = useState(() =>
    comingSoonFaces[1].lang === startLang ? 1 : 0
  );
  const [holdStill, setHoldStill] = useState(false);

  // Reduced motion stops the clock and holds whichever face is up — on
  // load that is the active locale's. The handoff calls that the right
  // fallback: a 620ms 3D rotation every five seconds is exactly what
  // this query opts out of. Starts false on both server and client, so
  // there is no hydration mismatch.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setHoldStill(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (holdStill) return;

    const timer = setInterval(() => setFlips((n) => n + 1), swapSeconds * 1000);
    return () => clearInterval(timer);
  }, [holdStill]);

  const [front, back] = comingSoonFaces;
  const showingFront = flips % 2 === 0;

  return (
    <div
      aria-hidden
      className="relative transition-transform duration-[620ms] ease-flip [transform-style:preserve-3d]"
      // The one genuinely runtime value on this page: the angle
      // accumulates without bound, so no class can express it.
      style={{ transform: `rotateX(${flips * 180}deg)` }}
    >
      <Face face={front} visible={showingFront} />
      <Face
        face={back}
        visible={!showingFront}
        className="absolute inset-0 [transform:rotateX(180deg)]"
      />
    </div>
  );
}

/* The poster step, sized in container units against the middle stage
   rather than in `vw`.

   This is not a preference. The stage is what is left of the viewport
   after two ingredient walls take a slice off each side, so its width and
   the viewport's are different numbers that move at different rates — a
   `vw`-sized headline set to fit at 1280px runs into the walls the moment
   the walls stop growing at their 300px cap. `cqw` tracks the box the
   words are actually set in, and one ratio then covers every width.

   The `cqh` term is a guard, not the driver. It only binds on a short
   landscape window, where width alone would set type taller than the
   stage can hold and squeeze the bowl out from under it.

   The `max()` floor is what carries the mobile frame, and it is the
   handoff's own floor (44px Latin, ~40px Thai) rather than a number picked
   to fit. There the stage is only a couple of hundred pixels wide, so
   `cqw` alone would set the headline at around 29px — legible, but no
   longer a poster. Latin can afford the larger floor because it wraps onto
   two lines; Thai holds one line, so its floor is a step lower.

   Thai gets its own, LARGER step, deliberately inverted from the
   handoff's ratio (~0.91 of the Latin size). That ratio was tuned for
   "COMING SOON" against a same-length Thai line; เร็ว ๆ นี้ is much
   shorter, so at the same size it reads visually lighter — less ink on
   the same line. Scaled up instead, to about 1.2x the Latin step, it
   fills the same visual weight in the headline slot. */
const LATIN = "text-[max(2.75rem,min(13.5cqw,15cqh))] tracking-[-0.012em]";
const THAI = "text-[max(3.25rem,min(16.2cqw,18cqh))] leading-[1.16]";

/* The theme line under the headline: outlined ink, no fill. Holds the
   design's ~0.3 ratio to the headline as both scale.

   It needs a floor of its own for the same reason the headline does, and
   more urgently: without one, `cqw` against the mobile stage sets this at
   about 9px, where an outlined face is not so much small as illegible.
   Mobile gets a taller floor than the desktop one (17px vs 13px) — with
   the headline itself scaled up on small screens now, the same 13px
   theme line reads as an afterthought under it.

   The stroke thins below the desktop frame too. 1.5px is the design's
   weight at 34px; at the floor size it closes up the counters and the
   words turn into blots. */
const THEME =
  "mt-[max(10px,2.4cqw)] font-heading font-bold leading-[1.1] " +
  "text-[max(1.0625rem,min(4.1cqw,4.6cqh))] text-transparent " +
  "min-[860px]:text-[max(0.8125rem,min(4.1cqw,4.6cqh))] " +
  "[-webkit-text-stroke:1px_var(--color-tg-ink)] " +
  "min-[860px]:[-webkit-text-stroke:1.5px_var(--color-tg-ink)]";

function Face({
  face,
  visible,
  className,
}: {
  face: ComingSoonFace;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      lang={face.lang}
      className={cn(
        // The back face is stretched to the front's height, and the two
        // faces are not the same height — centring keeps the shorter one
        // from floating at the top of the taller box. A no-op on the
        // front face, which sizes to its own content.
        "flex flex-col justify-center text-center [backface-visibility:hidden]",
        // No fade: the swap is instant, delayed to the midpoint of the
        // 620ms flip so it happens while the block is edge-on.
        "transition-opacity duration-0 delay-[310ms]",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Two things this row has to get right.

          `justify-center` — a flex row ignores its parent's `text-align`,
          so without it the words sit left while everything around them
          centres.

          The type scale sits on the row, not on the spans. `gap` is in
          `em`, and `em` resolves against *this* element's font-size —
          with the scale on the spans instead, the row still inherits
          16px and the word space comes out at 2px, closing เร็ว ๆ นี้ up
          into one word. On the row, that gap is a real space at display
          size. */}
      <div
        className={cn(
          "flex items-baseline justify-center font-heading font-bold",
          "rotate-[-1.5deg] leading-none",
          face.nowrap
            ? // Thai never breaks and never tracks: its vowels and tone
              // marks belong to the syllable beside them.
              [THAI, "flex-nowrap gap-[0.16em] whitespace-nowrap"]
            : [LATIN, "flex-wrap gap-[0.13em]"]
        )}
      >
        <span className="text-foreground">{face.solid}</span>
        {/* The cyan sticker: the second word lifted off the field on its
            own card, leaning the other way from the row. */}
        <span
          className={cn(
            "rounded-2xl border-marker border-line-strong bg-tg-cyan",
            "px-[0.18em] pt-[0.02em] pb-[0.11em] shadow-card",
            "rotate-[2deg] text-foreground-inverse"
          )}
        >
          {face.sticker}
        </span>
      </div>

      <div
        className={cn(
          THEME,
          // Tracking is Latin-only, for the same reason as above.
          face.nowrap ? "whitespace-nowrap" : "tracking-[0.03em]"
        )}
      >
        {face.theme}
      </div>
    </div>
  );
}
