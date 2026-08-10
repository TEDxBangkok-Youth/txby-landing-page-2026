import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ClubMap } from "@/components/site/club-map";
import { GalleryYearCard } from "@/components/site/gallery-year-card";
import { ImageSlot } from "@/components/site/image-slot";
import { NavBar } from "@/components/site/nav-bar";
import { SectionHeader, SectionShell } from "@/components/site/section-shell";
import { SiteFooter } from "@/components/site/site-footer";
import { SpeakerCard } from "@/components/site/speaker-card";
import { TicketTag } from "@/components/site/ticket-tag";
import { VolunteersRoster } from "@/components/site/volunteers-roster";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getEvent } from "@/lib/events";
import { getGalleryYears, getSpeakers, FEATURED_YEAR } from "@/lib/site-data";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  // `params` hands back plain strings; `hasLocale` narrows to the app's
  // union so the value can flow into the locale-keyed content accessors.
  // The layout 404s on an unknown locale before this renders, so this is
  // a type-level narrow rather than a second line of defence.
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <div className="bg-surface font-body text-foreground">
      <Hero locale={locale} />
      <Gallery locale={locale} />
      <Club locale={locale} />
      <Speakers locale={locale} />
      <Volunteers locale={locale} />
      <SiteFooter />
    </div>
  );
}

/**
 * The hero is a fixed-ratio poster. Everything inside is positioned in
 * cqw so the whole composition scales as one unit with the stage.
 *
 * The three title parts are separately positioned and styled — kept as
 * three keys rather than one string with markup (see MESSAGES.md).
 */
const HERO_TITLE_TYPE = {
  /* The poster was drawn around Thai. Chakra Petch sets Latin appreciably
     wider at the same optical size, so at the Thai sizes the English cut
     ran ~11cqw past the Thai footprint on line 1 and ~8cqw on line 2, far
     enough for "Edition" to collide with the sauce bottle in the bowl art.
     These sizes put the Latin lines back on the Thai footprint; the stroke
     scales with them so the outline keeps its weight relative to the glyph. */
  th: {
    line1: "text-[9.8cqw]",
    line2: "text-[9.5cqw]",
    stroke: "[-webkit-text-stroke:0.3cqw_var(--t-foreground)]",
  },
  en: {
    line1: "text-[8.1cqw]",
    line2: "text-[8.1cqw]",
    stroke: "[-webkit-text-stroke:0.26cqw_var(--t-foreground)]",
  },
} as const;

async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const type = HERO_TITLE_TYPE[locale];

  return (
    <section
      id="hero"
      className="relative flex h-dvh min-h-140 w-full items-center justify-center overflow-hidden bg-tg-yellow-field"
    >
      <NavBar />

      <div className="@container relative mx-auto aspect-1456/1010 w-[min(100%,calc((100dvh-132px)*1456/1010))] max-w-[1680px]">
        <Image
          src="/assets/thaigredient/burst-blue.svg"
          alt=""
          width={491}
          height={381}
          className="absolute top-[-2cqw] left-[-6cqw] h-auto w-[30cqw]"
        />

        <div className="absolute top-[6cqw] left-[23cqw] w-[74cqw] font-heading font-bold text-foreground">
          <div
            className={`flex items-center gap-[1cqw] ${type.line1} leading-[1.12] tracking-[-0.01em]`}
          >
            <span>{t("titleLine1")}</span>
            <span className="inline-block rotate-[-1.5deg] rounded-[1.2cqw] border-[0.38cqw] border-line-strong bg-tg-cyan px-[1cqw] pb-[0.5cqw]">
              {t("titleHighlight")}
            </span>
          </div>
          <div
            className={`mt-[-0.4cqw] ml-[9.8cqw] ${type.line2} leading-[1.3] tracking-[0.01em] text-transparent ${type.stroke}`}
          >
            {t("titleLine2")}
          </div>
        </div>

        <Image
          src="/assets/thaigredient/skewer-pork.png"
          alt=""
          width={680}
          height={1110}
          className="absolute top-[20cqw] left-[5cqw] h-auto w-[19cqw] rotate-[-4deg]"
        />
        <Image
          src="/assets/thaigredient/bowl-mix-hero.png"
          alt={t("bowlAlt")}
          width={2557}
          height={1352}
          preload
          className="absolute top-[22cqw] left-[7cqw] h-auto w-[82cqw]"
        />
        <Image
          src="/assets/thaigredient/tag-price-67.png"
          alt={t("priceTagAlt")}
          width={480}
          height={393}
          className="absolute top-[48cqw] left-[70cqw] h-auto w-[12cqw] rotate-[-3deg]"
        />
      </div>
    </section>
  );
}

async function Gallery({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "gallery" });
  const galleryYears = getGalleryYears(locale);

  /* The featured block is the most recent edition; its talk playlist,
     heading and paragraph come from that year's event page data rather
     than being duplicated here — see MESSAGES.md's "Refactor required"
     note under `gallery`. */
  const featured = getEvent(locale, FEATURED_YEAR);

  return (
    <SectionShell id="gallery" surface="paper" rule="none" grain>
      <SectionHeader
        className="mb-14"
        measure="max-w-[660px]"
        leadMeasure="max-w-[520px]"
        title={
          <>
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </>
        }
        lead={t("lead")}
        aside={
          <Image
            src="/assets/thaigredient/bowl-rooster.png"
            alt=""
            width={520}
            height={319}
            className="h-auto w-42.5 rotate-[6deg]"
          />
        }
      />

      {/* Featured — the most recent edition */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-center gap-14">
        <div className="relative rotate-[-1.4deg]">
          {/* The poster is the primary way into the featured year's page,
              so it lifts off the paper like every other sticker here. */}
          <Link
            href={`/events/${FEATURED_YEAR}`}
            className="relative block aspect-video w-full overflow-hidden rounded-card border-sticker border-line-strong bg-tg-paper-100 shadow-card transition-[translate,box-shadow] duration-140 ease-ink hover:translate-x-(--t-lift-x) hover:translate-y-(--t-lift-y) hover:shadow-card-hover active:translate-x-(--t-press-x) active:translate-y-(--t-press-y) active:shadow-card-press focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <Image
              src="/assets/gallery-2025-cover.jpg"
              alt={t("featured.coverAlt", { year: FEATURED_YEAR })}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
            <span className="sr-only">
              {t("featured.cta", { year: featured?.year ?? FEATURED_YEAR })}
            </span>
          </Link>
          {/* Decorative, and it overlaps the poster's corner — it must
              not eat clicks meant for the link underneath. */}
          <div className="pointer-events-none absolute -top-6.5 -right-4.5 rotate-[8deg]">
            <TicketTag price={FEATURED_YEAR} tone="pink">
              {t("featured.badge")}
            </TicketTag>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4.5">
          <h3 className="font-heading text-h2 font-bold uppercase">
            {featured?.theme}
          </h3>
          <p className="text-base leading-[1.6] text-pretty text-foreground-secondary">
            {featured?.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-3.5">
            <Button asChild>
              <Link href={`/events/${FEATURED_YEAR}`}>
                {t("featured.cta", { year: featured?.year ?? FEATURED_YEAR })}
              </Link>
            </Button>
            {featured?.playlistUrl ? (
              <Button asChild variant="outline">
                <a
                  href={featured.playlistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t("featured.youtubeCta")}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Year archive */}
      <div className="mt-18 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-7">
        {galleryYears.map((y) => (
          <GalleryYearCard key={y.year} year={y} />
        ))}
      </div>
    </SectionShell>
  );
}

async function Club({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "club" });

  return (
    <SectionShell
      id="club"
      data-theme="club"
      surface="theme"
      rule="none"
      className="overflow-hidden py-20"
      decoration={
        <Image
          src="/assets/tedclub/scribbles/field-texture.svg"
          alt=""
          aria-hidden
          width={800}
          height={500}
          className="pointer-events-none absolute -right-37.5 bottom-6 h-auto w-95 opacity-30"
        />
      }
    >
      <SectionHeader
        className="mb-12 gap-12"
        align="start"
        size="h3"
        leadSize="body-lg"
        surface="theme"
        measure="max-w-[640px]"
        leadMeasure="max-w-[560px]"
        title={
          <>
            {t("titlePrefix")}{" "}
            <span className="relative inline-block text-brand">
              {t("titleHighlight")}
              <Image
                src="/assets/tedclub/scribbles/underline-red.svg"
                alt=""
                aria-hidden
                width={320}
                height={26}
                className="absolute inset-x-0 -bottom-2.5 h-auto w-full"
              />
            </span>
          </>
        }
        lead={t("lead")}
        aside={
          <Image
            src="/assets/tedclub/logo.png"
            alt={t("logoAlt")}
            width={512}
            height={507}
            className="h-35 w-auto shrink-0"
          />
        }
      />

      <ClubMap />
    </SectionShell>
  );
}

async function Speakers({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "speakers" });
  const speakers = getSpeakers(locale);

  return (
    <SectionShell id="speakers" surface="brand" grain>
      <SectionHeader
        className="mb-12"
        surface="brand"
        measure="max-w-[620px]"
        leadMeasure="max-w-[520px]"
        title={t("title")}
        lead={t("lead", { count: speakers.length })}
      />

      {/* Five across on desktop, matching the event page's line-up. */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {speakers.map((s) => (
          <SpeakerCard key={s.fullName} speaker={s} />
        ))}
      </div>
    </SectionShell>
  );
}

async function Volunteers({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "volunteers" });

  return (
    <SectionShell id="volunteers" surface="ink" grain>
      <SectionHeader
        className="mb-12"
        surface="ink"
        measure="max-w-[620px]"
        leadMeasure="max-w-[560px]"
        title={t("title")}
        lead={t("lead")}
      />

      <div className="grid grid-cols-[minmax(0,1fr)_400px] items-stretch gap-8 max-[820px]:grid-cols-1">
        <div
          data-surface="inverse"
          className="relative min-w-0 overflow-hidden rounded-card border-sticker border-line-strong bg-surface-card shadow-card"
        >
          <ImageSlot shape="rect" placeholder={t("photoPlaceholder")} />
        </div>
        <VolunteersRoster />
      </div>
    </SectionShell>
  );
}
