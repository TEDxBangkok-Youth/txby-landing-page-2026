/* eslint-disable @next/next/no-img-element */
import { footerLinks, social } from "@/lib/site-data";

/** Ported from the TEDxBangkok Youth design-system `Footer` component. */
export function SiteFooter() {
  return (
    <footer
      data-theme="main" data-surface="inverse"
      style={{
        background: "var(--t-surface)",
        color: "var(--t-foreground)",
        fontFamily: "var(--t-font-body)",
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
              color: "var(--t-foreground-muted)",
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
                  color: "var(--t-foreground-muted)",
                }}
              >
                {group.title}
              </span>
              {group.items.map((it) => (
                <a
                  key={it}
                  href="#"
                  style={{
                    color: "var(--t-foreground)",
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
          borderTop: "1px solid var(--t-line-subtle)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 12,
          color: "var(--t-foreground-faint)",
        }}
      >
        <span>© 2026 TEDxBangkok Youth</span>
        <div style={{ display: "flex", gap: 16 }}>
          {social.map((s) => (
            <a
              key={s}
              href="#"
              style={{ color: "var(--t-foreground-faint)", textDecoration: "none" }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
