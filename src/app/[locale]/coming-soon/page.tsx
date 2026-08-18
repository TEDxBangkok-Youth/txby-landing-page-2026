import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ComingSoonFlip } from "@/components/site/coming-soon-flip";
import { IngredientWall } from "@/components/site/ingredient-wall";
import { routing } from "@/i18n/routing";
import { comingSoonTagline } from "@/lib/content/coming-soon";

/**
 * The standalone "Coming Soon" screen — /en/coming-soon and
 * /th/coming-soon.
 *
 * Separate from the main site by design: no nav, no footer, no links
 * out. It announces the 2026 theme and nothing else — no date, venue,
 * ticket link or email capture — so there is deliberately nothing here
 * to click. It shares only the root layout (fonts, locale provider) with
 * the rest of the site.
 *
 * The screen is pinned to the viewport and never scrolls: the wall of
 * ingredient tiles clips and fades at its bottom edge instead of running
 * the page long. Everything is static, so both locales prerender.
 *
 * Runs on the Thaigredient scope inherited from the layout — this is the
 * 2026 seasonal skin's own teaser, not an archive page.
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

  const t = await getTranslations({ locale, namespace: "comingSoon" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ComingSoonPage(
  props: PageProps<"/[locale]/coming-soon">
) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "comingSoon" });

  return (
    <main
      className={
        // One row of columns that fit at 430px each: two side by side
        // above 860px, stacked below. `auto-rows` splits the height
        // evenly when stacked, which is what gives the wall a bounded
        // box to size its tiles against.
        "grain-overlay grid h-dvh auto-rows-[minmax(0,1fr)] " +
        "grid-cols-[repeat(auto-fit,minmax(min(100%,430px),1fr))] " +
        "overflow-hidden bg-tg-yellow-field"
      }
    >
      {/* `container-type: size` makes this column the reference box for
          the type inside it — the headline is sized in cqw/cqh against
          it, not against the viewport. Safe here because the column is a
          grid item whose width and height both come from the grid, so
          size containment cannot collapse it. */}
      <div className="flex min-h-0 flex-col items-center [container-type:size] pt-[clamp(28px,4vw,52px)] pr-[clamp(20px,3vw,28px)] pb-[clamp(28px,4vw,52px)] pl-[clamp(24px,4vw,56px)] text-center min-[860px]:items-stretch min-[860px]:text-left">
        <Image
          src="/assets/logos/tedxbangkokyouth-lockup-red.png"
          alt={t("logoAlt")}
          width={2849}
          height={440}
          priority
          // Lands on the handoff's 196px at the desktop reference frame
          // and its 150px floor when stacked, then keeps growing with the
          // column so the lockup does not shrink against the headline.
          className="h-auto w-[max(150px,30cqw)]"
        />

        {/* The one piece of real content, held still for assistive tech
            while the sticker below flips through both languages. */}
        <h1 className="sr-only">{t("heading")}</h1>

        <div className="my-auto [perspective:900px] min-[860px]:[perspective:1400px]">
          <ComingSoonFlip startLang={locale} />
        </div>

        {/* Dropped on the mobile frame — the stacked column has no room
            for it under the headline. */}
        {/* <span className="hidden font-heading text-[max(0.75rem,1.9cqw)] font-bold leading-tight tracking-[0.14em] text-foreground min-[860px]:block">
          {comingSoonTagline}
        </span> */}
      </div>

      <IngredientWall />
    </main>
  );
}
