/**
 * English editorial content for the landing page's year archive. Paired
 * with gallery.th.ts. New copy, not a literal translation — see the Dev B
 * handoff notes in events.en.ts for the same approach applied here.
 *
 * Titles that were already English/stylized in the Thai source
 * (UnleashXpression, You(th) Matter!, Playing From Playlist, TEDx Youth
 * 2018) are event names, not sentences — they stay identical in both
 * locales, the same way "TED Club" does.
 */

import type { LocalizedGalleryYear } from "@/lib/content/gallery.th";

export const galleryEn: LocalizedGalleryYear[] = [
  {
    year: "2024",
    title: "Coming Home",
    desc: "A warm homecoming — finding your identity and the power of being young.",
  },
  {
    year: "2023",
    title: "UnleashXpression",
    desc: "Breaking free — letting your true, unfiltered self out.",
  },
  {
    year: "2022",
    title: "You(th) Matter!",
    desc: "Amplifying sharp kids and fired-up teachers until the whole country hears them.",
  },
  {
    year: "2019",
    title: "Playing From Playlist",
    desc: "The soundtrack of your life, chosen by no one but you.",
  },
  {
    year: "2018",
    title: "TEDx Youth 2018",
    desc: "The stage where every single speaker was still a kid.",
  },
];
