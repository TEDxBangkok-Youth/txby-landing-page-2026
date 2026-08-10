import Image from "next/image";

import { ImageSlot } from "@/components/site/image-slot";
import type { EventPhoto, PhotoRatio } from "@/lib/events";
import { cn } from "@/lib/utils";

/**
 * Masonry photo wall. CSS multi-column rather than a grid, so tiles of
 * different aspect ratios pack without leaving gaps and without any
 * client-side measuring. Slots with no photo yet fall back to the
 * placeholder drop-zone.
 */
const ratioClass: Record<PhotoRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-4/5",
  landscape: "aspect-3/2",
};

export function PhotoWall({ photos }: { photos: EventPhoto[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {photos.map((photo, i) => (
        <figure
          key={photo.src ?? `slot-${i}`}
          className={cn(
            "relative w-full break-inside-avoid overflow-hidden rounded-card bg-surface-sunken",
            ratioClass[photo.ratio]
          )}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover"
            />
          ) : (
            <ImageSlot shape="rect" placeholder={photo.alt} />
          )}
        </figure>
      ))}
    </div>
  );
}
