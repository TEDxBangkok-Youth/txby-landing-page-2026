/* eslint-disable @next/next/no-img-element */
import { ImageSlot } from "@/components/site/image-slot";
import { NavBar } from "@/components/site/nav-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { ClubMap } from "@/components/site/club-map";
import { VolunteersRoster } from "@/components/site/volunteers-roster";
import { ThaiButton, ThaiTag } from "@/components/site/thai-ui";
import { galleryYears, speakers } from "@/lib/site-data";

const CARD_SHADOW = "3px 4px 0 rgba(17,29,69,.9)";

export default function Home() {
  return (
    <div
      style={{
        background: "#FBF6E9",
        fontFamily: "var(--font-body)",
        color: "#111D45",
      }}
    >
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        id="hero"
        className="thai"
        style={{
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          width: "100%",
          height: "100dvh",
          minHeight: 560,
          background: "#F4E31E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavBar />

        <div
          style={{
            position: "relative",
            width: "min(100%, calc((100dvh - 132px) * 1456 / 1010))",
            maxWidth: 1680,
            margin: "0 auto",
            aspectRatio: "1456 / 1010",
            containerType: "inline-size",
          }}
        >
          <img
            src="/assets/thaigredient/burst-blue.svg"
            alt=""
            style={{
              position: "absolute",
              left: "-6cqw",
              top: "-2cqw",
              width: "30cqw",
              height: "auto",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "23cqw",
              top: "6cqw",
              width: "74cqw",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#111D45",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1cqw",
                fontSize: "9.8cqw",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
              }}
            >
              <span>ส่วนผสม</span>
              <span
                style={{
                  display: "inline-block",
                  background: "#02AFDA",
                  border: "0.38cqw solid #111D45",
                  borderRadius: "1.2cqw",
                  padding: "0 1cqw 0.5cqw",
                  transform: "rotate(-1.5deg)",
                }}
              >
                ลับ
              </span>
            </div>
            <div
              style={{
                marginLeft: "9.8cqw",
                marginTop: "-0.4cqw",
                fontSize: "9.5cqw",
                lineHeight: 1.3,
                letterSpacing: "0.01em",
                color: "transparent",
                WebkitTextStroke: "0.3cqw #111D45",
              }}
            >
              ฉบับคนไทย
            </div>
          </div>

          <img
            src="/assets/thaigredient/skewer-pork.png"
            alt=""
            style={{
              position: "absolute",
              left: "5cqw",
              top: "20cqw",
              width: "19cqw",
              height: "auto",
              transform: "rotate(-4deg)",
            }}
          />
          <img
            src="/assets/thaigredient/bowl-mix-hero.png"
            alt="ชามส่วนผสมลับ"
            style={{
              position: "absolute",
              left: "7cqw",
              top: "22cqw",
              width: "82cqw",
              height: "auto",
            }}
          />
          <img
            src="/assets/thaigredient/tag-price-67.png"
            alt="฿67.00 เท็ด x บางกอก"
            style={{
              position: "absolute",
              left: "70cqw",
              top: "48cqw",
              width: "12cqw",
              height: "auto",
              transform: "rotate(-3deg)",
            }}
          />
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section
        id="gallery"
        className="thai grain-overlay"
        style={{
          background: "#FBF6E9",
          padding: "104px 32px",
          borderBottom: "4px solid #111D45",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 40,
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            <div style={{ maxWidth: 660 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.25rem,6vw,4.25rem)",
                  lineHeight: 1.02,
                  letterSpacing: ".01em",
                  color: "#111D45",
                }}
              >
                TED Youth
                <br />
                Gallery
              </h2>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: "1.125rem",
                  lineHeight: 1.5,
                  maxWidth: 520,
                  color: "#233064",
                  textWrap: "pretty",
                }}
              >
                ทุกปีคือหนึ่งสูตร ย้อนดูธีม ผู้พูด และรสชาติของแต่ละรุ่นที่ผ่านเวทีนี้
              </p>
            </div>
            <img
              src="/assets/thaigredient/bowl-rooster.png"
              alt=""
              style={{ width: 170, height: "auto", transform: "rotate(6deg)" }}
            />
          </div>

          {/* featured 2025 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))",
              alignItems: "center",
              gap: 56,
            }}
          >
            <div style={{ position: "relative", transform: "rotate(-1.4deg)" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  border: "2.5px solid #111D45",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#F3ECD8",
                  boxShadow: CARD_SHADOW,
                }}
              >
                <img
                  src="/assets/gallery-2025-cover.jpg"
                  alt="บรรยากาศงานปี 2025"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -26,
                  right: -18,
                  transform: "rotate(8deg)",
                }}
              >
                <ThaiTag price="2025" color="pink">
                  ปีล่าสุด
                </ThaiTag>
              </div>
            </div>

            <div
              style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#D6317F",
                }}
              >
                12 talks · หอศิลปกรุงเทพฯ
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1.75rem,4vw,2.75rem)",
                  lineHeight: 1.3,
                  color: "#111D45",
                }}
              >
                เย็บปักถักทอล์ก
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                  color: "#233064",
                  textWrap: "pretty",
                }}
              >
                พบกับ 12 เรื่องเล่า จาก 12 เสียงต่างวัย ต่างเส้นทาง ที่ถักทอมาจากประสบการณ์
                ความฝัน ความหวัง และความเจ็บปวด โดยร้อยเรียงและถ่ายทอดอย่างพิถีพิถัน
                เพื่อให้หัวใจของคุณกลับมาพองโตอีกครั้ง
              </p>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8 }}
              >
                <ThaiButton variant="primary" size="md">
                  ดูรายละเอียดปี 2025
                </ThaiButton>
                <ThaiButton variant="outline" size="md">
                  ดู Talk บน YouTube
                </ThaiButton>
              </div>
            </div>
          </div>

          {/* year archive */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
              gap: 28,
              marginTop: 72,
            }}
          >
            {galleryYears.map((y) => (
              <a
                key={y.year}
                href="#"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: y.bg,
                  border: "2.5px solid #111D45",
                  borderRadius: 14,
                  boxShadow: CARD_SHADOW,
                  overflow: "hidden",
                  color: "#111D45",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    background: y.panelDark,
                    borderBottom: "2.5px solid #111D45",
                  }}
                >
                  <ImageSlot shape="rect" placeholder={y.placeholder} />
                </div>
                <div style={{ padding: "16px 18px 20px", background: "#FFFDF7", flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: y.chip,
                    }}
                  >
                    {y.year} · {y.talks}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      textTransform: "uppercase",
                      marginTop: 8,
                      lineHeight: 1.15,
                    }}
                  >
                    {y.title}
                  </div>
                  <div
                    style={{
                      fontSize: ".875rem",
                      color: "#3E4B7C",
                      marginTop: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {y.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TED CLUB ═══════════════ */}
      <section
        id="club"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--surface-page)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          padding: "var(--pad-section-y) 32px",
          borderTop: "var(--border-marker) solid var(--ted-black)",
          borderBottom: "var(--border-marker) solid var(--ted-black)",
        }}
      >
        <img
          src="/assets/tedclub/scribbles/field-texture.svg"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            right: -150,
            bottom: 24,
            width: 380,
            height: "auto",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 48,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(32px,4.6vw,var(--size-display-lg))",
                  lineHeight: "var(--leading-snug)",
                  letterSpacing: "var(--tracking-heading)",
                  color: "var(--text-primary)",
                }}
              >
                TED Club{" "}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: "var(--ted-red)",
                  }}
                >
                  ทั่วประเทศไทย
                  <img
                    src="/assets/tedclub/scribbles/underline-red.svg"
                    alt=""
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -10,
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </span>
              </h2>
              <p
                style={{
                  margin: "20px 0 0",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "var(--size-body-lg)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--text-secondary)",
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                ชมรมในโรงเรียนและมหาวิทยาลัยที่จัดเวทีของตัวเองตลอดทั้งปี
                ทุกกิจกรรมออกแบบให้ครูหนึ่งคนจัดได้เอง ด้วยคู่มือและสไลด์ที่เตรียมไว้ให้
              </p>
            </div>
            <img
              src="/assets/tedclub/logo.png"
              alt="TED Club · TEDxBangkok Youth"
              style={{ height: 140, width: "auto", flexShrink: 0 }}
            />
          </div>

          <ClubMap />
        </div>
      </section>

      {/* ═══════════════ SPEAKERS ═══════════════ */}
      <section
        id="speakers"
        className="thai grain-overlay"
        style={{
          background: "#EF4899",
          padding: "104px 32px",
          borderBottom: "4px solid #111D45",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 40,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.25rem,6vw,4rem)",
                  lineHeight: 1.02,
                  color: "#FFFDF7",
                }}
              >
                Speakers
              </h2>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: "1.125rem",
                  lineHeight: 1.5,
                  color: "#5B0E36",
                  maxWidth: 520,
                  textWrap: "pretty",
                }}
              >
                ผู้พูดทุกคนบนเวที TEDxBangkok Youth ปีนี้
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
              gap: "32px 24px",
              maxWidth: "100%",
            }}
          >
            {speakers.map((s) => (
              <div
                key={s.name}
                style={{
                  minWidth: 0,
                  background: "#FFFDF7",
                  border: "2.5px solid #111D45",
                  borderRadius: 14,
                  boxShadow: CARD_SHADOW,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    borderBottom: "2.5px solid #111D45",
                    background: s.tint,
                    overflow: "hidden",
                  }}
                >
                  {s.hasPhoto ? (
                    <div
                      role="img"
                      aria-label={s.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${s.photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 56,
                        color: "#111D45",
                        opacity: 0.55,
                      }}
                    >
                      {s.initial}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: "14px 16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.0625rem",
                      lineHeight: 1.2,
                      color: "#111D45",
                    }}
                  >
                    {s.name}
                  </div>
                  <div style={{ fontSize: ".8125rem", lineHeight: 1.45, color: "#3E4B7C" }}>
                    {s.role}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 10,
                      fontSize: ".8125rem",
                      fontWeight: 600,
                      color: "#D6317F",
                      lineHeight: 1.4,
                    }}
                  >
                    “{s.talk}”
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VOLUNTEERS ═══════════════ */}
      <section
        id="volunteers"
        className="thai grain-overlay"
        style={{
          background: "#111D45",
          padding: "104px 32px",
          borderBottom: "4px solid #111D45",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 40,
              flexWrap: "wrap",
              marginBottom: 48,
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.25rem,6vw,4rem)",
                  lineHeight: 1.02,
                  color: "#FFFDF7",
                }}
              >
                Volunteers
              </h2>
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: "1.125rem",
                  lineHeight: 1.5,
                  color: "#DCDFEA",
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                ทุกงานเกิดขึ้นได้เพราะอาสาสมัคร นี่คือรายชื่อทีมงานครบทุกคนของปีนี้
              </p>
            </div>
          </div>

          <div
            className="volunteers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 400px",
              gap: 32,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                position: "relative",
                minWidth: 0,
                border: "2.5px solid #FFFDF7",
                borderRadius: 14,
                overflow: "hidden",
                background: "#233064",
                boxShadow: "3px 4px 0 rgba(255,253,247,.9)",
              }}
            >
              <ImageSlot shape="rect" placeholder="รูปทีมอาสาสมัคร" />
            </div>
            <VolunteersRoster />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
