"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLUBS, MAP_DEFAULT_TITLE } from "@/lib/site-data";

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const DRAG_THRESHOLD = 4;

type Tip = { x: number; y: number; index: number };

/**
 * Interactive map of Thai provinces with active TED Clubs. Hover
 * highlights a province and shows a tooltip; click drills into its
 * detail. Supports zoom (buttons + wheel) and drag-to-pan.
 *
 * Everything except the map itself is ordinary JSX. Only the province
 * SVG is imperative — it is an external file, so it gets injected once
 * and is then driven by delegated events and a class-sync effect,
 * rather than by rebuilding markup with innerHTML.
 */
export function ClubMap() {
  const [selected, setSelected] = useState<number | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef({ active: false, maybe: false, sx: 0, sy: 0, tx: 0, ty: 0 });

  const detail = selected != null ? CLUBS[selected] : null;

  /* Load the province map once and tag the provinces that have clubs. */
  useEffect(() => {
    let disposed = false;

    fetch("/assets/thailand-map.svg")
      .then((r) => r.text())
      .then((text) => {
        if (disposed || !hostRef.current) return;
        const parsed = new DOMParser().parseFromString(text, "image/svg+xml");
        const svg = parsed.querySelector("svg");
        if (!svg) return;

        svg.setAttribute("viewBox", "0 0 559.57092 1024.7631");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.removeAttribute("width");
        svg.removeAttribute("height");

        CLUBS.forEach((c, i) => {
          const path = svg.querySelector<SVGPathElement>(
            `path[id="${c.provinceId}"]`
          );
          if (!path) return;
          path.classList.add("club");
          path.dataset.i = String(i);
          const title = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          title.textContent = `${c.city} · ${c.note}`;
          path.appendChild(title);
        });

        hostRef.current.replaceChildren(svg);
        svgRef.current = svg as SVGSVGElement;
      });

    return () => {
      disposed = true;
    };
  }, []);

  /* Sync province highlighting to state. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll<SVGPathElement>("path.club").forEach((p) => {
      const i = Number(p.dataset.i);
      p.classList.toggle("on", i === selected || i === tip?.index);
      p.classList.toggle("dim", selected !== null && i !== selected);
    });
  }, [selected, tip]);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
    }
  }, [zoom, pan]);

  const applyZoom = useCallback((next: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    setZoom(clamped);
    if (clamped === MIN_ZOOM) setPan({ x: 0, y: 0 });
  }, []);

  /* Wheel zoom needs a non-passive listener so it can preventDefault. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      applyZoom(zoom + (e.deltaY < 0 ? 0.3 : -0.3));
    };
    host.addEventListener("wheel", onWheel, { passive: false });
    return () => host.removeEventListener("wheel", onWheel);
  }, [zoom, applyZoom]);

  const provinceAt = (target: EventTarget | null) => {
    const el = target as Element | null;
    if (!el?.classList?.contains("club")) return null;
    const i = Number((el as SVGPathElement).dataset.i);
    return Number.isFinite(i) ? i : null;
  };

  return (
    <div
      role="group"
      aria-label="แผนที่ TED Club ในประเทศไทย"
      className="relative grid h-155 grid-cols-[1fr_380px] gap-6 overflow-hidden max-[820px]:grid-cols-1"
    >
      {/* Map column */}
      <div className="relative flex min-h-0 items-center justify-center overflow-hidden">
        <div
          ref={hostRef}
          className="size-full [&_svg]:size-full [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:cursor-grab [&_svg]:transition-transform [&_svg]:duration-140 [&_svg]:ease-ink"
          onClick={(e) => setSelected(provinceAt(e.target))}
          onMouseMove={(e) => {
            const i = provinceAt(e.target);
            setTip(i === null ? null : { x: e.clientX, y: e.clientY, index: i });
          }}
          onMouseLeave={() => setTip(null)}
          onPointerDown={(e) => {
            if (zoom <= MIN_ZOOM) return;
            drag.current = {
              active: false,
              maybe: true,
              sx: e.clientX,
              sy: e.clientY,
              tx: pan.x,
              ty: pan.y,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d.maybe) return;
            if (
              !d.active &&
              Math.abs(e.clientX - d.sx) < DRAG_THRESHOLD &&
              Math.abs(e.clientY - d.sy) < DRAG_THRESHOLD
            ) {
              return;
            }
            d.active = true;
            setPan({ x: d.tx + (e.clientX - d.sx), y: d.ty + (e.clientY - d.sy) });
          }}
          onPointerUp={() => {
            drag.current.maybe = false;
            drag.current.active = false;
          }}
        />

        <div className="absolute top-0 right-5 z-10 flex flex-col overflow-hidden rounded-card border-card border-line-strong bg-surface-card shadow-card">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            className="rounded-none hover:bg-transparent hover:text-brand"
            onClick={() => applyZoom(zoom + 0.5)}
          >
            <PlusIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Reset zoom"
            className="rounded-none border-t-line-strong hover:bg-transparent hover:text-brand border-t-card"
            onClick={() => {
              applyZoom(1);
              setSelected(null);
            }}
          >
            <RotateCcwIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            className="rounded-none border-t-line-strong hover:bg-transparent hover:text-brand border-t-card"
            onClick={() => applyZoom(zoom - 0.5)}
          >
            <MinusIcon />
          </Button>
        </div>
      </div>

      {/* List / detail column */}
      <div className="flex min-h-0 flex-col overflow-hidden rounded-card border-card border-line-strong bg-surface-card shadow-card max-[820px]:hidden">
        <div className="border-b-card border-line-strong px-6 pt-5 pb-3.5">
          {detail ? (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="block cursor-pointer pb-2.5 text-left text-caption font-bold tracking-widest uppercase text-foreground-muted hover:text-brand"
            >
              ← กลับไปที่รายชื่อทั้งหมด
            </button>
          ) : null}
          <div className="font-heading text-title leading-heading font-bold tracking-tight">
            {detail ? detail.city : MAP_DEFAULT_TITLE}
          </div>
        </div>

        {detail ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4 pb-6">
            <div className="flex gap-6 pt-4">
              <Stat value={detail.clubs} label="ชมรม" />
              <Stat value={detail.since} label="ตั้งแต่" />
            </div>
            <div className="mt-5 text-body leading-[1.55] text-foreground-secondary">
              {detail.note}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto [scrollbar-width:thin]">
            {CLUBS.map((c, i) => (
              <button
                key={c.provinceId}
                type="button"
                onClick={() => setSelected(i)}
                onMouseEnter={() => setTip({ x: -1, y: -1, index: i })}
                onMouseLeave={() => setTip(null)}
                className="block w-full cursor-pointer border-b-hairline border-line-subtle px-6 py-3.5 text-left text-foreground hover:bg-surface-wash"
              >
                <div className="font-heading text-body font-bold">{c.city}</div>
                <div className="mt-0.75 text-body-sm text-foreground-secondary">
                  {c.en} · {c.note} · ตั้งแต่ {c.since}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {tip && tip.x >= 0 ? (
        <div
          role="tooltip"
          style={{ left: tip.x, top: tip.y }}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[120%] rounded-sm border-ink border-line-strong bg-surface-card px-3 py-2 font-body text-body-sm font-bold whitespace-nowrap text-foreground shadow-card"
        >
          <div>{CLUBS[tip.index].city}</div>
          <div className="mt-0.5 text-xs font-normal text-foreground-muted">
            {CLUBS[tip.index].en} · {CLUBS[tip.index].note}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <b className="block font-heading text-title-lg leading-[1.1] font-bold text-brand">
        {value}
      </b>
      <span className="text-caption font-bold tracking-widest uppercase text-foreground-muted">
        {label}
      </span>
    </div>
  );
}
