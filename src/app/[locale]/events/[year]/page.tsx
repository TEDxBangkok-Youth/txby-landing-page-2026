import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EventNav } from "@/components/site/event-nav";
import { EventSpeakerCard } from "@/components/site/event-speaker-card";
import { ImageSlot } from "@/components/site/image-slot";
import { PhotoWall } from "@/components/site/photo-wall";
import { SiteFooter } from "@/components/site/site-footer";
import { TalkList } from "@/components/site/talk-list";
import { routing, type Locale } from "@/i18n/routing";
import { eventYears, getEvent, type EventYear } from "@/lib/events";

/**
 * One page per edition, /en/events/2025 and /th/events/2025 and so on.
 * Every year × locale combination is known at build time, so the whole
 * set is prerendered and any other segment 404s rather than being
 * rendered on demand.
 *
 * The page runs entirely on the TEDx main CI scope: black / white / grey
 * with TED red as the only accent, Inter + IBM Plex Sans Thai, hairline
 * rules, 4px radii and no offset shadows. None of the seasonal
 * (Thaigredient) or TED Club language appears here.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    eventYears.map((year) => ({ locale, year }))
  );
}

export async function generateMetadata(
  props: PageProps<"/[locale]/events/[year]">
): Promise<Metadata> {
  const { locale, year } = await props.params;

  // `params` hands back plain strings; `hasLocale` narrows to the app's
  // union so the value can flow into the locale-keyed content accessors.
  if (!hasLocale(routing.locales, locale)) return {};

  const event = getEvent(locale, year);

  if (!event) return {};

  return {
    title: `TEDxBangkok Youth ${event.year} · ${event.theme}`,
    description: event.description,
  };
}

export default async function EventPage(
  props: PageProps<"/[locale]/events/[year]">
) {
  const { locale, year } = await props.params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const event = getEvent(locale, year);

  if (!event) notFound();

  return (
    <div data-theme="main" className="bg-surface font-body text-foreground">
      <EventNav year={event.year} playlistUrl={event.playlistUrl} />
      <Hero locale={locale} event={event} />
      <Speakers locale={locale} event={event} />
      <Photos locale={locale} event={event} />
      <Talks locale={locale} event={event} />
      <SiteFooter />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

async function Hero({ locale, event }: { locale: Locale; event: EventYear }) {
  const t = await getTranslations({ locale, namespace: "event" });

  const meta = [
    { label: t("meta.date"), value: event.date },
    { label: t("meta.venue"), value: event.venue },
    {
      label: t("meta.talks"),
      value: t("meta.talksValue", { count: event.speakers.length }),
    },
  ];

  return (
    <section
      data-surface="inverse"
      className="relative overflow-hidden bg-surface px-8 pt-24 pb-24 text-foreground"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-14 font-heading text-[clamp(10rem,26vw,24rem)] leading-none font-bold text-foreground/5 select-none"
      >
        {event.year}
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <h1 className="font-heading text-h1 font-bold tracking-tight text-balance">
            {event.theme}
          </h1>

          <p className="mt-6 max-w-[54ch] text-lg text-pretty text-foreground-secondary">
            {event.description}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-7">
            {meta.map((m) => (
              <div key={m.label} className="max-w-[24ch]">
                <dt className="text-xs leading-[1.4] uppercase text-foreground-muted">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-base leading-[1.6] font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-4">
            {event.playlistUrl ? (
              <Button asChild size="lg">
                <a
                  href={event.playlistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <PlayIcon />
                  {t("cta.watchAll")}
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-hairline"
            >
              <a href="#photos">{t("cta.photos")}</a>
            </Button>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-card bg-surface-raised">
          {event.cover ? (
            <Image
              src={event.cover.src}
              alt={event.cover.alt}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover"
            />
          ) : (
            <ImageSlot
              shape="rect"
              placeholder={t("coverPlaceholder", { year: event.year })}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Sections ─────────────────────────────────────────────────────── */

async function Speakers({
  locale,
  event,
}: {
  locale: Locale;
  event: EventYear;
}) {
  const t = await getTranslations({ locale, namespace: "event" });

  return (
    <section id="speakers" className="bg-surface px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title={t("speakers.title", {
            count: event.speakers.length,
            year: event.year,
          })}
          lead={t("speakers.lead")}
        />

        {/* Five across on desktop, matching the landing page's line-up. */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-5">
          {event.speakers.map((speaker) => (
            <EventSpeakerCard key={speaker.fullName} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

async function Photos({
  locale,
  event,
}: {
  locale: Locale;
  event: EventYear;
}) {
  const t = await getTranslations({ locale, namespace: "event" });

  return (
    <section
      id="photos"
      className="bg-surface-raised px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title={t("photos.title")}
          lead={t("photos.lead", { date: event.date })}
        />

        <PhotoWall photos={event.photos} />
      </div>
    </section>
  );
}

async function Talks({
  locale,
  event,
}: {
  locale: Locale;
  event: EventYear;
}) {
  const t = await getTranslations({ locale, namespace: "event" });

  return (
    <section
      id="talks"
      className="border-line bg-surface px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title={t("talks.title")}
          lead={t("talks.lead")}
          aside={
            event.playlistUrl ? (
              <Button asChild variant="outline" className="border-hairline">
                <a
                  href={event.playlistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <PlayIcon />
                  {t("talks.playlistCta")}
                </a>
              </Button>
            ) : null
          }
        />

        <TalkList speakers={event.speakers} />
      </div>
    </section>
  );
}

/* ── Shared bits ──────────────────────────────────────────────────── */

function SectionHead({
  title,
  lead,
  aside,
}: {
  title: React.ReactNode;
  lead?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div className="max-w-[640px]">
        <h2 className="font-heading text-h2 font-bold text-balance">{title}</h2>
        {lead ? (
          <p className="mt-4 text-lg text-pretty text-foreground-secondary">
            {lead}
          </p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}
