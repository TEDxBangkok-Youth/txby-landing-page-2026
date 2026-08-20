import { ITEMS, type ItemKey, type Tagline } from "@/lib/thaigredient/data";
import { TAGLINES } from "@/lib/thaigredient/taglines";

/**
 * Pure slot-machine logic, DOM-free so it can be unit-tested straight
 * (spec §5.4). The component owns state and animation; nothing here
 * knows about reels or timing.
 */

export type Draw = [ItemKey, ItemKey, ItemKey];

/**
 * One spin: three independent, uniform picks from the 12-item pool,
 * with replacement — each reel rolls its own d12 (spec FR2).
 */
export function randomDraw(): Draw {
  return [randomItem(), randomItem(), randomItem()];
}

function randomItem(): ItemKey {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)].key;
}

/**
 * Canonical lookup key: the three item keys sorted ascending and joined
 * with underscores, exactly as txby-data's generator builds them (see
 * KEY_FORMAT.md there). Plain UTF-16 sort matches Python's for these
 * ASCII slugs. Draw order never matters — "tray, chilli, tray" and
 * "chilli, tray, tray" both resolve to "chilli_tray_tray".
 */
export function buildTaglineKey(itemKeys: readonly ItemKey[]): string {
  return [...itemKeys].sort().join("_");
}

/**
 * Resolve a draw to its tagline, or undefined when the combination has
 * no entry yet — the pool is 364 draws and the table is still being
 * written. The caller supplies the fallback (spec FR6–FR7).
 */
export function getTagline(itemKeys: readonly ItemKey[]): Tagline | undefined {
  return TAGLINES[buildTaglineKey(itemKeys)];
}
