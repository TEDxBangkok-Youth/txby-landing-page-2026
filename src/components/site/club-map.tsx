"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { getClubs, type Club } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const DRAG_THRESHOLD = 4;

type Tip = { x: number; y: number; index: number };

/**
 * The province name in the current locale — `city` (Thai) or `en`. Only
 * this one is shown: a row used to carry the other language's name as a
 * subtitle, but a reader who picked a language doesn't need the province
 * spelled twice.
 */
function primaryName(club: Club, locale: Locale): string {
  return locale === "th" ? club.city : club.en;
}

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
  const [svgReady, setSvgReady] = useState(0);

  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef({ active: false, maybe: false, sx: 0, sy: 0, tx: 0, ty: 0 });

  const locale = useLocale() as Locale;
  const t = useTranslations("clubMap");
  const CLUBS = getClubs();

  const detail = selected != null ? CLUBS[selected] : null;

  /* Load the province map once and tag the provinces that have clubs.
     This only needs to happen once per mount — the SVG structure itself
     doesn't depend on locale, only the <title> text injected below. */
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

        getClubs().forEach((c, i) => {
          const path = svg.querySelector<SVGPathElement>(
            `path[id="${c.provinceId}"]`
          );
          if (!path) return;
          path.classList.add("club");
          path.dataset.i = String(i);
          path.appendChild(
            document.createElementNS("http://www.w3.org/2000/svg", "title")
          );
        });

        hostRef.current.replaceChildren(svg);
        svgRef.current = svg as SVGSVGElement;
        setSvgReady((n) => n + 1);
      });

    return () => {
      disposed = true;
    };
    // Runs once per mount; the locale-dependent <title> text is kept in
    // sync by the effect below instead of re-fetching the SVG.
     
  }, []);

  /* Keep each province's native <title> tooltip in the current locale. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.querySelectorAll<SVGPathElement>("path.club").forEach((p) => {
      const i = Number(p.dataset.i);
      const club = CLUBS[i];
      const title = p.querySelector("title");
      if (club && title) {
        title.textContent = `${primaryName(club, locale)} · ${t("clubCount", {
          count: club.clubs,
        })}`;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgReady, locale, t]);

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
      aria-label={t("label")}
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

        <div className="absolute top-0 right-5 z-10 flex flex-col overflow-hidden rounded-card border-frame border-line-strong bg-surface-card shadow-card">
          <ZoomButton label={t("zoomIn")} onClick={() => applyZoom(zoom + 0.5)}>
            <PlusIcon />
          </ZoomButton>
          <ZoomButton
            label={t("zoomReset")}
            divider
            onClick={() => {
              applyZoom(1);
              setSelected(null);
            }}
          >
            <RotateCcwIcon/>
          </ZoomButton>
          <ZoomButton
            label={t("zoomOut")}
            divider
            onClick={() => applyZoom(zoom - 0.5)}
          >
            <MinusIcon />
          </ZoomButton>
        </div>
      </div>

      {/* List / detail column */}
      <div className="flex min-h-0 flex-col overflow-hidden rounded-card border-frame border-line-strong bg-surface-card shadow-card max-[820px]:hidden">
        <div className="border-b-frame border-line-strong px-6 pt-5 pb-3.5">
          {detail ? (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="block cursor-pointer pb-2.5 text-left text-sm leading-[1.45] font-bold tracking-widest uppercase text-foreground-muted hover:text-brand"
            >
              ← {t("back")}
            </button>
          ) : null}
          <div className="font-heading text-2xl leading-heading font-bold tracking-tight">
            {detail ? primaryName(detail, locale) : t("defaultTitle")}
          </div>
        </div>

        {detail ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4 pb-6">
            {/* The two stats are the whole detail. A prose line under
                them used to carry the "network hub" label; without it it
                only repeated the club count back at the reader. */}
            <div className="flex gap-6 pt-4">
              <Stat value={detail.clubs} label={t("statClubs")} />
              <Stat value={detail.since} label={t("statSince")} />
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
                <div className="font-heading text-base leading-[1.6] font-bold">
                  {primaryName(c, locale)}
                </div>
                <div className="mt-0.75 text-sm leading-normal text-foreground-secondary">
                  {t("clubCount", { count: c.clubs })} ·{" "}
                  {t("since", { year: c.since })}
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
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[120%] rounded-sm border-ink border-line-strong bg-surface-card px-3 py-2 font-body text-sm leading-normal font-bold whitespace-nowrap text-foreground shadow-card"
        >
          <div>{primaryName(CLUBS[tip.index], locale)}</div>
          <div className="mt-0.5 text-xs font-normal text-foreground-muted">
            {t("clubCount", { count: CLUBS[tip.index].clubs })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Toolbar control, not a brand button — the shadcn Button's ghost
 * variant paints a transparent border on all four sides, which would
 * erase the divider between the stacked controls.
 */
function ZoomButton({
  label,
  divider,
  onClick,
  children,
}: {
  label: string;
  divider?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-11 cursor-pointer items-center justify-center text-foreground transition-colors duration-140 ease-ink hover:text-brand focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus [&_svg]:size-5",
        divider && "border-t-frame border-line-strong"
      )}
    >
      {children}
    </button>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <b className="block font-heading text-3xl leading-[1.1] font-bold text-brand">
        {value}
      </b>
      <span className="text-sm leading-[1.45] font-bold tracking-widest uppercase text-foreground-muted">
        {label}
      </span>
    </div>
  );
}
