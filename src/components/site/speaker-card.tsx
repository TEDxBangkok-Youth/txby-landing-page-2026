import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { toneTint } from "@/components/site/tones";
import type { speakers } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Speaker = (typeof speakers)[number];

/**
 * A speaker portrait over a tinted panel. Carries exactly the same
 * three facts as the event page's card — ชื่อเล่น, ชื่อจริง and the
 * one-liner — from the same source in src/lib/events.ts. The talk title
 * belongs to the year page's talk index, not here.
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
            alt={`${speaker.nickname} — ${speaker.fullName}`}
            fill
            sizes="(max-width: 768px) 50vw, 220px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-full items-center justify-center font-heading text-6xl font-bold text-foreground opacity-55"
          >
            {speaker.initial}
          </div>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col px-4 pt-3.5 pb-4.5">
        <h3 className="font-heading text-xl leading-heading font-bold text-foreground">
          {speaker.nickname}
        </h3>
        <p className="mt-0.5 text-sm leading-[1.45] text-foreground-muted">
          {speaker.fullName}
        </p>
        <p className="mt-2.5 text-sm leading-normal text-pretty text-foreground-secondary">
          {speaker.oneLiner}
        </p>
      </CardContent>
    </Card>
  );
}
