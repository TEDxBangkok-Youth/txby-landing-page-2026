import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * The shared top-bar shell. Every measurement the landing nav and the
 * per-year event nav have in common lives here — px-8 / py-5 around a
 * max-w-7xl column (the same measure the page sections use, so the
 * lockup lines up with the content below), gap-6.5 between links, gap-7
 * before the actions, and the main-CI link styling.
 *
 * What differs between the two bars is only how the bar itself is
 * positioned and filled: the landing page floats over a coloured hero
 * and fades a white sheet in on scroll, the event pages stick a solid
 * white bar to the top. That is passed in as `className` / `backdrop`
 * rather than duplicated.
 *
 * This file is a server component on purpose. The landing nav's scroll
 * state and mobile sheet stay in its own client component, so the event
 * pages don't ship them.
 */
export type SiteNavLink = { label: string; href: string };

export function SiteNav({
  brand,
  links,
  actions,
  backdrop,
  className,
}: {
  /** Logo, plus anything that sits beside it (the year, a divider). */
  brand: React.ReactNode;
  links: readonly SiteNavLink[];
  /** CTA and, on the landing page, the mobile menu trigger. */
  actions?: React.ReactNode;
  /** Optional layer painted behind the bar — the landing fade sheet. */
  backdrop?: React.ReactNode;
  /** Positioning and fill for the bar itself. */
  className?: string;
}) {
  return (
    <header data-theme="main" className={cn("font-body", className)}>
      {backdrop}
      <div className="relative px-8 py-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <div className="flex items-center gap-4">{brand}</div>

          <div className="flex items-center gap-7">
            {links.length > 0 ? (
              <ul className="hidden gap-6.5 md:flex">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm leading-normal font-medium text-foreground transition-colors duration-140 ease-ink hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {actions}
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * The lockup at its one canonical size. `width`/`height` describe the
 * served asset, not the rendered box — the source PNG is 2849px wide and
 * would otherwise be downloaded at 4x.
 */
export function SiteNavLogo({
  href,
  alt,
}: {
  href: string;
  /** Real copy — pass the `nav.homeAlt` translation from the caller. */
  alt: string;
}) {
  const logo = (
    <Image
      src="/assets/logos/tedxbangkokyouth-lockup-red.png"
      alt={alt}
      width={220}
      height={34}
      className="block h-8.5 w-auto"
    />
  );

  // In-page anchors stay plain <a>; a route gets the locale-aware Link, so
  // the lockup on /th/events/2025 returns to /th rather than bouncing
  // through / and letting the proxy re-negotiate the language.
  return href.startsWith("#") ? (
    <a href={href} className="inline-flex shrink-0">
      {logo}
    </a>
  ) : (
    <Link href={href} className="inline-flex shrink-0">
      {logo}
    </Link>
  );
}
