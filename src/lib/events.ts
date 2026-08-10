/**
 * Per-edition event pages, one per year, served from /[locale]/events/[year].
 *
 * Everything a year's page renders lives in one `EventYear` object, so
 * adding the next edition is adding one entry to `SHARED_EVENTS` (plus a
 * matching entry in both `src/lib/content/events.en.ts` and
 * `events.th.ts`) — no new route and no new component. The pages run on
 * the TEDx main CI scope only ([data-theme="main"]); nothing here carries
 * a seasonal brand value.
 *
 * The data is split the same way everywhere in this codebase now: fields
 * that read differently in English and Thai (theme, date, venue,
 * description, alts, speaker copy) live in the per-locale content
 * modules; fields that are identical regardless of language (ids,
 * durations, image paths, aspect ratios) live once, here, in
 * `SHARED_EVENTS`. `getEvents(locale)` zips the two together by year and
 * speaker/photo index — the content modules must keep the same order and
 * length as `SHARED_EVENTS` or the zip throws.
 *
 * TODO(content): the `youtubeId` / `playlistUrl` values below are
 * placeholders (`REPLACEME*`). Paste the real 11-character video ids and
 * the playlist id once the talks are published; the links are already
 * well-formed everywhere else.
 */

import type { Locale } from "@/i18n/routing";
import { eventsEn } from "@/lib/content/events.en";
import { eventsTh } from "@/lib/content/events.th";

/* ── Localized content shape ─────────────────────────────────────────
 * Shared by both src/lib/content/events.en.ts and events.th.ts so
 * neither content module has to depend on the other for its types. */

export type LocalizedSpeaker = {
  nickname: string;
  fullName: string;
  oneLiner: string;
  talkTitle: string;
};

export type LocalizedPhoto = {
  alt: string;
};

export type LocalizedEventYear = {
  year: string;
  theme: string;
  date: string;
  venue: string;
  description: string;
  /** Only read when the shared entry has a cover image. */
  coverAlt?: string;
  speakers: LocalizedSpeaker[];
  photos: LocalizedPhoto[];
};

export type EventSpeaker = {
  /** Nickname — the headline on the card. */
  nickname: string;
  /** Given + family name, set below the nickname. */
  fullName: string;
  /** One line about who they are, not a job title. */
  oneLiner: string;
  talkTitle: string;
  /** 11-char YouTube video id, or null while the talk is unpublished. */
  youtubeId: string | null;
  /** m:ss as printed on YouTube. */
  duration: string;
  /** Path under /public, or null to fall back to the initial panel. */
  photo: string | null;
};

/** Tile shape in the photo wall. Keys map to aspect classes in the component. */
export type PhotoRatio = "video" | "square" | "portrait" | "landscape";

export type EventPhoto = {
  /** Path under /public, or null to render the placeholder drop-zone. */
  src: string | null;
  alt: string;
  ratio: PhotoRatio;
};

export type EventYear = {
  /** Also the URL segment: /events/2025. */
  year: string;
  /** The year's theme — the hero headline. */
  theme: string;
  /** Latin lockup set above the theme. Identical in both locales. */
  themeEn: string;
  date: string;
  venue: string;
  /** The hero paragraph. */
  description: string;
  cover: { src: string; alt: string } | null;
  /** Full playlist for the year, or null if nothing is published yet. */
  playlistUrl: string | null;
  speakers: EventSpeaker[];
  photos: EventPhoto[];
};

/* ── Shared (non-localized) shape ────────────────────────────────────
 * `youtubeId`, `duration` and `photo` never change with language, so
 * they live once here instead of being copied into both content
 * modules, where the copies would eventually drift. */

type SharedSpeaker = {
  youtubeId: string | null;
  duration: string;
  photo: string | null;
};

type SharedPhoto = {
  src: string | null;
  ratio: PhotoRatio;
};

type SharedEventYear = {
  year: string;
  themeEn: string;
  cover: { src: string } | null;
  playlistUrl: string | null;
  speakers: SharedSpeaker[];
  photos: SharedPhoto[];
};

const PHOTO_WALL_2025: SharedPhoto[] = [
  { src: "/assets/gallery-2025-cover.jpg", ratio: "video" },
  { src: null, ratio: "portrait" },
  { src: null, ratio: "square" },
  { src: null, ratio: "landscape" },
  { src: null, ratio: "portrait" },
  { src: null, ratio: "square" },
  { src: null, ratio: "landscape" },
  { src: null, ratio: "video" },
];

const SHARED_EVENTS: SharedEventYear[] = [
  {
    year: "2025",
    themeEn: "Woven Talks",
    cover: { src: "/assets/gallery-2025-cover.jpg" },
    playlistUrl: "https://www.youtube.com/playlist?list=REPLACEME_PLAYLIST_2025",
    speakers: [
      { youtubeId: "REPLACEME01", duration: "11:42", photo: "/assets/speakers/2025-01.png" },
      { youtubeId: "REPLACEME02", duration: "09:58", photo: "/assets/speakers/2025-02.png" },
      { youtubeId: "REPLACEME03", duration: "13:07", photo: "/assets/speakers/2025-03.png" },
      { youtubeId: "REPLACEME04", duration: "10:21", photo: "/assets/speakers/2025-04.png" },
      { youtubeId: "REPLACEME05", duration: "12:35", photo: "/assets/speakers/2025-05.png" },
      { youtubeId: "REPLACEME06", duration: "14:12", photo: "/assets/speakers/2025-06.png" },
      { youtubeId: "REPLACEME07", duration: "12:50", photo: "/assets/speakers/2025-07.png" },
      { youtubeId: "REPLACEME08", duration: "10:44", photo: "/assets/speakers/2025-08.png" },
      { youtubeId: "REPLACEME09", duration: "11:03", photo: "/assets/speakers/2025-09.png" },
      { youtubeId: "REPLACEME10", duration: "09:26", photo: "/assets/speakers/2025-10.png" },
      { youtubeId: "REPLACEME11", duration: "13:31", photo: "/assets/speakers/2025-11.png" },
      { youtubeId: "REPLACEME12", duration: "10:09", photo: "/assets/speakers/2025-12.png" },
    ],
    photos: PHOTO_WALL_2025,
  },
  {
    year: "2024",
    themeEn: "Coming Home",
    cover: null,
    playlistUrl: null,
    speakers: [
      { youtubeId: null, duration: "12:18", photo: null },
      { youtubeId: null, duration: "10:55", photo: null },
      { youtubeId: null, duration: "11:29", photo: null },
      { youtubeId: null, duration: "09:47", photo: null },
      { youtubeId: null, duration: "13:02", photo: null },
      { youtubeId: null, duration: "12:41", photo: null },
      { youtubeId: null, duration: "10:16", photo: null },
      { youtubeId: null, duration: "11:08", photo: null },
      { youtubeId: null, duration: "12:24", photo: null },
      { youtubeId: null, duration: "14:03", photo: null },
    ],
    photos: [
      { src: null, ratio: "video" },
      { src: null, ratio: "portrait" },
      { src: null, ratio: "square" },
      { src: null, ratio: "landscape" },
    ],
  },
];

/** The years that have a page, newest first. Locale-independent. */
export const eventYears: string[] = SHARED_EVENTS.map((e) => e.year);

function localizedEvents(locale: Locale) {
  return locale === "th" ? eventsTh : eventsEn;
}

/** Merges the shared, non-localized data with a locale's editorial content. */
export function getEvents(locale: Locale): EventYear[] {
  const localized = localizedEvents(locale);

  return SHARED_EVENTS.map((shared) => {
    const loc = localized.find((l) => l.year === shared.year);
    if (!loc) {
      throw new Error(`Missing ${locale} content for event year ${shared.year}`);
    }
    if (loc.speakers.length !== shared.speakers.length) {
      throw new Error(
        `${locale} content for ${shared.year} has ${loc.speakers.length} speakers, expected ${shared.speakers.length}`
      );
    }
    if (loc.photos.length !== shared.photos.length) {
      throw new Error(
        `${locale} content for ${shared.year} has ${loc.photos.length} photos, expected ${shared.photos.length}`
      );
    }

    return {
      year: shared.year,
      theme: loc.theme,
      themeEn: shared.themeEn,
      date: loc.date,
      venue: loc.venue,
      description: loc.description,
      cover: shared.cover ? { src: shared.cover.src, alt: loc.coverAlt ?? "" } : null,
      playlistUrl: shared.playlistUrl,
      speakers: shared.speakers.map((s, i) => ({
        ...s,
        nickname: loc.speakers[i].nickname,
        fullName: loc.speakers[i].fullName,
        oneLiner: loc.speakers[i].oneLiner,
        talkTitle: loc.speakers[i].talkTitle,
      })),
      photos: shared.photos.map((p, i) => ({
        ...p,
        alt: loc.photos[i].alt,
      })),
    };
  });
}

export function getEvent(locale: Locale, year: string): EventYear | undefined {
  return getEvents(locale).find((e) => e.year === year);
}

/** Route for a year's page, or null when that year has no page yet. */
export function eventHref(year: string): string | null {
  return eventYears.includes(year) ? `/events/${year}` : null;
}

export function talkUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
