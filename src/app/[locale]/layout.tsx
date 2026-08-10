import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Chakra_Petch, Sarabun, Athiti, Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import "../globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Thaigredient's accent face — pulled from the Claude Design source
// (assets/fonts/SOV_rohan.ttf); not available on Google Fonts.
const rohan = localFont({
  variable: "--font-rohan",
  src: "../../fonts/SOV_rohan.ttf",
  weight: "400",
  display: "swap",
});

// Used by the TED Club section, whose design system runs on Athiti.
const athiti = Athiti({
  variable: "--font-athiti",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Used by the TEDx main CI (tokens/fonts.css: "Inter Variable" + "IBM Plex Sans Thai").
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * The title/description are editorial copy, not UI chrome, so they live
 * under a `meta` namespace rather than `common` — see MESSAGES.md. The
 * per-year event pages override both from that edition's content.
 */
export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const fontVars = `${chakraPetch.variable} ${sarabun.variable} ${rohan.variable} ${athiti.variable} ${inter.variable} ${ibmPlexSansThai.variable}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale — see
  // https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing
  setRequestLocale(locale);

  return (
    // `data-scroll-behavior` is how the App Router is told the page opts
    // into smooth scrolling (globals.css sets it on `html` for the in-page
    // #section links). Without it the router leaves the CSS in force during
    // a route transition, the scroll-to-top gets swallowed, and a year page
    // opened from a card halfway down the landing page renders halfway down
    // itself. Next warns about this in development.
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fontVars} h-full antialiased`}
    >
      <body data-theme="thaigredient" className="min-h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
