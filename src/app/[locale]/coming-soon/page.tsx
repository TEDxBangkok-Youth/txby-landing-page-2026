import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { ComingSoonFlip } from "@/components/site/coming-soon/coming-soon-flip";
import { IngredientWall } from "@/components/site/coming-soon/ingredient-wall";
import { MixingBowl } from "@/components/site/coming-soon/mixing-bowl";
import { routing } from "@/i18n/routing";
import { comingSoonTagline, ingredientWalls } from "@/lib/content/coming-soon";
import { cn } from "@/lib/utils";

/**
 * The standalone "Coming Soon" screen — /en/coming-soon and
 * /th/coming-soon.
 *
 * Separate from the main site by design: no nav, no footer, no links out.
 * It announces the 2026 theme and nothing else — no date, venue, ticket
 * link or email capture. It shares only the root layout (fonts, locale
 * provider) with the rest of the site.
 *
 * One yellow field pinned to the viewport, never scrolling: a header row,
 * then a stage with the bilingual headline at the top and the mixing bowl
 * at the bottom, flanked by two walls of ingredient tiles that drift in
 * opposite directions, then the tagline band along the foot. The walls
 * clip against the screen edge rather than running the page long.
 *
 * There is nothing to click. The only client JavaScript on the page is the
 * headline's flip clock; everything else is static, so both locales
 * prerender whole.
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
    <main className="grain-overlay relative flex h-dvh flex-col overflow-hidden bg-tg-yellow-field">
      {/* Bleeding off the top-left corner, behind everything. Decorative. */}
      <Image
        src="/assets/thaigredient/burst-blue.svg"
        alt=""
        width={750}
        height={616}
        aria-hidden
        className="pointer-events-none absolute -top-[15%] -left-[9%] z-[1] w-[clamp(150px,22vw,262px)]"
      />

      <header className="relative z-[6] flex items-start px-[clamp(16px,3.2vw,44px)] pt-[clamp(18px,3vw,40px)]">
        <Image
          src="/assets/logos/tedxbangkokyouth-lockup-red.png"
          alt={t("logoAlt")}
          width={2849}
          height={440}
          // Eager, not preloaded: the brand mark has to be there on first
          // paint rather than fading in late, but the bowl is this page's
          // LCP element and preloading two images only makes them compete.
          loading="eager"
          // The red lockup, not the white one — white reads badly on the
          // yellow field. Same fixed size as the main site's navbar
          // (`SiteNavLogo`), rather than scaling with the viewport, so a
          // visitor bounced between the two sees one consistent mark.
          className="block h-8.5 w-auto"
        />
      </header>

      {/* The stage.

          `container-type: size` makes this the reference box for the type
          and the bowl inside it, which are sized in cqw/cqh rather than
          vw. That is load-bearing, not tidiness: the walls take a slice
          off each side, so the stage and the viewport are different
          widths that stop growing at different points — a vw-sized
          headline tuned to clear the walls at one width runs into them at
          another. Safe to contain here because the stage is a flex item
          whose width and height both come from its parent, so size
          containment cannot collapse it.

          `min-h-0` is what lets it actually shrink to the space left over
          instead of being pushed past the bottom of the viewport by its
          own content. */}
      <div
        className={cn(
          "relative z-[5] flex min-h-0 flex-1 flex-col items-center overflow-hidden",
          "[container-type:size]",
          // The stage owns the flank geometry, and both the walls and the
          // type read it from here:
          //
          //   --wall-w      the flank each wall occupies, edge to edge
          //   --tilt-sweep  width surrendered inside it so the leaning
          //                 column never touches the flank's edges
          //   --gutter      the clear band between a wall and the type
          //
          // A wall's footprint is exactly --wall-w and nothing crosses it:
          // no bleed off the screen edge, and no cards clipped on the inner
          // side. The stage's own inline padding is --wall-w plus --gutter,
          // so widening a flank walks the headline inward with it rather
          // than quietly sliding under it because two numbers stopped
          // agreeing.
          "[--wall-w:clamp(84px,15vw,220px)]",
          "[--tilt-sweep:3.5vh]",
          "[--gutter:clamp(20px,4vw,64px)]",
          "px-[calc(var(--wall-w)+var(--gutter))]",
          // Vertical rhythm: the headline at the top, the bowl at the
          // bottom, and the middle of the screen left clear between them,
          // which is what the wireframe asks for. The only movement in
          // that gap is the walls either side of it.
          "justify-between gap-[clamp(8px,1.8vh,22px)]",
          "pt-[clamp(6px,1.6vh,22px)] pb-[clamp(4px,1vh,12px)]"
        )}
      >
        {ingredientWalls.map((wall, index) => (
          <IngredientWall
            key={index}
            wall={wall}
            side={index === 0 ? "left" : "right"}
          />
        ))}

        {/* The one piece of real content, held still for assistive tech
            while the sticker flips through both languages. */}
        <h1 className="sr-only">{t("heading")}</h1>

        <div className="relative z-[6] w-full [perspective:1600px]">
          <ComingSoonFlip startLang={locale} />
        </div>

        <MixingBowl />
      </div>

      {/* The tagline band. The runs are `aria-hidden` and the line is read
          once, from the `sr-only` copy — otherwise a screen reader works
          through the same eight-word slogan eight times over. */}
      <div className="relative z-[8] flex h-[clamp(40px,6vh,58px)] flex-none items-center overflow-hidden border-t-frame border-line-strong bg-tg-pink">
        <span className="sr-only">{comingSoonTagline}</span>
        <div
          aria-hidden
          className="flex w-max animate-[tg-marquee_22s_linear_infinite]"
          // What the keyframes divide the travel by. Inline so the count
          // has one definition — see MARQUEE_RUNS.
          style={{ "--marquee-runs": MARQUEE_RUNS } as CSSProperties}
        >
          {Array.from({ length: MARQUEE_RUNS }, (_, i) => (
            <TaglineRun key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

/**
 * How many copies of the tagline run sit in the marquee row.
 *
 * Four, where two would seem to do. The row travels exactly one run, so
 * what covers the band at the end of a cycle is the other three — and the
 * requirement is `(runs - 1) × runWidth >= band width`. Two runs makes
 * that "one run wider than the viewport", which is false on a wide screen
 * once the type stops growing: at 1280px the run measures 1278px and two
 * pixels of bare pink appear at the loop point. Four leaves a margin of
 * three runs, which no display is going to close.
 */
const MARQUEE_RUNS = 4;

/**
 * One run of the tagline — the line twice, with the burst between. The
 * repetition inside a run is what keeps the band full on a wide screen;
 * the repetition of runs is what makes the loop seamless.
 */
function TaglineRun() {
  return (
    <span className="pr-[34px] font-heading text-[clamp(13px,1.8vw,22px)] font-bold leading-none tracking-[0.06em] whitespace-nowrap text-tg-paper">
      {comingSoonTagline}&nbsp; ✳&nbsp; {comingSoonTagline}&nbsp; ✳&nbsp;{" "}
    </span>
  );
}
