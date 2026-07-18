/* eslint-disable @next/next/no-img-element */
import { StickerButton } from "@/components/site/sticker-button";
import { ImageSlot } from "@/components/site/image-slot";
import {
  eventInfo,
  navLinks,
  pastEvents,
  sponsors,
  speakers,
  team,
} from "@/lib/site-data";

const STICKER = "shadow-[4px_5px_0_rgba(17,29,69,0.9)]";
const STICKER_SM = "shadow-[2px_3px_0_rgba(17,29,69,0.9)]";

export default function Home() {
  const { ticketUrl, ticketPrice, eventDate } = eventInfo;

  return (
    <div className="max-w-full [overflow-x:clip]">
      {/* ═══ HERO ═══ */}
      <section
        id="top"
        className="grain-overlay relative overflow-hidden bg-pink"
      >
        {/* zigzag top strip */}
        <div
          className="h-4 bg-repeat-x"
          style={{
            backgroundImage: "url('/assets/illustrations/zigzag-strip.png')",
            backgroundSize: "auto 100%",
          }}
        />

        {/* nav */}
        <div className="relative z-[2] flex items-center justify-between gap-6 px-[30px] pt-[18px]">
          <div
            className={`rounded-[10px] border-[2.5px] border-ink bg-paper px-4 py-2 font-display text-[18px] font-bold ${STICKER} [transform:rotate(-1deg)]`}
          >
            <span className="text-red">TEDx</span>
            <span className="text-ink">BangkokYouth</span>
          </div>
          <nav className="flex items-center gap-[26px] font-display text-[14.5px] font-semibold">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hidden text-paper no-underline transition-colors hover:text-yellow md:inline"
              >
                {l.label}
              </a>
            ))}
            <StickerButton href={ticketUrl} size="md" variant="yellow">
              ซื้อบัตร
            </StickerButton>
          </nav>
        </div>

        {/* floating illustrations */}
        <img
          src="/assets/illustrations/basket-cyan.png"
          alt=""
          className="pointer-events-none absolute left-[-30px] top-[190px] z-[1] w-[170px] [transform:rotate(-7deg)]"
        />
        <img
          src="/assets/illustrations/flask-sticker.png"
          alt=""
          className="pointer-events-none absolute left-[36px] top-[420px] z-[1] w-[110px] [transform:rotate(4deg)]"
        />
        <img
          src="/assets/illustrations/skewer-yellow-floss.png"
          alt=""
          className="pointer-events-none absolute left-[-6px] top-[600px] z-[1] w-[96px] [transform:rotate(-5deg)]"
        />
        <img
          src="/assets/illustrations/shorts-tedx.png"
          alt="กางเกงมวย TEDxBangkok Youth"
          className="pointer-events-none absolute right-[-24px] top-[170px] z-[1] w-[170px] [transform:rotate(6deg)]"
        />
        <img
          src="/assets/illustrations/fish-sauce-bottle.png"
          alt=""
          className="pointer-events-none absolute right-[44px] top-[430px] z-[1] w-[96px] [transform:rotate(-4deg)]"
        />
        <img
          src="/assets/illustrations/basket-yellow.png"
          alt=""
          className="pointer-events-none absolute right-[-34px] top-[590px] z-[1] w-[170px] [transform:rotate(5deg)]"
        />

        {/* hero content */}
        <div className="relative z-[2] flex flex-col items-center gap-[14px] px-[clamp(24px,14vw,180px)] pt-[42px] text-center">
          <h1 className="m-0 font-display font-bold uppercase leading-[0.98]">
            <span
              className="block whitespace-nowrap text-paper [transform:rotate(-1.2deg)]"
              style={{ fontSize: "min(106px,10.5vw)" }}
            >
              ส่วนผสม
              <span className="inline-block rounded-[12px] border-[3px] border-ink bg-yellow px-[18px] pb-[6px] text-ink shadow-[4px_5px_0_rgba(17,29,69,0.9)] [transform:rotate(-2.5deg)]">
                ลับ
              </span>
            </span>
            <span
              className="block whitespace-nowrap text-transparent [-webkit-text-stroke:2.5px_#111D45] [transform:rotate(0.6deg)]"
              style={{ fontSize: "min(74px,7.3vw)" }}
            >
              ฉบับคนไทย
            </span>
          </h1>

          <div className="mt-1 flex items-center justify-center gap-[14px]">
            <span
              className={`inline-block rounded-[8px] border-[2.5px] border-ink bg-paper px-4 py-[5px] font-display text-[20px] font-bold text-ink ${STICKER} [transform:rotate(2deg)]`}
            >
              TEDxBANGKOK YOUTH
            </span>
            <span
              className={`inline-block rounded-[8px] border-[2.5px] border-ink bg-cyan px-4 py-[5px] font-display text-[20px] font-bold text-paper ${STICKER} [transform:rotate(-2deg)]`}
            >
              2026 · {eventDate}
            </span>
          </div>

          <p className="mt-1.5 max-w-[640px] font-body text-[17px] leading-[1.6] text-paper">
            เวทีของไอเดียจากคนรุ่นใหม่ หยิบวัตถุดิบธรรมดาในชีวิตแบบไทย ๆ
            มาผสมใหม่ให้กลายเป็นสูตร(ไม่)ลับของความคิดสร้างสรรค์
          </p>

          <div className="mt-2.5 flex flex-wrap justify-center gap-4">
            <StickerButton href={ticketUrl} size="lg" variant="yellow">
              ซื้อบัตรเลย · ฿ {ticketPrice}
            </StickerButton>
            <StickerButton href="#speakers" size="lg" variant="outline">
              ดู Speakers 2026
            </StickerButton>
          </div>

          {/* recap video card */}
          <div className="mt-[26px] w-[760px] max-w-full overflow-hidden rounded-[16px] border-[3px] border-ink bg-ink shadow-[5px_6px_0_rgba(17,29,69,0.9)] [transform:rotate(-0.6deg)]">
            <div className="flex items-center justify-between border-b-[3px] border-ink bg-yellow px-4 py-2">
              <span className="font-display text-[15px] font-bold uppercase text-ink">
                Recap · TEDxBangkok Youth ปีที่ผ่านมา
              </span>
              <span className="font-display text-[13px] font-semibold text-ink">
                ▶ 02:26
              </span>
            </div>
            <div className="relative flex aspect-video flex-col items-center justify-center gap-[18px] bg-panel">
              <button
                type="button"
                aria-label="เล่นวิดีโอ recap"
                className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-[3px] border-paper bg-pink text-paper shadow-[4px_5px_0_rgba(2,175,218,0.8)] transition-[transform,box-shadow] duration-[120ms] [transform:rotate(-2deg)] hover:shadow-[7px_8px_0_rgba(2,175,218,0.8)] active:shadow-[1px_2px_0_rgba(2,175,218,0.8)]"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-[5px]"
                  aria-hidden
                >
                  <path d="M5 3.5v17l15-8.5z" />
                </svg>
              </button>
              <span className="px-4 text-center font-body text-[15px] text-cyan-300">
                วิดีโอ recap ใส่ลิงก์ YouTube/ไฟล์จริงภายหลัง (TBA)
              </span>
            </div>
          </div>

          <div className="flex justify-center py-4 pb-[30px]">
            <span className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
              วัตถุดิบพร้อม · Speakers พร้อม · เหลือแค่คุณ
            </span>
          </div>
        </div>
      </section>

      {/* ═══ PAST EVENTS ═══ */}
      <section
        id="past"
        className="grain-overlay scroll-mt-5 bg-bg-page px-[60px] pb-[60px] pt-[70px]"
      >
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span
            className={`inline-block rounded-[10px] border-[3px] border-ink bg-green px-[26px] py-2 font-display text-[38px] font-bold uppercase text-paper ${STICKER} [transform:rotate(-1deg)]`}
          >
            งานปีก่อน ๆ
          </span>
          <p className="mt-2.5 max-w-[560px] font-body text-[17px] leading-[1.6] text-ink">
            กว่า 5 ปีของเวที TEDxBangkok Youth ทุกปีคือการทดลองสูตรใหม่
          </p>
        </div>

        <div className="mx-auto mt-11 max-w-[1240px]">
          <div className="relative z-[1] flex flex-wrap items-end justify-center gap-[30px]">
            {pastEvents.map((y) => (
              <div
                key={y.id}
                className="flex w-[210px] flex-col"
                style={{ transform: `rotate(${y.rot}deg)` }}
              >
                <div
                  className={`overflow-hidden rounded-[12px] border-[3px] border-ink bg-paper ${STICKER}`}
                >
                  <div className="aspect-[3/4] w-full">
                    <ImageSlot
                      placeholder={`โปสเตอร์ปีที่ ${y.id}`}
                      shape="rect"
                    />
                  </div>
                </div>
                <span
                  className="relative z-[2] mt-[-14px] self-center rounded-[8px] border-[2.5px] border-ink px-[14px] py-0.5 font-display text-[16px] font-bold shadow-[2px_3px_0_rgba(17,29,69,0.9)]"
                  style={{ background: y.color, color: y.text }}
                >
                  {y.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 h-[18px] rounded-[6px] border-[3px] border-ink bg-pink shadow-[0_6px_0_rgba(17,29,69,0.35)]" />
        </div>
      </section>

      {/* ═══ TED CLUB ═══ */}
      <section
        id="club"
        className="grain-overlay relative scroll-mt-5 overflow-hidden bg-cyan px-[60px] py-[64px]"
      >
        <img
          src="/assets/illustrations/lime-slice.png"
          alt=""
          className="pointer-events-none absolute right-[-20px] top-[-24px] w-[150px] [transform:rotate(12deg)]"
        />
        <img
          src="/assets/illustrations/chili-red.png"
          alt=""
          className="pointer-events-none absolute bottom-[-20px] left-[-16px] w-[130px] [transform:rotate(-10deg)]"
        />
        <div className="relative z-[1] mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-11 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start gap-4">
            <span
              className={`inline-block rounded-[10px] border-[3px] border-ink bg-paper px-[26px] py-2 font-display text-[38px] font-bold uppercase text-ink ${STICKER} [transform:rotate(-1deg)]`}
            >
              TED Club
            </span>
            <p className="mt-1.5 max-w-[520px] font-body text-[17px] leading-[1.7] text-paper">
              ห้องทดลองย่อยของ TEDxBangkok Youth
              วงคุยขนาดเล็กสำหรับนักเรียนที่อยากฝึกคิด
              ฝึกเล่าไอเดียของตัวเองก่อนขึ้นเวทีจริง จัดต่อเนื่องตลอดปี
            </p>
            <ul className="m-0 list-disc pl-[22px] font-body text-[16px] font-semibold leading-[1.9] text-ink">
              <li>เวิร์กช็อปการเล่าเรื่องและ public speaking</li>
              <li>วงแลกเปลี่ยนไอเดียประจำเดือน</li>
              <li>เส้นทางสู่การเป็น speaker บนเวทีใหญ่</li>
            </ul>
            <StickerButton href="#" size="lg" variant="pink">
              สมัครเข้า TED Club · TBA
            </StickerButton>
          </div>
          <div className="overflow-hidden rounded-[16px] border-[3px] border-ink bg-paper shadow-[5px_6px_0_rgba(17,29,69,0.9)] [transform:rotate(1deg)]">
            <div className="aspect-[4/3] w-full">
              <ImageSlot placeholder="รูปบรรยากาศ TED Club" shape="rect" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPEAKERS ═══ */}
      <section
        id="speakers"
        className="grain-overlay scroll-mt-5 bg-ink px-[60px] py-[70px]"
      >
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="inline-block rounded-[10px] border-[3px] border-paper bg-yellow px-[26px] py-2 font-display text-[38px] font-bold uppercase text-ink shadow-[4px_5px_0_rgba(239,72,153,0.8)] [transform:rotate(-1deg)]">
            Speakers 2026
          </span>
          <p className="mt-2.5 max-w-[560px] font-body text-[17px] leading-[1.6] text-navy-100">
            วัตถุดิบหลักของปีนี้ 8 นักเล่าเรื่องกับส่วนผสมที่ไม่เหมือนใคร
          </p>
        </div>

        <div className="mx-auto mt-11 grid max-w-[1180px] grid-cols-2 gap-[26px] sm:grid-cols-3 lg:grid-cols-4">
          {speakers.map((sp) => (
            <div
              key={sp.id}
              className="flex flex-col items-center gap-3 rounded-[14px] border-[3px] border-ink bg-paper px-4 pb-[18px] pt-[22px] text-center shadow-[4px_5px_0_rgba(239,72,153,0.8)]"
              style={{ transform: `rotate(${sp.rot}deg)` }}
            >
              <div className="h-[140px] w-[140px] overflow-hidden rounded-full border-[3px] border-ink bg-[#ede8de]">
                <ImageSlot placeholder="รูป speaker" shape="circle" />
              </div>
              <div className="font-display text-[19px] font-bold text-ink">
                Speaker TBA
              </div>
              <span
                className="rounded-[8px] border-[2.5px] border-ink px-3 py-[3px] font-display text-[13px] font-semibold shadow-[2px_3px_0_rgba(17,29,69,0.9)]"
                style={{ background: sp.tagColor, color: sp.tagText }}
              >
                หัวข้อ · TBA
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TEAM / VOLUNTEERS ═══ */}
      <section
        id="team"
        className="grain-overlay scroll-mt-5 bg-bg-page px-[60px] py-[70px]"
      >
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span
            className={`inline-block rounded-[10px] border-[3px] border-ink bg-pink px-[26px] py-2 font-display text-[38px] font-bold uppercase text-paper ${STICKER} [transform:rotate(1deg)]`}
          >
            ทีมงานอาสา
          </span>
          <p className="mt-2.5 max-w-[560px] font-body text-[17px] leading-[1.6] text-ink">
            กำแพงกรอบรูปของคนหลังบ้าน อาสาสมัครทุกคนที่ช่วยกันปรุงงานนี้ขึ้นมา
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1180px] grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {team.map((tm) => (
            <div
              key={tm.id}
              className="flex flex-col items-center gap-2"
              style={{ transform: `rotate(${tm.rot}deg)` }}
            >
              <div
                className={`box-border w-full rounded-[10px] border-[3px] border-ink bg-paper px-2 pb-1.5 pt-2 ${STICKER}`}
              >
                <div className="box-border aspect-square w-full overflow-hidden rounded-[6px] border-2 border-ink bg-[#ede8de]">
                  <ImageSlot placeholder="รูปทีม" shape="rect" />
                </div>
                <div className="pt-1.5 text-center font-display text-[13.5px] font-bold text-ink">
                  ชื่อ TBA
                </div>
              </div>
              <span
                className="rounded-[6px] border-2 border-ink px-2.5 py-px font-display text-[12px] font-semibold shadow-[2px_2px_0_rgba(17,29,69,0.9)]"
                style={{ background: tm.tagColor, color: tm.tagText }}
              >
                {tm.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SPONSORS ═══ */}
      <section
        id="sponsors"
        className="grain-overlay scroll-mt-5 border-t-[3px] border-ink bg-paper px-[60px] py-[64px]"
      >
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span
            className={`inline-block rounded-[10px] border-[3px] border-ink bg-red px-[26px] py-2 font-display text-[38px] font-bold uppercase text-paper ${STICKER} [transform:rotate(-1deg)]`}
          >
            Sponsors
          </span>
          <p className="mt-2.5 max-w-[560px] font-body text-[17px] leading-[1.6] text-ink">
            ผู้สนับสนุนที่ช่วยให้สูตรลับนี้เกิดขึ้นจริง
          </p>
        </div>

        <div className="mx-auto mt-[38px] grid max-w-[1080px] grid-cols-2 gap-[22px] sm:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className={`h-[120px] overflow-hidden rounded-[12px] border-[3px] border-ink bg-bg-page ${STICKER_SM}`}
              style={{ transform: `rotate(${s.rot}deg)` }}
            >
              <ImageSlot placeholder="โลโก้ผู้สนับสนุน TBA" fit="contain" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        id="tickets"
        className="grain-overlay relative scroll-mt-5 overflow-hidden border-t-[3px] border-ink bg-yellow px-[60px] py-[64px]"
      >
        <img
          src="/assets/illustrations/starburst-red.png"
          alt=""
          className="pointer-events-none absolute left-[60px] top-[-30px] w-[140px] [transform:rotate(-8deg)]"
        />
        <img
          src="/assets/illustrations/basket-pink.png"
          alt=""
          className="pointer-events-none absolute bottom-[-36px] right-[40px] w-[180px] [transform:rotate(6deg)]"
        />
        <div className="relative z-[1] flex flex-col items-center gap-[18px] text-center">
          <h2 className="m-0 font-display text-[clamp(34px,7vw,56px)] font-bold uppercase text-ink [transform:rotate(-0.8deg)]">
            พร้อมชิมสูตรลับหรือยัง?
          </h2>
          <p className="m-0 max-w-[520px] font-body text-[18px] leading-[1.6] text-ink">
            TEDxBangkok Youth 2026 · {eventDate} · สถานที่ TBA · บัตร ฿{" "}
            {ticketPrice}
          </p>
          <StickerButton href={ticketUrl} size="lg" variant="pink">
            ซื้อบัตรตอนนี้
          </StickerButton>
          <span className="font-display text-[14px] font-semibold tracking-[0.04em] text-ink">
            #TEDxBangkokYouth2026 #ส่วนผสมลับฉบับคนไทย
          </span>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="grain-overlay bg-ink px-[60px] pb-10 pt-[54px]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-[380px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-display text-[38px] font-bold leading-[1.1] text-pink [transform:rotate(-1deg)]">
                เท็ด x บางกอก ยุธ
              </span>
              <span className="font-display text-[17px] font-bold uppercase tracking-[0.14em] text-paper">
                TEDxBangkok Youth
              </span>
            </div>
            <p className="m-0 font-body text-[14px] leading-[1.7] text-navy-100">
              This independent TEDx event is operated under license from TED.
            </p>
          </div>
          <div className="flex flex-wrap gap-[60px]">
            <FooterCol title="เมนู">
              {navLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="ติดตาม">
              <FooterLink href="#">Instagram · TBA</FooterLink>
              <FooterLink href="#">Facebook · TBA</FooterLink>
              <FooterLink href="#">TikTok · TBA</FooterLink>
              <FooterLink href="#">YouTube · TBA</FooterLink>
            </FooterCol>
            <FooterCol title="ติดต่อ">
              <FooterLink href="mailto:hello@tedxbangkokyouth.com">
                hello@tedxbangkokyouth.com
              </FooterLink>
            </FooterCol>
          </div>
        </div>
        <div className="mx-auto mt-9 flex max-w-[1180px] flex-wrap justify-between gap-5 border-t-2 border-dashed border-paper/30 pt-[18px] font-body text-[13px] text-muted-slate">
          <span>© 2026 TEDxBangkok Youth</span>
          <span>Mix the Ordinary, Create the Extraordinary</span>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 font-body text-[15px]">
      <span className="font-display text-[16px] font-bold uppercase text-yellow">
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-paper no-underline transition-colors hover:text-pink"
    >
      {children}
    </a>
  );
}
