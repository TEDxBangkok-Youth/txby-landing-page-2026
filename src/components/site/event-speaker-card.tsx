import Image from "next/image";

import type { EventSpeaker } from "@/lib/events";

/**
 * One speaker on a year's page: nickname as the headline, full name
 * underneath, and the one-line description that says who they are.
 */
export function EventSpeakerCard({ speaker }: { speaker: EventSpeaker }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="relative aspect-square overflow-hidden rounded-card bg-surface-sunken">
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={`${speaker.nickname} — ${speaker.fullName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-full items-center justify-center font-heading text-6xl font-bold text-foreground-muted/40"
          >
            {speaker.nickname.charAt(0)}
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-heading text-xl leading-heading font-bold text-foreground">
          {speaker.nickname}
        </h3>
        <p className="mt-0.5 text-sm leading-[1.45] text-foreground-muted">
          {speaker.fullName}
        </p>
        <p className="mt-2.5 text-sm leading-normal text-pretty text-foreground-secondary">
          {speaker.oneLiner}
        </p>
      </div>
    </div>
  );
}
