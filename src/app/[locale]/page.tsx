import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  ComingSoonScreen,
  getComingSoonMetadata,
} from "@/components/site/coming-soon-screen";
import { routing } from "@/i18n/routing";

/**
 * The site root — `/en` and `/th`.
 *
 * Standing in for the full homepage while the 2026 edition is under
 * wraps: shows the same screen as `/[locale]/coming-soon` (see
 * `coming-soon-screen.tsx`). The proxy redirects every other path back
 * to `/`, so this is the only page reachable on the site right now.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: PageProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) return {};

  return getComingSoonMetadata(locale);
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <ComingSoonScreen locale={locale} />;
}
