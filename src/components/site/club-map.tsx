"use client";

import { useEffect, useRef } from "react";
import { CLUBS, MAP_DEFAULT_TITLE } from "@/lib/site-data";

const ICON = {
  plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>',
  minus:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path></svg>',
  reset:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>',
};

/**
 * Interactive map of Thai provinces with active TED Clubs. Hover highlights a
 * province and shows a tooltip; click drills into that province's detail. The
 * map supports zoom (buttons + wheel) and drag-to-pan. Ported from the design's
 * `_initClubMap`.
 */
export function ClubMap() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || (root as HTMLElement & { _ready?: boolean })._ready) return;
    (root as HTMLElement & { _ready?: boolean })._ready = true;

    root.innerHTML =
      '<div class="wrap">' +
      '<div class="mapcol">' +
      '<div class="zoomctl">' +
      '<button class="zin" aria-label="Zoom in">' + ICON.plus + "</button>" +
      '<button class="zreset" aria-label="Reset zoom">' + ICON.reset + "</button>" +
      '<button class="zout" aria-label="Zoom out">' + ICON.minus + "</button>" +
      "</div>" +
      "</div>" +
      '<div class="listcol">' +
      '<div class="listhead">' +
      '<button class="backbtn">&larr; กลับไปที่รายชื่อทั้งหมด</button>' +
      '<div class="listtitle">' + MAP_DEFAULT_TITLE + "</div>" +
      "</div>" +
      '<div class="detail"><div class="detailbody"></div></div>' +
      '<div class="list"></div>' +
      "</div>" +
      "</div>";

    const mapcol = root.querySelector<HTMLElement>(".mapcol")!;
    const zoomctl = root.querySelector<HTMLElement>(".zoomctl")!;
    const listEl = root.querySelector<HTMLElement>(".list")!;
    const titleEl = root.querySelector<HTMLElement>(".listtitle")!;
    const backEl = root.querySelector<HTMLElement>(".backbtn")!;
    const detailEl = root.querySelector<HTMLElement>(".detail")!;
    const detailBody = root.querySelector<HTMLElement>(".detailbody")!;

    const tipEl = document.createElement("div");
    tipEl.className = "clubmap-tip";
    document.body.appendChild(tipEl);

    let selected = -1;
    const paint = () => {
      root.querySelectorAll<SVGPathElement>(".mapcol svg path.club").forEach((p) => {
        const i = +(p.dataset.i || 0);
        p.classList.toggle("on", i === selected);
        p.classList.toggle("dim", selected !== -1 && i !== selected);
      });
    };
    const openDetail = (i: number) => {
      selected = i;
      paint();
      const c = CLUBS[i];
      titleEl.textContent = c.city;
      backEl.classList.add("show");
      detailBody.innerHTML =
        '<div class="stats"><div class="stat"><b>' + c.clubs + "</b><span>ชมรม</span></div>" +
        '<div class="stat"><b>' + c.since + "</b><span>ตั้งแต่</span></div></div>" +
        '<div class="note">' + c.note + "</div>";
      detailEl.classList.add("show");
    };
    const deselect = () => {
      selected = -1;
      paint();
      titleEl.textContent = MAP_DEFAULT_TITLE;
      backEl.classList.remove("show");
      detailEl.classList.remove("show");
    };
    const hover = (i: number, on: boolean) => {
      const p = root.querySelector<SVGPathElement>(
        '.mapcol svg path[id="' + CLUBS[i].provinceId + '"]'
      );
      if (p) p.classList.toggle("on", on || i === selected);
    };
    const moveTip = (e: MouseEvent) => {
      tipEl.style.left = e.clientX + "px";
      tipEl.style.top = e.clientY + "px";
    };
    const showTip = (e: MouseEvent, c: (typeof CLUBS)[number]) => {
      tipEl.innerHTML =
        "<div>" + c.city + '</div><div class="sub">' + c.en + " · " + c.note + "</div>";
      tipEl.classList.add("show");
      moveTip(e);
    };
    const hideTip = () => tipEl.classList.remove("show");

    CLUBS.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "row";
      b.innerHTML =
        '<div class="city">' + c.city + '</div><div class="meta">' +
        c.en + " · " + c.note + " · ตั้งแต่ " + c.since + "</div>";
      b.addEventListener("click", () => openDetail(i));
      b.addEventListener("mouseenter", () => hover(i, true));
      b.addEventListener("mouseleave", () => hover(i, false));
      listEl.appendChild(b);
    });
    backEl.addEventListener("click", deselect);

    let disposed = false;
    fetch("/assets/thailand-map.svg")
      .then((r) => r.text())
      .then((svgText) => {
        if (disposed) return;
        const holder = document.createElement("div");
        holder.innerHTML = svgText;
        const svgEl = holder.querySelector("svg");
        if (!svgEl) return;
        mapcol.insertBefore(svgEl, zoomctl);
        svgEl.setAttribute("viewBox", "0 0 559.57092 1024.7631");
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");

        CLUBS.forEach((c, i) => {
          const p = svgEl.querySelector<SVGPathElement>(
            'path[id="' + c.provinceId + '"]'
          );
          if (!p) return;
          p.classList.add("club");
          p.dataset.i = String(i);
          p.style.cursor = "pointer";
          p.addEventListener("click", () => openDetail(i));
          p.addEventListener("mouseenter", (e) => {
            hover(i, true);
            showTip(e as MouseEvent, c);
          });
          p.addEventListener("mousemove", (e) => moveTip(e as MouseEvent));
          p.addEventListener("mouseleave", () => {
            hover(i, false);
            hideTip();
          });
          const t = document.createElementNS("http://www.w3.org/2000/svg", "title");
          t.textContent = c.city + " · " + c.note;
          p.appendChild(t);
        });
        paint();

        svgEl.addEventListener("click", (e) => {
          if (!(e.target as Element).classList.contains("club")) deselect();
        });

        let zoom = 1;
        let tx = 0;
        let ty = 0;
        const MIN = 1;
        const MAX = 6;
        const apply = () => {
          (svgEl as unknown as SVGElement).style.transform =
            "translate(" + tx + "px," + ty + "px) scale(" + zoom + ")";
        };
        const setZoom = (next: number) => {
          zoom = Math.min(MAX, Math.max(MIN, next));
          if (zoom === MIN) {
            tx = 0;
            ty = 0;
          }
          apply();
        };
        root.querySelector(".zin")!.addEventListener("click", () => setZoom(zoom + 0.5));
        root.querySelector(".zout")!.addEventListener("click", () => setZoom(zoom - 0.5));
        root.querySelector(".zreset")!.addEventListener("click", () => {
          setZoom(1);
          deselect();
        });
        mapcol.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();
            setZoom(zoom + (e.deltaY < 0 ? 0.3 : -0.3));
          },
          { passive: false }
        );

        let dragging = false;
        let maybeDrag = false;
        let sx = 0;
        let sy = 0;
        let stx = 0;
        let sty = 0;
        const THRESHOLD = 4;
        svgEl.addEventListener("pointerdown", (e) => {
          if (zoom <= MIN) return;
          maybeDrag = true;
          dragging = false;
          sx = e.clientX;
          sy = e.clientY;
          stx = tx;
          sty = ty;
          try {
            svgEl.setPointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
        });
        svgEl.addEventListener("pointermove", (e) => {
          if (!maybeDrag) return;
          if (!dragging) {
            if (Math.abs(e.clientX - sx) < THRESHOLD && Math.abs(e.clientY - sy) < THRESHOLD)
              return;
            dragging = true;
            svgEl.classList.add("panning");
          }
          tx = stx + (e.clientX - sx);
          ty = sty + (e.clientY - sy);
          apply();
        });
        const endDrag = () => {
          maybeDrag = false;
          dragging = false;
          svgEl.classList.remove("panning");
        };
        svgEl.addEventListener("pointerup", endDrag);
        svgEl.addEventListener("pointerleave", endDrag);
      });

    return () => {
      disposed = true;
      tipEl.remove();
    };
  }, []);

  return (
    <div
      id="clubmap"
      ref={rootRef}
      role="group"
      aria-label="แผนที่ TED Club ในประเทศไทย"
      style={{
        position: "relative",
        height: 620,
        overflow: "hidden",
        borderRadius: "var(--t-radius-card)",
      }}
    />
  );
}
