/**
 * The design system's token manifest.
 *
 * This lists token NAMES and how they group, never their values.
 * /design-system reads the values live out of the cascade, so the
 * reference page cannot drift from src/styles/*.css the way a
 * hand-written table does.
 */

export const THEMES = [
  { id: "thaigredient", label: "Thaigredient", note: "2026 seasonal skin — the site default" },
  { id: "club", label: "TED Club", note: "Editorial ink language, scoped to the Club section" },
  { id: "main", label: "TEDx main CI", note: "The licensed brand — nav and footer" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

/** Theme-scoped roles. Read as --t-<token> inside a [data-theme] scope. */
export const COLOR_ROLES = [
  {
    group: "Surfaces",
    tokens: [
      "surface",
      "surface-card",
      "surface-raised",
      "surface-sunken",
      "surface-wash",
      "surface-inverse",
    ],
  },
  {
    group: "Text",
    tokens: [
      "foreground",
      "foreground-secondary",
      "foreground-muted",
      "foreground-faint",
      "foreground-inverse",
      "foreground-on-sunken",
    ],
  },
  {
    group: "Brand",
    tokens: ["brand", "brand-hover", "brand-press", "brand-foreground"],
  },
  { group: "Lines", tokens: ["line-subtle", "line", "line-strong"] },
  { group: "State", tokens: ["link", "link-hover", "focus", "destructive"] },
] as const;

/** Structural aliases — each points into a global Tier 2 scale. */
export const STRUCTURE_ROLES = [
  "radius-card",
  "radius-control",
  "border-card",
  "border-control",
  "shadow-card",
  "shadow-control",
  "control-weight",
  "control-transform",
  "control-tracking",
  "lift-y",
  "press-y",
] as const;

/** Tier 1 primitives. Read as --color-<token> from :root. */
export const PRIMITIVE_RAMPS = [
  {
    group: "Thaigredient",
    tokens: [
      "tg-pink", "tg-pink-strong", "tg-pink-700", "tg-pink-300", "tg-pink-100", "tg-pink-050",
      "tg-yellow", "tg-yellow-600", "tg-yellow-300", "tg-yellow-100", "tg-yellow-field",
      "tg-cyan", "tg-cyan-600", "tg-cyan-300", "tg-cyan-100",
      "tg-green", "tg-green-600", "tg-green-300", "tg-green-100",
      "tg-red", "tg-red-600", "tg-red-300", "tg-red-100",
      "tg-plum", "tg-ink", "tg-ink-soft", "tg-navy-500", "tg-navy-100",
      "tg-paper", "tg-paper-050", "tg-paper-100", "tg-paper-200", "tg-paper-300",
    ],
  },
  {
    group: "TED Club",
    tokens: [
      "club-red", "club-red-700", "club-red-600", "club-red-400",
      "club-red-200", "club-red-100", "club-red-050", "club-red-950",
      "club-ink-900", "club-ink-800", "club-ink-700", "club-ink-600", "club-ink-500",
      "club-ink-400", "club-ink-300", "club-ink-200", "club-ink-100",
      "club-paper-050", "club-paper", "club-success", "club-info",
    ],
  },
  {
    group: "TEDx main CI",
    tokens: [
      "ci-red-500", "ci-red-600", "ci-red-700", "ci-black", "ci-white",
      "ci-gray-50", "ci-gray-100", "ci-gray-200", "ci-gray-300", "ci-gray-400",
      "ci-gray-500", "ci-gray-600", "ci-gray-700", "ci-gray-800", "ci-gray-900",
    ],
  },
] as const;

/** Tier 2 globals. `custom: false` means it is a Tailwind v4 built-in. */
export const TYPE_SCALE = [
  { token: "display", custom: true },
  { token: "h1", custom: true },
  { token: "h2", custom: true },
  { token: "h3", custom: true },
  { token: "h4", custom: true },
  { token: "title-lg", custom: true },
  { token: "title", custom: true },
  { token: "title-sm", custom: true },
  { token: "body-lg", custom: true },
  { token: "body", custom: true },
  { token: "body-sm", custom: true },
  { token: "caption", custom: true },
  { token: "micro", custom: true },
  { token: "2xl", custom: false },
  { token: "xl", custom: false },
  { token: "lg", custom: false },
  { token: "base", custom: false },
  { token: "sm", custom: false },
  { token: "xs", custom: false },
] as const;

export const RADIUS_SCALE = [
  { token: "xs", custom: false },
  { token: "sm", custom: false },
  { token: "md", custom: false },
  { token: "lg", custom: false },
  { token: "xl", custom: false },
  { token: "sticker", custom: true },
  { token: "2xl", custom: false },
] as const;

export const BORDER_WIDTHS = ["hairline", "ink", "sticker", "marker", "rule"] as const;

/** Offset geometry. The tint is themed; see themes/compose.css. */
export const SHADOW_GEOMETRY = [
  "sh-sticker-xs",
  "sh-sticker-sm",
  "sh-sticker",
  "sh-sticker-lg",
  "sh-ink",
  "sh-ink-press",
  "sh-lift",
  "sh-none",
] as const;

/**
 * Scales deliberately left to Tailwind v4 rather than redefined.
 * Listed so the omission reads as a decision, not an oversight.
 */
export const INHERITED_FROM_TAILWIND = [
  ["Spacing", "The 4px scale — p-4, gap-6, py-26. All three custom scales were deleted."],
  ["Font weight", "font-light through font-extrabold."],
  ["Breakpoints", "sm/md/lg/xl/2xl, plus one max-[820px] for the map and roster."],
  ["Container", "max-w-7xl is the site's 1280px column."],
  ["Duration", "Numeric utilities — duration-140, duration-200."],
  ["Tracking", "tight/normal/wide/wider/widest, plus eyebrow and caps."],
  ["Leading", "tight/snug/normal/relaxed, plus display and heading."],
] as const;
