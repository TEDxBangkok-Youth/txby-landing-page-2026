import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { ComingSoonFlip } from "@/components/site/coming-soon-flip";
import { IngredientWall } from "@/components/site/ingredient-wall";
import type { Locale } from "@/i18n/routing";

const FACEBOOK_URL = "https://www.facebook.com/TEDxBangkokYouth/";

// Not the logo — it's transparent and reads poorly as a link-preview
// card background. The gallery cover is a real photo with an opaque
// background, sized close to the 1200×630 OG convention.
const OG_IMAGE = "/assets/gallery-2026-cover.jpg";

/**
 * The "Coming Soon" screen body, shared by the site root (`/`) — which
 * shows this as the whole site while the 2026 edition is under wraps —
 * and `/[locale]/coming-soon`, kept around as the same screen under its
 * own path.
 *
 * No nav, no footer — the only two things on screen that link out are
 * the wordmark and the flip card, both pointing at the Facebook page.
 * Nothing else: no date, venue, ticket link or email capture.
 *
 * The screen is pinned to the viewport and never scrolls: the wall of
 * ingredient tiles clips and fades at its bottom edge instead of running
 * the page long. Everything is static, so both locales prerender.
 */
export async function ComingSoonScreen({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "coming_soon" });

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
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer noopener">
          <Image
            src="/assets/logos/tedxbangkokyouth-lockup-red.png"
            alt={t("logo_alt")}
            width={2849}
            height={440}
            priority
            // Lands on the handoff's 196px at the desktop reference frame
            // and its 150px floor when stacked, then keeps growing with the
            // column so the lockup does not shrink against the headline.
            className="h-auto w-[max(150px,30cqw)]"
          />
        </a>

        {/* The one piece of real content, held still for assistive tech
            while the sticker below flips through both languages. */}
        <h1 className="sr-only">{t("heading")}</h1>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={t("facebook_cta")}
          className="my-auto [perspective:900px] min-[860px]:[perspective:1400px]"
        >
          <ComingSoonFlip startLang={locale} />
        </a>
      </div>

      <IngredientWall />
    </main>
  );
}

export async function getComingSoonMetadata(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "coming_soon" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1280, height: 720 }],
    },
  };
}
