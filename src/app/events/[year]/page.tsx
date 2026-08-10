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
import { events, getEvent, type EventYear } from "@/lib/events";

/**
 * One page per edition, /events/2025 and so on. Every year is known at
 * build time, so the whole set is prerendered and any other segment 404s
 * rather than being rendered on demand.
 *
 * The page runs entirely on the TEDx main CI scope: black / white / grey
 * with TED red as the only accent, Inter + IBM Plex Sans Thai, hairline
 * rules, 4px radii and no offset shadows. None of the seasonal
 * (Thaigredient) or TED Club language appears here.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((event) => ({ year: event.year }));
}

export async function generateMetadata(
  props: PageProps<"/events/[year]">
): Promise<Metadata> {
  const { year } = await props.params;
  const event = getEvent(year);

  if (!event) return {};

  return {
    title: `TEDxBangkok Youth ${event.year} · ${event.theme}`,
    description: event.description,
  };
}

export default async function EventPage(props: PageProps<"/events/[year]">) {
  const { year } = await props.params;
  const event = getEvent(year);

  if (!event) notFound();

  return (
    <div data-theme="main" className="bg-surface font-body text-foreground">
      <EventNav year={event.year} playlistUrl={event.playlistUrl} />
      <Hero event={event} />
      <Speakers event={event} />
      <Photos event={event} />
      <Talks event={event} />
      <SiteFooter />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function Hero({ event }: { event: EventYear }) {
  const meta = [
    { label: "วันที่จัดงาน", value: event.date },
    { label: "สถานที่", value: event.venue },
    { label: "จำนวน Talk", value: `${event.speakers.length} talks` },
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
                  ดู Talk ทั้งหมดบน YouTube
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-hairline"
            >
              <a href="#photos">รูปบรรยากาศในงาน</a>
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
            <ImageSlot shape="rect" placeholder={`ภาพหลักของปี ${event.year}`} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Sections ─────────────────────────────────────────────────────── */

function Speakers({ event }: { event: EventYear }) {
  return (
    <section id="speakers" className="bg-surface px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title={`${event.speakers.length} เสียงบนเวทีปี ${event.year}`}
          lead="ชื่อเล่น ชื่อจริง และหนึ่งบรรทัดที่บอกว่าเขาเป็นใคร ก่อนจะขึ้นไปเล่าเรื่องของตัวเองบนวงกลมสีแดง"
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

function Photos({ event }: { event: EventYear }) {
  return (
    <section
      id="photos"
      className="bg-surface-raised px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title="รูปบรรยากาศในงาน"
          lead={`ภาพจากวันงาน ${event.date} ตั้งแต่คิวลงทะเบียนหน้าห้อง จนถึงภาพหมู่สุดท้ายหลังไฟบนเวทีดับลง`}
        />

        <PhotoWall photos={event.photos} />
      </div>
    </section>
  );
}

function Talks({ event }: { event: EventYear }) {
  return (
    <section
      id="talks"
      className="border-line bg-surface px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          title="ดู Talk ย้อนหลัง"
          lead="ทุก Talk ของปีนี้ ดูฟรีบน YouTube ไม่ต้องสมัครสมาชิก"
          aside={
            event.playlistUrl ? (
              <Button asChild variant="outline" className="border-hairline">
                <a
                  href={event.playlistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <PlayIcon />
                  เปิดเพลย์ลิสต์ทั้งปี
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
