import { Card, CardContent } from "@/components/ui/card";
import { ImageSlot } from "@/components/site/image-slot";
import { toneField, toneInk, toneTint } from "@/components/site/tones";
import type { GalleryYear } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** One year in the gallery archive: tinted image panel over a paper caption. */
export function GalleryYearCard({ year }: { year: GalleryYear }) {
  return (
    <Card
      asChild
      variant="sticker"
      className={cn("gap-0 text-foreground", toneField[year.tone])}
    >
      <a href="#">
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
              "font-heading text-micro leading-[1.2] font-bold tracking-eyebrow uppercase",
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
      </a>
    </Card>
  );
}
