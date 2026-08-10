/**
 * Content for the TEDxBangkok Youth 2026 landing page (v3).
 * Mirrors the data + renderVals() logic from the Claude Design document
 * "TEDxBangkokYouth Landing v3".
 *
 * Same locale split as src/lib/events.ts: fields that read differently in
 * English and Thai (gallery year titles/descriptions, the volunteer
 * roster's names) live in src/lib/content/*.en.ts / *.th.ts and are
 * merged in here by the get*(locale) accessors below. Fields that don't
 * change with language — tones, slot ids, talk counts, the TED Club
 * numbers — stay in this file so they're declared exactly once.
 *
 * `Club.city` / `Club.en` are the one exception: both the Thai and
 * English province names live together on the same record rather than in
 * a per-locale content module, because they're proper nouns that always
 * travel as a pair (see MESSAGES.md's Content modules section) — the
 * component picks the one to show by locale rather than the data module
 * picking it for them.
 */

import type { Locale } from "@/i18n/routing";
import { galleryEn } from "@/lib/content/gallery.en";
import { galleryTh } from "@/lib/content/gallery.th";
import { rosterEn } from "@/lib/content/roster.en";
import { rosterTh } from "@/lib/content/roster.th";
import { getEvent } from "@/lib/events";

/** The edition the landing page features — its line-up and poster. */
export const FEATURED_YEAR = "2025";

/** Labels resolve through `t(`nav.${key}`)` — see nav-bar.tsx. */
export const navLinks: Array<{
  key: "gallery" | "club" | "speakers" | "volunteers";
  href: string;
}> = [
  { key: "gallery", href: "#gallery" },
  { key: "club", href: "#club" },
  { key: "speakers", href: "#speakers" },
  { key: "volunteers", href: "#volunteers" },
];

// ─── Gallery ────────────────────────────────────────────────
/** Brand tones, resolved to token-driven classes in the card components. */
export type Tone = "pink" | "yellow" | "cyan" | "green" | "red";

export type GalleryYear = {
  /** Drives the card field and its image panel tint. */
  tone: Tone;
  /** The eyebrow tone. 2023 deliberately pairs a red chip with a yellow card. */
  chipTone: Tone;
  year: string;
  talks: number;
  title: string;
  desc: string;
  slotId: string;
};

type SharedGalleryYear = {
  tone: Tone;
  chipTone: Tone;
  year: string;
  talks: number;
  slotId: string;
};

const GALLERY_YEARS_SHARED: SharedGalleryYear[] = [
  { tone: "cyan", chipTone: "cyan", year: "2024", talks: 10, slotId: "v3-gallery-2024-cover" },
  { tone: "yellow", chipTone: "red", year: "2023", talks: 9, slotId: "v3-gallery-2023-cover" },
  { tone: "green", chipTone: "green", year: "2022", talks: 8, slotId: "v3-gallery-2022-cover" },
  { tone: "pink", chipTone: "pink", year: "2019", talks: 8, slotId: "v3-gallery-2019-cover" },
  { tone: "red", chipTone: "red", year: "2018", talks: 6, slotId: "v3-gallery-2018-cover" },
];

function galleryLocalized(locale: Locale) {
  return locale === "th" ? galleryTh : galleryEn;
}

export function getGalleryYears(locale: Locale): GalleryYear[] {
  const localized = galleryLocalized(locale);

  return GALLERY_YEARS_SHARED.map((shared) => {
    const loc = localized.find((l) => l.year === shared.year);
    if (!loc) {
      throw new Error(`Missing ${locale} gallery content for year ${shared.year}`);
    }
    return { ...shared, title: loc.title, desc: loc.desc };
  });
}

// ─── Speakers ───────────────────────────────────────────────
const TONES: Tone[] = ["pink", "yellow", "cyan", "green", "red"];

export type Speaker = {
  nickname: string;
  fullName: string;
  oneLiner: string;
  photo: string | null;
  initial: string;
  tone: Tone;
};

/**
 * The landing page shows the most recent edition's line-up. The names,
 * one-liners and portraits are NOT duplicated here — they come from
 * src/lib/events.ts, the same source the /events/[year] page reads, so
 * the two pages cannot describe the same speaker differently in either
 * language. Only the seasonal tint is decided here, because it belongs
 * to this page's Thaigredient styling rather than to the speaker.
 */
export function getSpeakers(locale: Locale): Speaker[] {
  return (getEvent(locale, FEATURED_YEAR)?.speakers ?? []).map((s, i) => ({
    nickname: s.nickname,
    fullName: s.fullName,
    oneLiner: s.oneLiner,
    photo: s.photo,
    initial: (s.nickname || "?").trim().charAt(0),
    tone: TONES[i % TONES.length],
  }));
}

// ─── Volunteers roster ──────────────────────────────────────
export type TeamKey =
  | "producer"
  | "advisor"
  | "director"
  | "production"
  | "people"
  | "finance"
  | "sponsor"
  | "it";

/** Order here must match the row order in both roster content modules. */
const TEAM_KEYS: TeamKey[] = [
  "producer",
  "advisor",
  "director",
  "production",
  "people",
  "finance",
  "sponsor",
  "it",
];

function rosterLocalized(locale: Locale) {
  return locale === "th" ? rosterTh : rosterEn;
}

/** Team display names are messages (`volunteers.teams.*`) — the caller
 * resolves `key` through `t()`; this only supplies the roster names. */
export function getTeams(locale: Locale): Array<{ key: TeamKey; names: string[] }> {
  const roster = rosterLocalized(locale);
  return TEAM_KEYS.map((key, i) => ({ key, names: roster[i] ?? [] }));
}

// ─── Footer ─────────────────────────────────────────────────
/** Group and item labels resolve through `footer.groups.*` / `footer.links.*`. */
export const footerGroups: Array<{
  key: "event" | "community" | "info";
  items: Array<{ key: string; href: string }>;
}> = [
  {
    key: "event",
    items: [
      { key: "gallery", href: "#" },
      { key: "speakers", href: "#" },
      { key: "schedule", href: "#" },
      { key: "venue", href: "#" },
    ],
  },
  {
    key: "community",
    items: [
      { key: "tedClub", href: "#" },
      { key: "volunteers", href: "#" },
      { key: "sponsors", href: "#" },
    ],
  },
  {
    key: "info",
    items: [
      { key: "about", href: "#" },
      { key: "faq", href: "#" },
      { key: "contact", href: "#" },
    ],
  },
];

/** Proper nouns — not translated, so they aren't in the message catalog. */
export const social = ["Instagram", "Facebook", "YouTube", "TikTok"];

// ─── TED Club map ───────────────────────────────────────────
export type Club = {
  /** Thai province name. */
  city: string;
  /** English province name. */
  en: string;
  clubs: number;
  since: number;
  provinceId: string;
};

export const CLUBS: Club[] = [
  { city: "กรุงเทพมหานคร", en: "Bangkok", clubs: 6, since: 2019, provinceId: "TH-10" },
  { city: "นนทบุรี", en: "Nonthaburi", clubs: 1, since: 2024, provinceId: "TH-12" },
  { city: "ชลบุรี", en: "Chonburi", clubs: 2, since: 2023, provinceId: "TH-20" },
  { city: "เชียงใหม่", en: "Chiang Mai", clubs: 3, since: 2021, provinceId: "TH-50" },
  { city: "เชียงราย", en: "Chiang Rai", clubs: 1, since: 2024, provinceId: "TH-57" },
  { city: "พิษณุโลก", en: "Phitsanulok", clubs: 1, since: 2023, provinceId: "TH-65" },
  { city: "ขอนแก่น", en: "Khon Kaen", clubs: 2, since: 2022, provinceId: "TH-40" },
  { city: "นครราชสีมา", en: "Nakhon Ratchasima", clubs: 2, since: 2022, provinceId: "TH-30" },
  { city: "อุบลราชธานี", en: "Ubon Ratchathani", clubs: 1, since: 2024, provinceId: "TH-34" },
  { city: "สุราษฎร์ธานี", en: "Surat Thani", clubs: 1, since: 2024, provinceId: "TH-84" },
  { city: "ภูเก็ต", en: "Phuket", clubs: 1, since: 2023, provinceId: "TH-83" },
  { city: "หาดใหญ่ สงขลา", en: "Hat Yai", clubs: 2, since: 2022, provinceId: "TH-90" },
];

/**
 * `Club` records aren't per-edition editorial content — the province names
 * and counts don't change with the year — so they stay locale-independent
 * here instead of moving into src/lib/content/. Unlike the other accessors
 * this one takes no locale: each record already carries both its Thai
 * (`city`) and English (`en`) name, and club-map.tsx picks the one to show
 * and counts up from `clubMap.clubCount` at render time.
 */
export function getClubs(): Club[] {
  return CLUBS;
}
