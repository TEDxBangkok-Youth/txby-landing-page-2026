"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  ITEM_BY_KEY,
  ITEMS,
  type ItemKey,
  type Tagline,
} from "@/lib/thaigredient/data";
import { getTagline, randomDraw, type Draw } from "@/lib/thaigredient/slot";
import { FALLBACK_TAGLINE } from "@/lib/thaigredient/taglines";
import { cn } from "@/lib/utils";

/**
 * The Secret Thaigredient slot machine (docs/slot-machine.md): three
 * reels of the 12-item pool, one spin button, and the bilingual tagline
 * the drawn trio resolves to.
 *
 * Each reel is a vertical strip of item art built fresh per spin — it
 * starts on the face currently showing and ends on the drawn target, so
 * a spin never jumps before it starts. The whole strip travels in ONE
 * transform transition with a strong ease-out: the fast start reads as
 * the reel free-wheeling, the long tail as it settling onto the result.
 * Reels get longer strips and longer durations left to right, which is
 * what staggers the stops.
 *
 * The result is not decided by where the animation lands — randomDraw()
 * picks it up front and a timer flips the state machine to `result`
 * after the last reel's duration. A transitionend would say the same
 * thing but can be swallowed by a background tab; the timer cannot.
 *
 * Reduced motion skips the travel entirely (the strips render settled)
 * and keeps only a short suspense delay before the tagline shows.
 *
 * The reels are `aria-hidden` throughout — twelve pictures flying past
 * say nothing useful — and the result card is the single `aria-live`
 * region, announcing the three names plus the tagline once, when ready.
 */

/* Spin choreography (spec FR4 wants these adjustable). The first reel's
   travel time, the extra each later reel holds on for, and the pause a
   reduced-motion spin keeps for suspense. */
const SPIN_DURATION_MS = 2400;
const REEL_STAGGER_MS = 400;
const REDUCED_MOTION_DELAY_MS = 500;
/** Strip length per reel — later reels travel further as well as longer,
    so the extra time does not read as slow motion. */
const STRIP_CELLS = [18, 21, 24] as const;
/** The reels' faces before the first spin: the classic trio. */
const IDLE_FACES: Draw = ["pork-skewer", "rooster-bowl", "tray"];

type Phase =
  | { status: "idle" }
  | { status: "spinning"; draw: Draw }
  | { status: "result"; draw: Draw; tagline: Tagline };

interface SpinRun {
  id: number;
  strips: ItemKey[][];
}

export function SlotMachine() {
  const t = useTranslations("slot_machine");
  const locale = useLocale();
  const lang: keyof Tagline = locale === "th" ? "th" : "en";

  const [phase, setPhase] = useState<Phase>({ status: "idle" });
  const [run, setRun] = useState<SpinRun | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const settleTimer = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    },
    []
  );

  const spin = () => {
    if (phase.status === "spinning") return;

    const startFaces = phase.status === "result" ? phase.draw : IDLE_FACES;
    const draw = randomDraw();

    setRun((prev) => ({
      id: (prev?.id ?? 0) + 1,
      strips: draw.map((target, reel) =>
        buildStrip(startFaces[reel], target, STRIP_CELLS[reel])
      ),
    }));
    setPhase({ status: "spinning", draw });

    const settleAfter = reducedMotion
      ? REDUCED_MOTION_DELAY_MS
      : SPIN_DURATION_MS + (draw.length - 1) * REEL_STAGGER_MS + 100;

    settleTimer.current = window.setTimeout(() => {
      const tagline = getTagline(draw);

      if (!tagline && process.env.NODE_ENV !== "production") {
        // Q4 in the spec: fallback is acceptable, but the content team
        // should hear about every combination that hits it.
        console.warn(`[slot] no tagline for draw "${[...draw].sort().join("_")}"`);
      }

      setPhase({ status: "result", draw, tagline: tagline ?? FALLBACK_TAGLINE });
    }, settleAfter);
  };

  const spinning = phase.status === "spinning";

  return (
    <div className="relative flex flex-col items-center gap-7">
      {/* Every pool image, rendered invisibly at the reel cells' exact
          layout size so the browser resolves the same srcset entry and
          warms the cache before the first spin. Strips mount at click
          time and land in ~2.5s — a cold fetch of the bigger art loses
          that race and the reel settles on an empty frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        {ITEMS.map((item) => (
          <div key={item.key} className="relative h-40 w-40">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 640px) 160px, 28vw"
              loading="eager"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* The cabinet. Decorative through and through — the aria-live
          card below is the accessible face of the result. */}
      <div
        aria-hidden
        className="w-full max-w-[560px] rotate-[-1deg] rounded-sticker border-sticker border-line-strong bg-tg-paper p-4 shadow-card sm:p-5"
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {run
            ? run.strips.map((cells, reel) => (
                <Reel
                  key={`${run.id}-${reel}`}
                  cells={cells}
                  durationMs={SPIN_DURATION_MS + reel * REEL_STAGGER_MS}
                  animate={!reducedMotion}
                />
              ))
            : IDLE_FACES.map((face, reel) => (
                <Reel key={`idle-${reel}`} cells={[face]} durationMs={0} animate={false} />
              ))}
        </div>
      </div>

      <Button size="lg" onClick={spin} disabled={spinning}>
        {spinning
          ? t("spinning")
          : phase.status === "result"
            ? t("spin_again")
            : t("spin")}
      </Button>

      {/* Reserved to the result card's height so the page doesn't jump
          when the tagline lands. */}
      <div aria-live="polite" className="flex min-h-36 w-full max-w-[560px]">
        {phase.status === "result" ? (
          <div
            className={cn(
              "w-full self-start rounded-sticker border-sticker border-line-strong bg-tg-paper px-6 py-5 text-center shadow-card",
              "rotate-[0.6deg] motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200"
            )}
          >
            <p className="text-sm font-medium text-foreground-muted">
              {phase.draw.map((key) => ITEM_BY_KEY[key][lang]).join(" · ")}
            </p>
            <p className="mt-2 font-heading text-xl font-bold leading-heading text-foreground sm:text-2xl">
              {phase.tagline[lang]}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Strip for one spin of one reel: opens on the face the reel is already
 * showing, closes on the drawn target, random pool art in between. No
 * two neighbours repeat — a doubled cell reads as the reel stalling.
 */
function buildStrip(start: ItemKey, target: ItemKey, length: number): ItemKey[] {
  const cells: ItemKey[] = [start];

  while (cells.length < length - 1) {
    const pick = ITEMS[Math.floor(Math.random() * ITEMS.length)].key;
    if (pick === cells[cells.length - 1]) continue;
    if (cells.length === length - 2 && pick === target) continue;
    cells.push(pick);
  }

  cells.push(target);
  return cells;
}

function Reel({
  cells,
  durationMs,
  animate,
}: {
  cells: ItemKey[];
  durationMs: number;
  animate: boolean;
}) {
  // A non-animating reel (idle, or reduced motion) renders settled.
  const [engaged, setEngaged] = useState(!animate);

  useEffect(() => {
    if (!animate) return;

    // Double rAF: the strip must paint once at rest before the settled
    // transform lands, or there is no start state to transition from.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEngaged(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [animate]);

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border-sticker border-line-strong bg-tg-paper-050">
      <div
        className="flex flex-col will-change-transform"
        style={{
          // Settled = last cell in the window: up by the whole strip
          // less one cell. Transform-only, so the travel stays off the
          // layout/paint path however long the strip is.
          transform: engaged
            ? `translateY(calc(-100% + ${100 / cells.length}%))`
            : "translateY(0)",
          transition: engaged
            ? // --ease-reel (ease-out-quint): flat-out through the strip,
              // long settle onto the target — the slot feel in one curve.
              `transform ${durationMs}ms var(--ease-reel)`
            : "none",
        }}
      >
        {cells.map((key, i) => (
          <div key={i} className="relative aspect-square w-full shrink-0 p-[12%]">
            <div className="relative h-full w-full">
              <Image
                src={ITEM_BY_KEY[key].image}
                alt=""
                fill
                sizes="(min-width: 640px) 160px, 28vw"
                // Never lazy: cells below the window are clipped by the
                // reel's overflow, so the observer would defer them and
                // the strip would fly past empty frames.
                loading="eager"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Cylinder shading — the window's top and bottom fall into
          shadow, hinting at the drum curving away. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-tg-ink/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-tg-ink/10 to-transparent" />
    </div>
  );
}
