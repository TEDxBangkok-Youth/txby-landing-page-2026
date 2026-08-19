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
 * The standalone "Coming Soon" screen at its own path — /en/coming-soon
 * and /th/coming-soon.
 *
 * The proxy now serves this same screen at the site root and redirects
 * every other path there, so this route is unreachable in normal
 * navigation. Kept as a direct alias to the shared screen rather than
 * removed, in case that redirect is ever lifted.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/coming-soon">
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) return {};

  return getComingSoonMetadata(locale);
}

export default async function ComingSoonPage(
  props: PageProps<"/[locale]/coming-soon">
) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <ComingSoonScreen locale={locale} />;
}
