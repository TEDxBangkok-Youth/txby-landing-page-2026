"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * `TH | EN` beside the bar's CTA. Both locales are always visible — the
 * reader picks one rather than toggling into an unnamed "other".
 *
 * Display order is fixed rather than current-first, so the pair doesn't
 * swap places when the language changes. The visible labels are the ISO
 * codes, which read the same in either language and so aren't messages;
 * the group carries `common.languageLabel` for screen readers.
 *
 * These are real links, not buttons: `usePathname` here is next-intl's,
 * which returns the path with the locale prefix stripped, and `Link`
 * re-adds the target locale's prefix — so `/th/events/2025` and
 * `/en/events/2025` are both crawlable addresses for this page. `replace`
 * keeps the switch out of history, so Back still means the previous page,
 * and `scroll={false}` suppresses the router's scroll-to-top so the reader
 * stays where they were — switching language is a re-read of the section
 * they're on, not a fresh visit. The offset is preserved, not the section:
 * the two languages set to different heights, so a switch made far down a
 * long page can land a little off. Close enough beats jumping to the top.
 *
 * Rendered from the `actions` slot of both bars — NavBar on the landing
 * page and EventNav on the year pages.
 */
/* Keyed by `Locale` rather than written out as a list, so adding a third
   locale to `routing` is a type error here instead of a silently missing
   link in the bar. */
const DISPLAY_RANK: Record<Locale, number> = { th: 0, en: 1 };
const LOCALE_ORDER = [...routing.locales].sort(
  (a, b) => DISPLAY_RANK[a] - DISPLAY_RANK[b]
);

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className="flex items-center gap-1.5 text-sm leading-normal font-medium"
    >
      {LOCALE_ORDER.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 ? (
            <span aria-hidden className="text-foreground-muted">
              |
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={locale}
            replace
            scroll={false}
            lang={locale}
            hrefLang={locale}
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "uppercase underline-offset-4 transition-colors duration-140 ease-ink hover:text-brand hover:underline",
              locale === active ? "text-foreground" : "text-foreground-faint"
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
