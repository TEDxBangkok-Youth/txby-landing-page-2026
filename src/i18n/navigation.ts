import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware replacements for the `next/link` and `next/navigation`
 * primitives. Import these instead of the Next.js originals anywhere a
 * link points at an in-app route, so the current locale prefix is carried
 * along automatically. Plain `<a>` is still correct for external hrefs
 * (YouTube) and same-page anchors (`#photos`).
 */
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
