/**
 * The Secret Thaigredient item pool — the 12 Thai things the slot
 * machine draws from, mirrored from txby-data's master.csv. The `key`
 * column there is the canonical slug: it names the reel art in
 * /public/assets/random-pool/ and is what tagline lookup keys are
 * built from (see KEY_FORMAT.md in that repo), so it must never drift
 * from the data repo's values.
 *
 * Both display names ride on the record and the component picks by
 * locale, the same pattern as Club's `city`/`en` pair — they are data,
 * not messages (see src/i18n/MESSAGES.md).
 */

export type ItemKey =
  | "boxing"
  | "chair"
  | "chilli"
  | "cucumber"
  | "fish-sauce"
  | "lime"
  | "lottery"
  | "pepper"
  | "pork-skewer"
  | "rooster-bowl"
  | "sticky-rice"
  | "tray";

export interface ThaigredientItem {
  key: ItemKey;
  en: string;
  th: string;
  /** Paper-cut art in /public/assets/random-pool/, named by `key`. */
  image: string;
}

export interface Tagline {
  en: string;
  th: string;
}

const item = (key: ItemKey, en: string, th: string): ThaigredientItem => ({
  key,
  en,
  th,
  image: `/assets/random-pool/${key}.png`,
});

export const ITEMS: readonly ThaigredientItem[] = [
  item("boxing", "Boxing", "กางเกงมวย"),
  item("chair", "Plastic Chair", "เก้าอี้งานวัด"),
  item("chilli", "Chilli", "พริก"),
  item("cucumber", "Cucumber", "แตงกวา"),
  item("fish-sauce", "Fish Sauce", "น้ำปลา"),
  item("lime", "Lime", "มะนาว"),
  item("lottery", "Lottery", "ลอตเตอรี่"),
  item("pepper", "Pepper", "พริกไทย"),
  item("pork-skewer", "Pork Skewer", "หมูปิ้ง"),
  item("rooster-bowl", "Rooster Bowl", "ชามตราไก่"),
  item("sticky-rice", "Sticky Rice", "ข้าวเหนียว"),
  item("tray", "Tray", "ถาดหลุม"),
];

export const ITEM_BY_KEY: Readonly<Record<ItemKey, ThaigredientItem>> =
  Object.fromEntries(ITEMS.map((i) => [i.key, i])) as Record<
    ItemKey,
    ThaigredientItem
  >;
