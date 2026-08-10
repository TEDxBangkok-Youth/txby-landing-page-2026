import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has to be taught the design system's custom
 * utilities, or it mis-groups them and silently drops classes:
 * `border-control` looks like a border *color* and loses to
 * `border-line-strong`, and `text-body-sm` looks like a text
 * *color* and knocks out `text-brand-foreground`. Registering each
 * name in its real group keeps both sides of those pairs.
 *
 * Anything added to src/styles/tokens.css under a namespace that
 * already exists in Tailwind (--text-*, --radius-*, --shadow-*) or
 * as an @utility needs a line here too.
 */
const FONT_SIZES = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "title-lg",
  "title",
  "title-sm",
  "body-lg",
  "body",
  "body-sm",
  "caption",
  "micro",
]

const BORDER_WIDTHS = [
  "card",
  "control",
  "hairline",
  "ink",
  "sticker",
  "marker",
  "rule",
]

const RADII = ["card", "control", "sticker"]

const SHADOWS = [
  "card",
  "card-hover",
  "card-press",
  "control",
  "control-hover",
  "control-press",
  "lift",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": FONT_SIZES.map((s) => `text-${s}`),
      "font-family": ["font-heading", "font-body", "font-accent"],
      "border-w": BORDER_WIDTHS.map((s) => `border-${s}`),
      "border-w-t": ["border-t-marker", "border-t-card"],
      "border-w-b": [
        "border-b-rule",
        "border-b-sticker",
        "border-b-marker",
        "border-b-card",
        "border-b-hairline",
      ],
      rounded: RADII.map((s) => `rounded-${s}`),
      shadow: SHADOWS.map((s) => `shadow-${s}`),
      leading: ["leading-display", "leading-heading"],
      tracking: ["tracking-eyebrow", "tracking-caps"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
