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
 * The bilingual headline sticker: "COMING SOON · SECRET THAIGREDIENT"
 * and its Thai face, flipping on the X axis every few seconds.
 *
 * Both faces are stacked in one 3D block and the block rotates — there
 * is a single clock. The faces do not run timers of their own; which one
 * is visible is derived from the flip count, and their opacity swaps at
 * the midpoint via a zero-duration transition with a delay. Two timers
 * drift apart and you eventually see the wrong face mid-flip.
 *
 * The flipping text is `aria-hidden`; the page renders a static heading
 * in the active locale for assistive tech (see the page's `sr-only`
 * `<h1>`), so a screen reader gets one stable headline rather than a
 * label that rewrites itself every five seconds.
 */
export function ComingSoonFlip({ startLang }: { startLang: FaceLang }) {
  // Even count → faces[0] (English), odd → faces[1] (Thai).
  const [flips, setFlips] = useState(() =>
    comingSoonFaces[1].lang === startLang ? 1 : 0
  );
  const [holdStill, setHoldStill] = useState(false);

  // Reduced motion stops the clock and holds whichever face is up — on
  // load that is the active locale's. The handoff calls that an
  // acceptable fallback; a 620ms 3D rotation every five seconds is
  // exactly what this query opts out of. Starts false on both server and
  // client, so there is no hydration mismatch.
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

/* One-off poster steps — bigger than --text-h1 and sized in container
   units against the type column, like the landing hero's cqw type.
   Deliberately not `vw`: the column is half the viewport on desktop and
   all of it when stacked, so `vw` sizes the same type against two
   different boxes and has to be re-tuned per breakpoint. `cqw` tracks the
   box the words are actually set in, and one ratio covers both.

   The `cqh` term is a guard, not the driver. It only binds on a short
   landscape window, where width alone would set type taller than the
   column can hold and squeeze the logo and tagline out.

   Latin stacks its two words over two lines and takes the design's
   negative tracking; Thai sets both on one line and must not have it.
   Thai also gets its own, smaller step — the handoff sets it at ~0.875
   of the Latin one (84px against 96px), and that ratio is kept here as
   both scale up. */
const LATIN =
  "font-heading font-bold tracking-[-0.015em] text-[max(3.25rem,min(23cqw,26cqh))]";
const THAI =
  "font-heading font-bold text-[max(2.75rem,min(20cqw,22.6cqh))] leading-[1.16]";

/* The second word as a sticker card instead of an outline: cyan field,
   thick ink border and a hard offset shadow, all sized in `em` so the
   chip scales with whichever of LATIN/THAI's cqw/cqh terms is binding on
   the inherited font-size, the same way the hero's title-highlight span
   scales off its own line.
   `leading-[1.5]` and a `pt` to match `pb`: Thai tone/vowel marks sit
   above the glyph's normal ascent, and the inherited `leading-[1.16]`
   plus a top-padding-less box left no room for them — they were getting
   clipped flat at the card's own top edge. The own-line-height override
   gives the mark headroom independent of the outer row's tighter lead. */
const CARD =
  "inline-block rounded-[0.15em] border-[0.05em] border-line-strong bg-tg-cyan px-[0.12em] pt-[0.14em] pb-[0.08em] leading-[1.5] text-foreground shadow-[0.07em_0.09em_0_var(--t-shadow-tint)] rotate-[-2deg]";

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
        // The back face is stretched to the front's height, and the Thai
        // face is a line shorter than the Latin one — centring keeps it
        // from floating at the top of the taller box. A no-op on the
        // front face, which sizes to its own content.
        "flex flex-col justify-center [backface-visibility:hidden]",
        // No fade: the swap is instant, delayed to the midpoint of the
        // 620ms flip so it happens while the block is edge-on.
        "transition-opacity duration-0 delay-[310ms]",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {face.inline ? (
        // Two things this row has to get right:
        //
        // `justify-*` — a flex row ignores the column's `text-align`, so
        // without it the Thai face sits left while everything around it
        // centres on the stacked layout.
        //
        // The type scale sits on the row, not on the spans. `gap` is in
        // `em`, and `em` resolves against *this* element's font-size — with
        // the scale on the spans instead, the row still inherited 16px and
        // the word space came out at 3px, closing เร็ว ๆ นี้ up into one
        // word. On the row, 0.25em is a real space at display size.
        //
        // `flex-wrap`, not `nowrap`: "พบกัน" plus the card is wider than
        // the type column at this font size, and `nowrap` let it run
        // straight into the wall instead of dropping to a second line.
        // `whitespace-nowrap` still guards each span's own text from
        // breaking mid-phrase.
        <div
          className={cn(
            THAI,
            "flex flex-wrap items-baseline justify-center gap-[0.25em] whitespace-nowrap rotate-[-1deg] min-[860px]:justify-start"
          )}
        >
          <span className="text-foreground">{face.solid}</span>
          <span className={CARD}>{face.outlined}</span>
        </div>
      ) : (
        <>
          <div className={cn(LATIN, "leading-[0.98] rotate-[-1deg] text-foreground")}>
            {face.solid}
          </div>
          <div className={cn(LATIN, "leading-[1.02]")}>
            <span className={CARD}>{face.outlined}</span>
          </div>
        </>
      )}

      {/* Holds the design's ~0.27 ratio to the headline as both scale. */}
      <div className="mt-[max(14px,5.2cqw)] font-heading text-[max(0.9375rem,min(5.5cqw,7cqh))] font-bold leading-[1.3] tracking-[0.05em] text-foreground">
        {face.theme}
      </div>
    </div>
  );
}
