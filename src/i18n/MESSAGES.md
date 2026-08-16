# Message key contract

The authoritative list of translation keys for `messages/en.json` and
`messages/th.json`. Both files must contain **exactly** this key set — same
keys, same shape, no extras, no omissions.

Two rules decide where a string lives:

- **UI chrome** — labels, CTAs, section headings, aria-labels, placeholders.
  These are messages, listed below.
- **Editorial content** — anything about a specific edition, speaker, or
  club: year themes, talk titles, speaker one-liners, dates, venues, photo
  alts. These are **not** messages. They live in per-locale content modules
  under `src/lib/content/` (see the bottom of this file).

The rule of thumb: if adding the 2027 edition would change the string, it is
content, not a message.

## Conventions

- ICU plurals for anything with a count: `{count, plural, one {# talk} other {# talks}}`.
  Thai has one plural form; use `other` only in `th.json`.
- Interpolation uses named args: `{year}`, `{count}`, `{date}`.
- Keys are snake_case, nested by section, max three levels deep.
- No trailing punctuation in button labels.
- `aria-*` strings are real copy and get real translations, not transliterations.

---

## `nav` — landing page header (`nav-bar.tsx`)

| Key | Current Thai source | Notes |
|---|---|---|
| `nav.gallery` | `Gallery` | already English; needs a Thai value |
| `nav.club` | `TED Club` | brand name, stays "TED Club" in both |
| `nav.speakers` | `Speakers` | |
| `nav.volunteers` | `Volunteers` | |
| `nav.tickets` | `ซื้อบัตรเข้าชม` | primary CTA |
| `nav.open_menu` | `เปิดเมนู` | aria-label on the mobile trigger |
| `nav.home_alt` | `TEDxBangkok Youth — กลับหน้าแรก` | logo alt, also used by `event-nav.tsx` |
| `nav.menu_title` | — | mobile sheet heading; had no visible string before |

## `hero` — landing hero (`app/[locale]/page.tsx`)

| Key | Current Thai source | Notes |
|---|---|---|
| `hero.title_line1` | `ส่วนผสม` | |
| `hero.title_highlight` | `ลับ` | the cyan boxed word |
| `hero.title_line2` | `ฉบับคนไทย` | the outlined line |
| `hero.bowl_alt` | `ชามส่วนผสมลับ` | |
| `hero.price_tag_alt` | `฿67.00 เท็ด x บางกอก` | |

**Design constraint:** the three title parts are separately positioned and
styled — they are not one string with markup. Keep them as three keys. The
English line lengths must stay close to the Thai, because the type is sized
in `cqw` against a fixed-ratio stage and will overflow if the English runs
long. Treat this as a headline-writing problem, not a translation problem.

## `gallery` — landing gallery section

| Key | Current Thai source | Notes |
|---|---|---|
| `gallery.title_line1` | `TED Youth` | rendered above a `<br/>` |
| `gallery.title_line2` | `Gallery` | |
| `gallery.lead` | `ทุกปีคือหนึ่งสูตร ย้อนดูธีม ผู้พูด และรสชาติของแต่ละรุ่นที่ผ่านเวทีนี้` | |
| `gallery.featured.badge` | `ปีล่าสุด` | ticket tag |
| `gallery.featured.cover_alt` | `บรรยากาศงานปี 2025` | takes `{year}` |
| `gallery.featured.cta` | `ดูรายละเอียดปี {year}` | also used as the `sr-only` label |
| `gallery.featured.youtube_cta` | `ดู Talk บน YouTube` | |
| `gallery.card.talks` | `10 talks` etc. | **ICU plural on `{count}`** |
| `gallery.card.placeholder` | `รูปปี 2024` | takes `{year}` |

**Refactor required:** the featured block's heading (`เย็บปักถักทอล์ก`) and
paragraph are hardcoded in the page but describe the 2025 edition. They are
content — read them from that year's entry instead of duplicating them.
`GalleryYear.talks` changes from a baked string (`"10 talks"`) to a number.

## `club` — TED Club section

| Key | Current Thai source |
|---|---|
| `club.title_prefix` | `TED Club` |
| `club.title_highlight` | `ทั่วประเทศไทย` |
| `club.lead` | `ชมรมในโรงเรียนและมหาวิทยาลัยที่จัดเวทีของตัวเองตลอดทั้งปี ทุกกิจกรรมออกแบบให้ครูหนึ่งคนจัดได้เอง ด้วยคู่มือและสไลด์ที่เตรียมไว้ให้` |
| `club.logo_alt` | `TED Club · TEDxBangkok Youth` |

## `club_map` — interactive map (`club-map.tsx`, a client component)

| Key | Current Thai source | Notes |
|---|---|---|
| `club_map.label` | `แผนที่ TED Club ในประเทศไทย` | aria-label on the group |
| `club_map.default_title` | `จังหวัดที่มี TED Club` | was `MAP_DEFAULT_TITLE` |
| `club_map.back` | `← กลับไปที่รายชื่อทั้งหมด` | keep the arrow outside the message |
| `club_map.zoom_in` | `ซูมเข้า` | aria-label |
| `club_map.zoom_out` | `ซูมออก` | aria-label |
| `club_map.zoom_reset` | `รีเซ็ตซูม` | aria-label |
| `club_map.stat_clubs` | `ชมรม` | stat caption |
| `club_map.stat_since` | `ตั้งแต่` | stat caption |
| `club_map.club_count` | `6 ชมรม` | **ICU plural on `{count}`** |
| `club_map.since` | `ตั้งแต่ {year}` | list row |

`Club.city` / `Club.en` hold the Thai and English province names — keep both
fields and pick by locale rather than moving them into messages. Only the
current locale's name is rendered; the other one is not shown as a subtitle.

There is no "network hub" label. `Club.note` (a pre-composed Thai string,
`"ศูนย์กลางเครือข่าย · 6 ชมรม"`) became a boolean `isHub` during the i18n
pass and was then dropped along with `club_map.hub` — Bangkok is now listed
like every other province. Restoring it means a new key plus a flag on the
record; nothing in the data marks the hub any more.

## `speakers` / `volunteers` — landing sections

| Key | Current Thai source | Notes |
|---|---|---|
| `speakers.title` | `Speakers` | |
| `speakers.lead` | `{count} คนที่จะขึ้นเวทีปีนี้ พร้อมเรื่องที่ไม่เคยเล่าที่ไหนมาก่อน` | ICU plural |
| `volunteers.title` | `Volunteers` | |
| `volunteers.lead` | `ทุกงานเกิดขึ้นได้เพราะอาสาสมัคร นี่คือรายชื่อทีมงานครบทุกคนของปีนี้` | |
| `volunteers.photo_placeholder` | `รูปทีมอาสาสมัคร` | |
| `volunteers.teams.producer` … | `Producer`, `Advisor`, `Director`, `Production`, `People`, `Finance`, `Sponsor`, `IT` | eight keys, currently English-only; Thai values needed |
| `volunteers.roster_title` | — | roster panel heading |
| `volunteers.back` | — | roster back-link |

## `footer` — `site-footer.tsx`

| Key | Current source |
|---|---|
| `footer.groups.event` | `Event` |
| `footer.groups.community` | `Community` |
| `footer.groups.info` | `Info` |
| `footer.links.gallery` / `speakers` / `schedule` / `venue` | `Gallery`, `Speakers`, `Schedule`, `Venue` |
| `footer.links.ted_club` / `volunteers` / `sponsors` | `TED Club`, `Volunteers`, `Sponsors` |
| `footer.links.about` / `faq` / `contact` | `About`, `FAQ`, `Contact` |
| `footer.copyright` | `© 2026 TEDxBangkok Youth` |
| `footer.logo_alt` | `TEDxBangkok Youth` |
| `footer.disclaimer` | — | **new copy, not in the original design** — the standard TEDx independent-licence line. Added during implementation; drop the key and its usage in `site-footer.tsx` if it is not wanted. |

Social names (`Instagram`, `Facebook`, `YouTube`, `TikTok`) are proper nouns —
leave them out of the catalog.

## `event` — per-edition pages (`app/[locale]/events/[year]/page.tsx`)

| Key | Current Thai source | Notes |
|---|---|---|
| `event.nav.speakers` | `Speakers` | |
| `event.nav.photos` | `บรรยากาศในงาน` | |
| `event.nav.talks` | `Talks` | |
| `event.meta.date` | `วันที่จัดงาน` | |
| `event.meta.venue` | `สถานที่` | |
| `event.meta.talks` | `จำนวน Talk` | |
| `event.meta.talks_value` | `12 talks` | **ICU plural on `{count}`** |
| `event.cta.watch_all` | `ดู Talk ทั้งหมดบน YouTube` | |
| `event.cta.photos` | `รูปบรรยากาศในงาน` | |
| `event.cover_placeholder` | `ภาพหลักของปี {year}` | |
| `event.speakers.title` | `{count} เสียงบนเวทีปี {year}` | ICU plural + `{year}` |
| `event.speakers.lead` | `ชื่อเล่น ชื่อจริง และหนึ่งบรรทัดที่บอกว่าเขาเป็นใคร ก่อนจะขึ้นไปเล่าเรื่องของตัวเองบนวงกลมสีแดง` | see note |
| `event.photos.title` | `รูปบรรยากาศในงาน` | |
| `event.photos.lead` | `ภาพจากวันงาน {date} ตั้งแต่คิวลงทะเบียนหน้าห้อง จนถึงภาพหมู่สุดท้ายหลังไฟบนเวทีดับลง` | takes `{date}` |
| `event.talks.title` | `ดู Talk ย้อนหลัง` | |
| `event.talks.lead` | `ทุก Talk ของปีนี้ ดูฟรีบน YouTube ไม่ต้องสมัครสมาชิก` | |
| `event.talks.playlist_cta` | `เปิดเพลย์ลิสต์ทั้งปี` | |
| `event.talks.coming_soon` | `เร็ว ๆ นี้` | unpublished talk |
| `event.nav.watch` | `ดู Talk` | compact playlist button in the bar |
| `event.nav.watch_suffix` | ` ทั้งหมด` | **leading space is deliberate** — appended on `sm:` and up |

`event.speakers.lead` describes a Thai naming convention (ชื่อเล่น = nickname,
ชื่อจริง = full name) that does not carry into English. Rewrite it for an
English reader rather than translating it literally.

## `meta` — document metadata (`generateMetadata` in the root layout)

| Key | Current Thai source | Notes |
|---|---|---|
| `meta.title` | `TEDxBangkok Youth 2026 · ส่วนผสมลับ ฉบับคนไทย` | browser tab + search headline; keep under ~60 chars |
| `meta.description` | `TEDxBangkok Youth 2026 — เวทีของไอเดียจากคนรุ่นใหม่ หยิบวัตถุดิบธรรมดาในชีวิตแบบไทย ๆ มาผสมใหม่ให้กลายเป็นสูตร(ไม่)ลับของความคิดสร้างสรรค์` | under ~155 chars |

These are real SEO copy, not a translation of the headline. Per-edition
pages override them in their own `generateMetadata` from event content.

## `common`

| Key | Current Thai source |
|---|---|
| `common.image_placeholder` | `รูปภาพ` (the `ImageSlot` default) |
| `common.language_label` | new — aria-label for the language switcher group |

The switcher shows the ISO codes (`TH | EN`), which read the same in either
language, so the locale names themselves are not messages.

---

## Content modules — **not** messages

Per-locale editorial content lives in `src/lib/content/`, keyed by locale and
read through an accessor that takes a `Locale`:

```
src/lib/content/events.en.ts   src/lib/content/events.th.ts
src/lib/content/gallery.en.ts  src/lib/content/gallery.th.ts
src/lib/content/roster.en.ts   src/lib/content/roster.th.ts
```

Localized fields:

- `EventYear`: `theme`, `date`, `venue`, `description`, `cover.alt`, `photos[].alt`
- `EventSpeaker`: `nickname`, `fullName`, `oneLiner`, `talkTitle`
- `GalleryYear`: `title`, `desc`
- volunteer roster names

Not localized — keep in one shared module, not duplicated per locale:

- `EventYear`: `year`, `themeEn`, `playlistUrl`, `cover.src`, `photos[].src`, `photos[].ratio`
- `EventSpeaker`: `youtubeId`, `duration`, `photo`
- `GalleryYear`: `tone`, `chipTone`, `year`, `slotId`, `talks` (now a number)
- `Club`: `clubs`, `since`, `provinceId`, and both name fields

**Dates:** Thai dates use the Buddhist era — `17 พฤศจิกายน 2567` is
17 November **2024**, not 2567. Subtract 543 when writing the English values.
Getting this wrong silently publishes wrong dates, so check every one.

**Names:** Thai nicknames and full names get Latin transliterations in `en`
(`โฟกัส` → `Focus`), not translations. Keep the Thai originals in `th`.

---

## Frozen accessor API

Pages under `src/app/` and components under `src/components/` are built in
parallel against these signatures. **Do not change a name or a shape here
without saying so** — the other half of the work is already written against
it.

```ts
// src/lib/events.ts
import type { Locale } from "@/i18n/routing";

export const eventYears: string[];                    // locale-independent, for generateStaticParams
export function getEvents(locale: Locale): EventYear[];
export function getEvent(locale: Locale, year: string): EventYear | undefined;

// src/lib/site-data.ts
export const FEATURED_YEAR: string;
export function getGalleryYears(locale: Locale): GalleryYear[];
export function getSpeakers(locale: Locale): Speaker[];
export function getTeams(locale: Locale): Array<{ key: TeamKey; names: string[] }>;

// No locale: each Club record carries both its Thai (`city`) and English
// (`en`) name, and the component picks between them.
export function getClubs(): Club[];
```

Link lists lose their baked labels and carry a message key instead — the
component resolves the label through `t()`:

```ts
export const navLinks: Array<{ key: "gallery" | "club" | "speakers" | "volunteers"; href: string }>;
export const footerGroups: Array<{
  key: "event" | "community" | "info";
  items: Array<{ key: string; href: string }>;   // key resolves under `footer.links.*`
}>;
export const social: string[];                    // proper nouns, untranslated
```

Changed field types to be aware of:

- `GalleryYear.talks`: `string` → `number`
- `GalleryYear.placeholder`: removed — composed from `gallery.card.placeholder`
- `Club.note`: removed — briefly became `Club.isHub: boolean`, then dropped
  outright with the "network hub" label
- `Club.city` / `Club.en`: both retained; the accessor picks by locale
