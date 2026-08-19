import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Matches "/" (English, no prefix) and "/th" — the site root in either
// locale — and nothing deeper. "/en" is deliberately not in this list:
// English has no prefix under `localePrefix: "as-needed"`, so a request
// for it falls through to the catch-all redirect below, same as any
// other disallowed path.
const rootPathPattern = /^\/(th)?\/?$/;

/**
 * Locale negotiation for every page route, plus a hold on the rest of
 * the site while the 2026 edition is under wraps: only the root
 * ("/", "/en", "/th") is reachable, everything else — events, the
 * design system, even the standalone /coming-soon route — bounces back
 * to "/" before locale negotiation runs.
 *
 * The matcher excludes `_next` internals, `/api`, and anything that
 * looks like a static file request (has a `.` in the last path
 * segment) — that last part is what keeps `/assets/**` and `/fonts/**`
 * (served straight out of `public/`) from being routed through here.
 * Without it every image request gets rewritten to a locale-prefixed
 * URL that doesn't exist and 404s.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!rootPathPattern.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
