import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Locale negotiation and redirect/rewrite for every page route. Both
 * locales are prefixed (`localePrefix: "always"` in routing.ts), so this
 * is what turns a bare `/` or `/events/2025` into `/en/...` on first visit
 * and validates the prefix on every request after that.
 *
 * The matcher excludes `_next` internals, `/api`, and anything that looks
 * like a static file request (has a `.` in the last path segment) — that
 * last part is what keeps `/assets/**` and `/fonts/**` (served straight
 * out of `public/`) from being routed through here. Without it every
 * image request gets rewritten to a locale-prefixed URL that doesn't
 * exist and 404s.
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
