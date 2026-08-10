import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { ImageSlot } from "@/components/site/image-slot";
import { toneField, toneInk, toneTint } from "@/components/site/tones";
import { eventHref } from "@/lib/events";
import type { GalleryYear } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * One year in the gallery archive: tinted image panel over a paper
 * caption. Years that already have an event page link to it; the rest
 * stay inert until their page exists.
 */
export function GalleryYearCard({ year }: { year: GalleryYear }) {
  const href = eventHref(year.year);

  const card = (
    <>
      <div
        className={cn(
          "relative aspect-16/10 border-b-sticker border-line-strong",
          toneTint[year.tone]
        )}
      >
        <ImageSlot shape="rect" placeholder={year.placeholder} />
      </div>
      <CardContent className="flex-1 bg-surface-card px-4.5 pt-4 pb-5">
        <div
          className={cn(
            "font-heading text-xs leading-[1.2] font-bold tracking-eyebrow uppercase",
            toneInk[year.chipTone]
          )}
        >
          {year.year} · {year.talks}
        </div>
        <div className="mt-2 font-heading text-xl leading-[1.15] font-bold uppercase">
          {year.title}
        </div>
        <div className="mt-2 text-sm leading-normal text-foreground-muted">
          {year.desc}
        </div>
      </CardContent>
    </>
  );

  return (
    <Card
      asChild
      variant="sticker"
      className={cn(
        "gap-0 text-foreground",
        toneField[year.tone],
        // Only the years that lead somewhere get the sticker lift —
        // motion on an inert card promises a click that never lands.
        href &&
          "transition-[translate,box-shadow] duration-140 ease-ink hover:translate-x-(--t-lift-x) hover:translate-y-(--t-lift-y) hover:shadow-card-hover active:translate-x-(--t-press-x) active:translate-y-(--t-press-y) active:shadow-card-press"
      )}
    >
      {href ? <Link href={href}>{card}</Link> : <div>{card}</div>}
    </Card>
  );
}
