import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for the whole site.
 *
 * English is the default and carries no prefix (`localePrefix:
 * "as-needed"`), so the site root is `/` in English and `/th` in Thai —
 * there is no `/en`. Any other path the proxy doesn't allow through
 * redirects to `/`.
 */
export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
