import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Resolves the request's locale and loads its catalog. `requestLocale`
 * comes from the `[locale]` segment; anything outside `routing.locales`
 * falls back to the default rather than throwing, and the layout's own
 * `hasLocale` check is what turns an unknown segment into a 404.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
