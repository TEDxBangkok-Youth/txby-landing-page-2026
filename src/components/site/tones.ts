import type { Tone } from "@/lib/site-data";

/**
 * Thaigredient's five accent tones, resolved to token-driven classes.
 * Content data carries a tone name; only these maps turn one into a
 * color, so no component or page hardcodes a brand value.
 */
export const toneField: Record<Tone, string> = {
  pink: "bg-tg-pink",
  yellow: "bg-tg-yellow",
  cyan: "bg-tg-cyan",
  green: "bg-tg-green",
  red: "bg-tg-red",
};

/** The soft tint behind a card's image panel. */
export const toneTint: Record<Tone, string> = {
  pink: "bg-tg-pink-100",
  yellow: "bg-tg-yellow-100",
  cyan: "bg-tg-cyan-100",
  green: "bg-tg-green-100",
  red: "bg-tg-red-100",
};

/** The darker step used for eyebrow text on a pale field. */
export const toneInk: Record<Tone, string> = {
  pink: "text-tg-pink-strong",
  yellow: "text-tg-yellow-600",
  cyan: "text-tg-cyan-600",
  green: "text-tg-green-600",
  red: "text-tg-red-600",
};
