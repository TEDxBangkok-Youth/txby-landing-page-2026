"use client";

import { useState } from "react";
import { ThaiButton, ThaiTag } from "@/components/site/thai-ui";
import { StickerButton } from "@/components/site/sticker-button";
import { ImageSlot } from "@/components/site/image-slot";
import { VolunteersRoster } from "@/components/site/volunteers-roster";

/**
 * Internal reference page documenting the three coexisting design systems
 * (Thaigredient / TED Club / TEDx main) that power the site: every color,
 * type, spacing, radius and shadow token, plus every shared component and
 * its interaction states. Not linked from the public nav — visit
 * /design-system directly.
 */

const CARD_SHADOW = "3px 4px 0 rgba(17,29,69,.9)";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "56px 0", borderTop: "1px solid #E4DCC6" }}>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "var(--t-font-heading)",
            fontSize: 28,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            color: "#111D45",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p style={{ color: "#3E4B7C", fontSize: 14, marginTop: 6, maxWidth: 640 }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--t-font-heading)",
        fontSize: 15,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#233064",
        margin: "0 0 14px",
      }}
    >
      {children}
    </h3>
  );
}

function Swatch({ name, value, on }: { name: string; value: string; on?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 132 }}>
      <div
        style={{
          height: 64,
          borderRadius: 10,
          border: "2px solid #111D45",
          background: value,
          boxShadow: "2px 3px 0 rgba(17,29,69,0.25)",
        }}
      />
      <div style={{ fontSize: 11.5, lineHeight: 1.4 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700 }}>{name}</div>
        <div style={{ opacity: 0.65, fontFamily: "monospace" }}>{on ?? value}</div>
      </div>
    </div>
  );
}

function SwatchRow({ swatches }: { swatches: { name: string; value: string; on?: string }[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
      {swatches.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  );
}

function TokenTable({ rows }: { rows: [string, string][] }) {
  return (
    <div
      style={{
        border: "1.5px solid #DCDFEA",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      {rows.map(([k, v], i) => (
        <div
          key={k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            padding: "9px 16px",
            fontSize: 12.5,
            fontFamily: "monospace",
            background: i % 2 ? "#FBF6E9" : "#FFFDF7",
          }}
        >
          <span style={{ color: "#233064" }}>{k}</span>
          <span style={{ color: "#111D45", opacity: 0.75 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function StateChip({
  label,
  style,
}: {
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 96,
        padding: "10px 16px",
        borderRadius: 12,
        border: "2.5px solid #111D45",
        fontFamily: "var(--t-font-heading)",
        fontWeight: 700,
        fontSize: 13,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export default function DesignSystemPage() {
  const [checked, setChecked] = useState(false);

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "thaigredient", label: "Thaigredient CI" },
    { id: "tedclub", label: "TED Club CI" },
    { id: "tedxmain", label: "TEDx Main CI" },
    { id: "components", label: "Components" },
    { id: "cards", label: "Card audit" },
    { id: "states", label: "Interaction states" },
  ];

  return (
    <div style={{ background: "#FBF6E9", color: "#111D45", minHeight: "100vh" }}>
      {/* local mini-nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#FFFDF7",
          borderBottom: "2.5px solid #111D45",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            gap: 20,
            padding: "14px 24px",
            whiteSpace: "nowrap",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#233064",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* ═══════ Overview ═══════ */}
        <section id="overview" style={{ padding: "48px 0 32px" }}>
          <h1
            style={{
              fontFamily: "var(--t-font-heading)",
              fontSize: 40,
              fontWeight: 700,
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Design System Reference
          </h1>
          <p style={{ maxWidth: 680, color: "#233064", fontSize: 15, lineHeight: 1.6 }}>
            TEDxBangkok Youth 2026 runs three coexisting design systems, each scoped so
            their tokens never collide: <b>Thaigredient</b> (the seasonal
            &ldquo;ส่วนผสมลับ&rdquo; theme, live at <code>:root</code> — everything except the
            nav, footer, and TED Club section), <b>TED Club</b> (scoped to{" "}
            <code>#club</code>, used only inside the TED Club section), and{" "}
            <b>TEDx main</b> (the official brand, scoped to{" "}
            <code>[data-ci=&quot;main&quot;]</code>, used on the NavBar and Footer).
          </p>
        </section>

        {/* ═══════ Thaigredient tokens ═══════ */}
        <Section
          id="thaigredient"
          title="Thaigredient CI"
          subtitle="Default scope — applies everywhere except the NavBar, Footer, and #club section. Tokens live at :root / @theme inline in globals.css."
        >
          <SubHeading>Brand hues</SubHeading>
          <SwatchRow
            swatches={[
              { name: "pink", value: "#EF4899" },
              { name: "pink-strong", value: "#D6317F" },
              { name: "pink-700", value: "#B31F67" },
              { name: "pink-300", value: "#F480B8" },
              { name: "pink-100", value: "#FBDCEB" },
              { name: "yellow", value: "#F9EF3E" },
              { name: "yellow-600", value: "#E0D420" },
              { name: "yellow-300", value: "#FBF57E" },
              { name: "cyan", value: "#02AFDA" },
              { name: "cyan-600", value: "#0288AB" },
              { name: "cyan-300", value: "#5FCBE8" },
              { name: "green", value: "#00A14B" },
              { name: "green-600", value: "#00803B" },
              { name: "green-300", value: "#5BC488" },
              { name: "red", value: "#C82227" },
              { name: "red-600", value: "#A11B1F" },
              { name: "red-300", value: "#E17A7D" },
            ]}
          />
          <SubHeading>Neutrals</SubHeading>
          <SwatchRow
            swatches={[
              { name: "ink", value: "#111D45" },
              { name: "ink-soft", value: "#233064" },
              { name: "navy-500", value: "#3E4B7C" },
              { name: "navy-100", value: "#DCDFEA" },
              { name: "paper", value: "#FFFDF7" },
              { name: "paper-050 / bg-page", value: "#FBF6E9" },
              { name: "paper-100", value: "#F3ECD8" },
            ]}
          />
          <SubHeading>Semantic roles</SubHeading>
          <TokenTable
            rows={[
              ["--color-primary", "var(--color-tg-pink)"],
              ["--color-primary-strong", "var(--color-tg-pink-strong)"],
              ["--color-primary-tint", "var(--color-tg-pink-100)"],
              ["--color-focus-ring", "var(--color-tg-cyan)"],
              ["--color-hover-darken", "rgba(17,29,69,.14)"],
              ["--color-press-darken", "rgba(17,29,69,.24)"],
            ]}
          />
          <SubHeading>Type</SubHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            <div style={{ fontFamily: "var(--t-font-heading)", fontSize: 30, fontWeight: 700 }}>
              --font-display · Chakra Petch
            </div>
            <div style={{ fontFamily: "var(--t-font-body)", fontSize: 18 }}>
              --font-body · Sarabun — ตัวอย่างข้อความภาษาไทย
            </div>
            <div style={{ fontFamily: "var(--t-font-accent)", fontSize: 22 }}>
              --font-accent · SOV Rohan
            </div>
            <div style={{ fontFamily: "var(--font-athiti)", fontSize: 18 }}>
              --font-athiti · Athiti (shared with TED Club)
            </div>
          </div>
          <SubHeading>Spacing scale</SubHeading>
          <TokenTable
            rows={[
              ["--space-3xs", "0.25rem"],
              ["--space-2xs", "0.5rem"],
              ["--space-xs", "0.75rem"],
              ["--space-sm", "1rem"],
              ["--space-md", "1.5rem"],
              ["--space-lg", "2.25rem"],
              ["--space-xl", "3.5rem"],
              ["--space-2xl", "5rem"],
              ["--space-3xl", "7.5rem"],
            ]}
          />
          <SubHeading>Radius & shadow</SubHeading>
          <TokenTable
            rows={[
              ["--tg-radius-sm", "6px"],
              ["--tg-radius-md", "14px"],
              ["--tg-radius-lg", "28px"],
              ["--tg-radius-pill", "999px"],
              ["--shadow-sticker", "3px 4px 0 rgba(17,29,69,.9)"],
              ["--shadow-sticker-sm", "2px 3px 0 rgba(17,29,69,.9)"],
              ["--shadow-lift", "0 10px 24px rgba(17,29,69,.18)"],
              ["--jitter-1 / 2 / 3", "rotate(-1.4deg) / 1.1deg / -0.6deg"],
            ]}
          />
        </Section>

        {/* ═══════ TED Club tokens ═══════ */}
        <div id="club">
          <Section
            id="tedclub"
            title="TED Club CI"
            subtitle='Scoped to #club — used only inside the TED Club section (map, roster, logo). Values shown below are the resolved defaults; an inverse dark variant is available via [data-theme="inverse"].'
          >
            <SubHeading>Brand & ink</SubHeading>
            <SwatchRow
              swatches={[
                { name: "ted-red", value: "var(--color-club-red)", on: "#E12B06" },
                { name: "red-600", value: "var(--color-club-red-600)", on: "#B32105" },
                { name: "red-400", value: "var(--color-club-red-400)", on: "#EE5C3C" },
                { name: "red-200", value: "var(--color-club-red-200)", on: "#F8B6A6" },
                { name: "red-50", value: "var(--color-club-red-050)", on: "#FDEEE9" },
                { name: "ink-900", value: "var(--color-club-ink-900)", on: "#000" },
                { name: "ink-600", value: "var(--color-club-ink-600)", on: "#4D4D4D" },
                { name: "ink-300", value: "var(--color-club-ink-300)", on: "#C9C9C9" },
                { name: "ink-100", value: "var(--color-club-ink-100)", on: "#EFEDE9" },
                { name: "paper-0", value: "var(--color-club-paper)", on: "#FFF" },
              ]}
            />
            <SubHeading>Semantic surfaces & text</SubHeading>
            <TokenTable
              rows={[
                ["--text-primary / secondary / muted", "ink-900 / ink-600 / ink-500"],
                ["--text-link / link-hover", "ted-red / red-600"],
                ["--signal-success", "#1E7A47"],
                ["--signal-info", "#1B5FA8"],
                ["--surface-page / card / wash", "paper-50 / paper-0 / red-50"],
                ["--border-subtle / default / strong", "ink-200 / ink-300 / black"],
                ["--focus-ring", "ted-red"],
              ]}
            />
            <SubHeading>Type</SubHeading>
            <div
              style={{
                fontFamily: "var(--t-font-heading)",
                fontSize: "var(--text-title-lg)",
                fontWeight: "700",
                marginBottom: 24,
              }}
            >
              --font-heading / --font-body · Athiti
            </div>
            <TokenTable
              rows={[
                ["--size-display-2xl / xl / lg", "72 / 56 / 44px"],
                ["--size-title-lg / md / sm", "32 / 26 / 21px"],
                ["--size-body-lg / md / sm", "19 / 17 / 15px"],
                ["--size-label / micro", "13 / 12px"],
                ["--weight-light/regular/medium/bold", "300 / 400 / 500 / 700"],
                ["--tracking-display / heading / label", "-.025em / -.015em / .09em"],
              ]}
            />
            <SubHeading>Radius, border & shadow</SubHeading>
            <TokenTable
              rows={[
                ["--radius-sm / md / lg / pill", "2 / 4 / 8 / 999px"],
                ["--border-hairline / ink / marker", "1 / 1.5 / 3px"],
                ["--shadow-ink", "2px 2px 0 black"],
                ["--shadow-ink-press", "1px 1px 0 black"],
                ["--shadow-ink-red", "2px 2px 0 ted-red"],
                ["--container-max / narrow / wide", "1200 / 760 / 1440px"],
                ["--header-h / tap-min", "72px / 44px"],
              ]}
            />
            <SubHeading>Motion</SubHeading>
            <TokenTable
              rows={[
                ["--duration-fast / base", "140ms / 200ms"],
                ["--ease-ink", "cubic-bezier(.2,.8,.2,1)"],
              ]}
            />
          </Section>
        </div>

        {/* ═══════ TEDx main tokens ═══════ */}
        <div data-ci="main">
          <Section
            id="tedxmain"
            title="TEDx Main CI"
            subtitle='Scoped to [data-ci="main"] — used on the fixed NavBar and the SiteFooter. Fonts: Inter + IBM Plex Sans Thai.'
          >
            <SubHeading>Brand & neutrals</SubHeading>
            <SwatchRow
              swatches={[
                { name: "red-500 (accent)", value: "var(--color-ci-red-500)", on: "#EB0028" },
                { name: "red-600", value: "var(--color-ci-red-600)", on: "#C4001F" },
                { name: "red-700", value: "var(--color-ci-red-700)", on: "#9E0019" },
                { name: "black", value: "var(--color-ci-black)", on: "#000" },
                { name: "gray-800", value: "var(--color-ci-gray-800)", on: "#1A1A1A" },
                { name: "gray-600", value: "var(--color-ci-gray-600)", on: "#4A4A4A" },
                { name: "gray-400", value: "var(--color-ci-gray-400)", on: "#8A8A8A" },
                { name: "gray-200", value: "var(--color-ci-gray-200)", on: "#D6D6D6" },
                { name: "gray-50", value: "var(--color-ci-gray-50)", on: "#F7F7F7" },
                { name: "white", value: "var(--color-ci-white)", on: "#FFF" },
              ]}
            />
            <SubHeading>Type scale</SubHeading>
            <div
              style={{
                fontFamily: "var(--font-inter), var(--font-ibm-plex-sans-thai), sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: "var(--text-h1)", fontWeight: 700 }}>
                --main-fs-h1 · Inter / IBM Plex Sans Thai
              </div>
              <div style={{ fontSize: "var(--text-h4)", fontWeight: 600 }}>
                --main-fs-h3 · semibold
              </div>
              <div style={{ fontSize: "var(--text-body)", fontWeight: 400 }}>
                --main-fs-body · regular — ตัวอย่างข้อความ
              </div>
              <div
                style={{
                  fontSize: "var(--text-caption)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                --main-fs-eyebrow
              </div>
            </div>
            <SubHeading>Spacing, radius & motion</SubHeading>
            <TokenTable
              rows={[
                ["--main-space-1…10", "4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160px"],
                ["--main-radius-sm / md / pill", "2 / 4 / 999px"],
                ["--main-container-max / gutter", "1200px / 24px"],
                ["--main-ease-standard", "cubic-bezier(.2,.7,.3,1)"],
                ["--main-dur-fast / base / slow", "120 / 200 / 360ms"],
              ]}
            />
          </Section>
        </div>

        {/* ═══════ Components ═══════ */}
        <Section
          id="components"
          title="Components"
          subtitle="Shared UI primitives used across the Thaigredient-scoped sections."
        >
          <SubHeading>ThaiButton — variants</SubHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
            <ThaiButton variant="primary">Primary</ThaiButton>
            <ThaiButton variant="yellow">Yellow</ThaiButton>
            <ThaiButton variant="cyan">Cyan</ThaiButton>
            <ThaiButton variant="green">Green</ThaiButton>
            <ThaiButton variant="red">Red</ThaiButton>
            <ThaiButton variant="outline">Outline</ThaiButton>
          </div>
          <SubHeading>ThaiButton — sizes</SubHeading>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <ThaiButton size="md">Medium</ThaiButton>
            <ThaiButton size="lg">Large</ThaiButton>
          </div>

          <SubHeading>StickerButton — hover to lift, press to sink (cva variants)</SubHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
            <StickerButton variant="pink">Pink</StickerButton>
            <StickerButton variant="yellow">Yellow</StickerButton>
            <StickerButton variant="cyan">Cyan</StickerButton>
            <StickerButton variant="green">Green</StickerButton>
            <StickerButton variant="red">Red</StickerButton>
            <StickerButton variant="outline">Outline</StickerButton>
          </div>

          <SubHeading>ThaiTag</SubHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 24 }}>
            <ThaiTag price="฿590" color="yellow">
              Early bird
            </ThaiTag>
            <ThaiTag price="฿890" color="pink">
              Regular
            </ThaiTag>
            <ThaiTag price="฿1,290" color="cyan">
              VIP
            </ThaiTag>
            <ThaiTag price="Sold out" color="red" />
            <ThaiTag price="Free" color="white" />
          </div>

          <SubHeading>ImageSlot</SubHeading>
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 160, height: 120 }}>
              <ImageSlot placeholder="rect 4:3" />
            </div>
            <div style={{ width: 120, height: 120 }}>
              <ImageSlot placeholder="circle" shape="circle" />
            </div>
          </div>

          <SubHeading>VolunteersRoster (stateful — click a team to drill in)</SubHeading>
          <div style={{ maxWidth: 400, marginBottom: 24 }}>
            <VolunteersRoster />
          </div>
        </Section>

        {/* ═══════ Card audit ═══════ */}
        <Section
          id="cards"
          title="Card audit"
          subtitle="Unified card style applied across Gallery, Speakers, Volunteers and Sponsors (TED Club excluded — it keeps its own radius-md / shadow-ink system). Rule: 2.5px ink border, 14px radius, 3px/4px hard offset shadow — ink-colored on light cards, paper-colored on dark cards, no hover state."
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: 220,
                  height: 140,
                  background: "#FFFDF7",
                  border: "2.5px solid #111D45",
                  borderRadius: 14,
                  boxShadow: CARD_SHADOW,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12.5,
                  fontFamily: "monospace",
                  textAlign: "center",
                  padding: 12,
                }}
              >
                light card
                <br />
                shadow: rgba(17,29,69,.9)
              </div>
              <span style={{ fontSize: 11.5, fontFamily: "monospace", opacity: 0.7 }}>
                gallery · speakers · sponsors
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: 220,
                  height: 140,
                  background: "#233064",
                  border: "2.5px solid #FFFDF7",
                  borderRadius: 14,
                  boxShadow: "3px 4px 0 rgba(255,253,247,.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12.5,
                  fontFamily: "monospace",
                  color: "#FFFDF7",
                  textAlign: "center",
                  padding: 12,
                }}
              >
                dark card
                <br />
                shadow: rgba(255,253,247,.9)
              </div>
              <span style={{ fontSize: 11.5, fontFamily: "monospace", opacity: 0.7 }}>
                volunteers image box
              </span>
            </div>
          </div>
        </Section>

        {/* ═══════ Interaction states ═══════ */}
        <Section
          id="states"
          title="Interaction states"
          subtitle="Documented per component. Cards are intentionally static (no hover) per the card audit; buttons and controls use hard-shadow lift/press."
        >
          <SubHeading>StickerButton (real hover/press — try it)</SubHeading>
          <p style={{ fontSize: 12.5, marginBottom: 12, opacity: 0.7 }}>
            default → hover (lifts, shadow grows) → active (sinks, shadow shrinks) → focus-visible (cyan ring)
          </p>
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            <StickerButton variant="pink">Hover / click me</StickerButton>
          </div>

          <SubHeading>Static state reference</SubHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
            <StateChip
              label="default"
              style={{ background: "#EF4899", color: "#fff", boxShadow: "2px 3px 0 rgba(17,29,69,.9)" }}
            />
            <StateChip
              label="hover"
              style={{
                background: "#EF4899",
                color: "#fff",
                boxShadow: "5px 6px 0 rgba(17,29,69,.9)",
                transform: "translate(-2px,-2px)",
              }}
            />
            <StateChip
              label="active"
              style={{
                background: "#EF4899",
                color: "#fff",
                boxShadow: "1px 1px 0 rgba(17,29,69,.9)",
                transform: "translate(1px,2px)",
              }}
            />
            <StateChip
              label="focus-visible"
              style={{
                background: "#EF4899",
                color: "#fff",
                boxShadow: "2px 3px 0 rgba(17,29,69,.9), 0 0 0 3px #02AFDA",
              }}
            />
            <StateChip
              label="disabled"
              style={{
                background: "var(--main-disabled-bg, #EBEBEB)",
                color: "var(--main-disabled-fg, #B3B3B3)",
                border: "2.5px solid #B3B3B3",
                boxShadow: "none",
                cursor: "not-allowed",
              }}
            />
          </div>

          <SubHeading>#clubmap control — hover / focus (real, try it)</SubHeading>
          <div id="club" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                background: "var(--color-club-paper)",
                border: "var(--bw-ink) solid var(--color-club-ink-900)",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-ink)",
                overflow: "hidden",
              }}
            >
              {["+", "⟳", "–"].map((s, i) => (
                <button
                  key={s}
                  type="button"
                  style={{
                    appearance: "none",
                    border: 0,
                    borderTop: i > 0 ? "var(--bw-ink) solid var(--color-club-ink-900)" : undefined,
                    background: "none",
                    width: 44,
                    height: 44,
                    color: "var(--color-club-ink-900)",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 140ms var(--ease-ink)",
                  }}
                  className="dsx-clubctl"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <SubHeading>Checkbox-style toggle (demonstrates on/off, not part of a kit — for reference only)</SubHeading>
          <button
            type="button"
            onClick={() => setChecked((c) => !c)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              border: "2.5px solid #111D45",
              borderRadius: 12,
              background: checked ? "#00A14B" : "#FFFDF7",
              color: checked ? "#fff" : "#111D45",
              boxShadow: "2px 3px 0 rgba(17,29,69,.9)",
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {checked ? "On" : "Off"}
          </button>
        </Section>

        <div style={{ height: 64 }} />
      </div>

      <style jsx global>{`
        .dsx-clubctl:hover {
          color: var(--color-club-red) !important;
        }
        .dsx-clubctl:focus-visible {
          outline: 2px solid var(--t-focus);
          outline-offset: -2px;
        }
      `}</style>
    </div>
  );
}
