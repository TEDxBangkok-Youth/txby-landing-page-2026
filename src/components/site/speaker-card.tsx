import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { toneTint } from "@/components/site/tones";
import type { speakers } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Speaker = (typeof speakers)[number];

/**
 * A speaker portrait over a tinted panel, with the talk title pinned
 * to the bottom of the caption so cards in a row line up.
 */
export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card variant="sticker" className="min-w-0 gap-0">
      <div
        className={cn(
          "relative aspect-square overflow-hidden border-b-sticker border-line-strong",
          toneTint[speaker.tone]
        )}
      >
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            sizes="(max-width: 768px) 50vw, 220px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-heading text-6xl font-bold text-foreground opacity-55">
            {speaker.initial}
          </div>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-1.5 px-4 pt-3.5 pb-4.5">
        <div className="font-heading text-body leading-[1.2] font-bold text-foreground">
          {speaker.name}
        </div>
        <div className="text-caption text-foreground-muted">{speaker.role}</div>
        <div className="mt-auto pt-2.5 text-caption leading-[1.4] font-semibold text-brand-hover">
          &ldquo;{speaker.talk}&rdquo;
        </div>
      </CardContent>
    </Card>
  );
}
