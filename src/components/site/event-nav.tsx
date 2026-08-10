import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteNav, SiteNavLogo } from "@/components/site/site-nav";

/**
 * Header for a year's event page. Same bar as the landing page — see
 * SiteNav — but solid from the top and sticky rather than fixed, because
 * it sits above a black hero instead of over a coloured field, so it has
 * no scrolled state to track.
 */
const sectionLinks = [
  { label: "Speakers", href: "#speakers" },
  { label: "บรรยากาศในงาน", href: "#photos" },
  { label: "Talks", href: "#talks" },
];

export function EventNav({
  year,
  playlistUrl,
}: {
  year: string;
  playlistUrl: string | null;
}) {
  return (
    <SiteNav
      className="sticky top-0 z-50 border-b border-line bg-surface-card"
      links={sectionLinks}
      brand={
        <>
          <SiteNavLogo href="/" alt="TEDxBangkok Youth — กลับหน้าแรก" />
          {/* On a narrow screen the lockup and the playlist button take
              the whole bar; the hero repeats the year immediately below. */}
          <span
            aria-hidden
            className="hidden h-7 w-px shrink-0 bg-line sm:block"
          />
          <span className="hidden shrink-0 font-heading text-base leading-[1.6] font-bold sm:block">
            {year}
          </span>
        </>
      }
      actions={
        playlistUrl ? (
          <Button asChild className="text-sm leading-normal">
            <a href={playlistUrl} target="_blank" rel="noreferrer noopener">
              <PlayIcon />
              {/* One flex child, or the button's gap-2 lands between the
                  two words instead of a single space. */}
              <span>
                ดู Talk<span className="hidden sm:inline"> ทั้งหมด</span>
              </span>
            </a>
          </Button>
        ) : null
      }
    />
  );
}
