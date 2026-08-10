import Image from "next/image";
import Link from "next/link";

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
import { getEvent } from "@/lib/events";
import { galleryYears, speakers } from "@/lib/site-data";

export default function Home() {
  return (
    <div className="bg-surface font-body text-foreground">
      <Hero />
      <Gallery />
      <Club />
      <Speakers />
      <Volunteers />
      <SiteFooter />
    </div>
  );
}

/**
 * The hero is a fixed-ratio poster. Everything inside is positioned in
 * cqw so the whole composition scales as one unit with the stage.
 */
function Hero() {
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
          <div className="flex items-center gap-[1cqw] text-[9.8cqw] leading-[1.12] tracking-[-0.01em]">
            <span>ส่วนผสม</span>
            <span className="inline-block rotate-[-1.5deg] rounded-[1.2cqw] border-[0.38cqw] border-line-strong bg-tg-cyan px-[1cqw] pb-[0.5cqw]">
              ลับ
            </span>
          </div>
          <div className="mt-[-0.4cqw] ml-[9.8cqw] text-[9.5cqw] leading-[1.3] tracking-[0.01em] text-transparent [-webkit-text-stroke:0.3cqw_var(--t-foreground)]">
            ฉบับคนไทย
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
          alt="ชามส่วนผสมลับ"
          width={2557}
          height={1352}
          preload
          className="absolute top-[22cqw] left-[7cqw] h-auto w-[82cqw]"
        />
        <Image
          src="/assets/thaigredient/tag-price-67.png"
          alt="฿67.00 เท็ด x บางกอก"
          width={480}
          height={393}
          className="absolute top-[48cqw] left-[70cqw] h-auto w-[12cqw] rotate-[-3deg]"
        />
      </div>
    </section>
  );
}

function Gallery() {
  /* The featured block is the most recent edition; its talk playlist
     comes from that year's event page data. */
  const featured = getEvent("2025");

  return (
    <SectionShell id="gallery" surface="paper" rule="none" grain>
      <SectionHeader
        className="mb-14"
        measure="max-w-[660px]"
        leadMeasure="max-w-[520px]"
        title={
          <>
            TED Youth
            <br />
            Gallery
          </>
        }
        lead="ทุกปีคือหนึ่งสูตร ย้อนดูธีม ผู้พูด และรสชาติของแต่ละรุ่นที่ผ่านเวทีนี้"
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
          {/* The poster is the primary way into the 2025 page, so it
              lifts off the paper like every other sticker here. */}
          <Link
            href="/events/2025"
            className="relative block aspect-video w-full overflow-hidden rounded-card border-sticker border-line-strong bg-tg-paper-100 shadow-card transition-[translate,box-shadow] duration-140 ease-ink hover:translate-x-(--t-lift-x) hover:translate-y-(--t-lift-y) hover:shadow-card-hover active:translate-x-(--t-press-x) active:translate-y-(--t-press-y) active:shadow-card-press focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <Image
              src="/assets/gallery-2025-cover.jpg"
              alt="บรรยากาศงานปี 2025"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
            <span className="sr-only">ดูรายละเอียดปี 2025</span>
          </Link>
          {/* Decorative, and it overlaps the poster's corner — it must
              not eat clicks meant for the link underneath. */}
          <div className="pointer-events-none absolute -top-6.5 -right-4.5 rotate-[8deg]">
            <TicketTag price="2025" tone="pink">
              ปีล่าสุด
            </TicketTag>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4.5">
          <h3 className="font-heading text-h2 font-bold uppercase">
            เย็บปักถักทอล์ก
          </h3>
          <p className="text-base leading-[1.6] text-pretty text-foreground-secondary">
            พบกับ 12 เรื่องเล่า จาก 12 เสียงต่างวัย ต่างเส้นทาง ที่ถักทอมาจากประสบการณ์
            ความฝัน ความหวัง และความเจ็บปวด โดยร้อยเรียงและถ่ายทอดอย่างพิถีพิถัน
            เพื่อให้หัวใจของคุณกลับมาพองโตอีกครั้ง
          </p>
          <div className="mt-2 flex flex-wrap gap-3.5">
            <Button asChild>
              <Link href="/events/2025">ดูรายละเอียดปี 2025</Link>
            </Button>
            {featured?.playlistUrl ? (
              <Button asChild variant="outline">
                <a
                  href={featured.playlistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ดู Talk บน YouTube
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

function Club() {
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
            TED Club{" "}
            <span className="relative inline-block text-brand">
              ทั่วประเทศไทย
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
        lead="ชมรมในโรงเรียนและมหาวิทยาลัยที่จัดเวทีของตัวเองตลอดทั้งปี ทุกกิจกรรมออกแบบให้ครูหนึ่งคนจัดได้เอง ด้วยคู่มือและสไลด์ที่เตรียมไว้ให้"
        aside={
          <Image
            src="/assets/tedclub/logo.png"
            alt="TED Club · TEDxBangkok Youth"
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

function Speakers() {
  return (
    <SectionShell id="speakers" surface="brand" grain>
      <SectionHeader
        className="mb-12"
        surface="brand"
        measure="max-w-[620px]"
        leadMeasure="max-w-[520px]"
        title="Speakers"
        lead="ผู้พูดทุกคนบนเวที TEDxBangkok Youth ปีนี้"
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

function Volunteers() {
  return (
    <SectionShell id="volunteers" surface="ink" grain>
      <SectionHeader
        className="mb-12"
        surface="ink"
        measure="max-w-[620px]"
        leadMeasure="max-w-[560px]"
        title="Volunteers"
        lead="ทุกงานเกิดขึ้นได้เพราะอาสาสมัคร นี่คือรายชื่อทีมงานครบทุกคนของปีนี้"
      />

      <div className="grid grid-cols-[minmax(0,1fr)_400px] items-stretch gap-8 max-[820px]:grid-cols-1">
        <div
          data-surface="inverse"
          className="relative min-w-0 overflow-hidden rounded-card border-sticker border-line-strong bg-surface-card shadow-card"
        >
          <ImageSlot shape="rect" placeholder="รูปทีมอาสาสมัคร" />
        </div>
        <VolunteersRoster />
      </div>
    </SectionShell>
  );
}
