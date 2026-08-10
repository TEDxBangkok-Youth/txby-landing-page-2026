import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for the whole site.
 *
 * English is the default and Thai is the second locale, but *both* carry a
 * prefix (`localePrefix: "always"`), so there is exactly one canonical URL
 * per page per locale — `/en/events/2025` and `/th/events/2025`, never a
 * bare `/events/2025`. The proxy redirects unprefixed paths to the
 * negotiated locale.
 */
export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
