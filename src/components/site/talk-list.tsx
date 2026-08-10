import { ArrowUpRightIcon } from "lucide-react";

import { talkUrl, type EventSpeaker } from "@/lib/events";
import { cn } from "@/lib/utils";

/**
 * The year's talks as a numbered index. Deliberately typographic rather
 * than another photo grid — the speaker section above already carries
 * the portraits, so this reads as a table of contents for the playlist.
 */
export function TalkList({ speakers }: { speakers: EventSpeaker[] }) {
  return (
    <ol className="border-t border-line">
      {speakers.map((speaker, i) => {
        const href = speaker.youtubeId ? talkUrl(speaker.youtubeId) : null;

        const row = (
          <>
            <span className="font-heading text-5xl leading-none font-bold tabular-nums text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              {/* The row is an anchor, and links default to brand red —
                  the title has to opt back into ink. */}
              <h3 className="font-heading text-xl leading-snug font-bold text-balance text-foreground transition-colors duration-140 ease-ink group-hover/row:text-brand">
                {speaker.talkTitle}
              </h3>
              <p className="mt-1 text-sm leading-[1.45] text-foreground-muted">
                {speaker.nickname} · {speaker.fullName}
              </p>
            </div>

            <div className="flex items-center gap-5 text-sm leading-[1.45] text-foreground-muted md:justify-self-end">
              <span className="tabular-nums">{speaker.duration}</span>
              {href ? (
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-6 text-brand transition-[translate] duration-140 ease-ink group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
                />
              ) : (
                <span>เร็ว ๆ นี้</span>
              )}
            </div>
          </>
        );

        const rowClass = cn(
          "grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 px-4 py-6",
          "md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:items-center md:gap-x-8",
          "max-md:[&>*:last-child]:col-start-2"
        );

        return (
          <li key={speaker.talkTitle} className="border-b border-line">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  rowClass,
                  "group/row transition-colors duration-140 ease-ink hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none"
                )}
              >
                {row}
              </a>
            ) : (
              <div className={rowClass}>{row}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
