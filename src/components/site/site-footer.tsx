/* eslint-disable @next/next/no-img-element */
import { footerLinks, social } from "@/lib/site-data";

/** Ported from the TEDxBangkok Youth design-system `Footer` component. */
export function SiteFooter() {
  return (
    <footer
      data-ci="main"
      style={{
        background: "var(--main-black)",
        color: "var(--main-white)",
        fontFamily: "var(--main-font-sans)",
        padding: "64px 32px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <img
            src="/assets/logos/tedxbangkokyouth-lockup-white.png"
            alt="TEDxBangkok Youth"
            style={{
              height: 40,
              width: "auto",
              alignSelf: "flex-start",
              objectFit: "contain",
            }}
          />
          <p
            style={{
              color: "var(--main-gray-400)",
              fontSize: 13,
              maxWidth: 320,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            This independent TEDx event is operated under license from TED.
          </p>
        </div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          {footerLinks.map((group) => (
            <div
              key={group.title}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--main-gray-400)",
                }}
              >
                {group.title}
              </span>
              {group.items.map((it) => (
                <a
                  key={it}
                  href="#"
                  style={{
                    color: "var(--main-white)",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  {it}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "48px auto 0",
          paddingTop: 20,
          borderTop: "1px solid var(--main-gray-800)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 12,
          color: "var(--main-gray-500)",
        }}
      >
        <span>© 2026 TEDxBangkok Youth</span>
        <div style={{ display: "flex", gap: 16 }}>
          {social.map((s) => (
            <a
              key={s}
              href="#"
              style={{ color: "var(--main-gray-500)", textDecoration: "none" }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
