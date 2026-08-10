"use client";

import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageSlot } from "@/components/site/image-slot";
import { TicketTag } from "@/components/site/ticket-tag";
import { VolunteersRoster } from "@/components/site/volunteers-roster";
import {
  BORDER_WIDTHS,
  COLOR_ROLES,
  INHERITED_FROM_TAILWIND,
  PRIMITIVE_RAMPS,
  RADIUS_SCALE,
  SHADOW_GEOMETRY,
  STRUCTURE_ROLES,
  THEMES,
  TYPE_SCALE,
  type ThemeId,
} from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

/**
 * Internal reference for the three coexisting design systems.
 * Values are read live out of the cascade rather than restated here,
 * so this page cannot drift from src/styles/*.css. Not linked from
 * the public nav — visit /design-system directly.
 */
export default function DesignSystemPage() {
  const [theme, setTheme] = useState<ThemeId>("thaigredient");
  const active = THEMES.find((t) => t.id === theme)!;

  return (
    <div className="min-h-dvh bg-surface px-8 py-16 font-body text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        <h1 className="font-heading text-h2 font-bold uppercase">
          Design system
        </h1>
        <p className="max-w-[640px] text-lg text-foreground-secondary">
          Three systems share one token vocabulary. Each is a{" "}
          <Code>[data-theme]</Code> scope that reassigns the same semantic
          roles; everything else — spacing, type scale, radius, borders,
          shadows, motion — is global.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {THEMES.map((t) => (
            <Button
              key={t.id}
              variant={t.id === theme ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme(t.id)}
            >
              {t.label}
            </Button>
          ))}
          <span className="text-caption text-foreground-muted">
            {active.note}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        <Section
          title="Semantic roles"
          lead="The only things a theme scope owns: colour roles and font families. Swatches show the live value in the selected scope."
        >
          <ThemedProbe theme={theme} />
        </Section>

        <Section
          title="Structure"
          lead="Radius, border width and shadow are global scales; each theme only aliases into them. That is what keeps one Button correct in all three sections."
        >
          <StructureTable theme={theme} />
        </Section>

        <Section
          title="Primitives"
          lead="Raw brand ramps, namespaced so they cannot collide with Tailwind's own. Nothing in the markup references these directly."
        >
          {PRIMITIVE_RAMPS.map((ramp) => (
            <div key={ramp.group} className="mb-8">
              <SubHeading>{ramp.group}</SubHeading>
              <div className="flex flex-wrap gap-3">
                {ramp.tokens.map((t) => (
                  <Swatch key={t} varName={`--color-${t}`} label={t} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section
          title="Type scale"
          lead="Custom steps exist only where Tailwind v4 has no equivalent — the fluid display sizes and the 11/13/15/17/19/21/26/32px steps."
        >
          <ScaleTable
            rows={TYPE_SCALE.map((t) => ({
              name: `text-${t.token}`,
              varName: `--text-${t.token}`,
              custom: t.custom,
            }))}
          />
        </Section>

        <Section
          title="Radius, borders and shadows"
          lead="Shadow geometry is global and the tint is themed, so one token reads navy on Thaigredient, black on Club and paper on an inverse surface. A Tailwind built-in shows as “not emitted” until some utility in the codebase actually uses it — the design system's own tokens are declared @theme static, so they are always present."
        >
          <SubHeading>Radius</SubHeading>
          <ScaleTable
            rows={RADIUS_SCALE.map((r) => ({
              name: `rounded-${r.token}`,
              varName: `--radius-${r.token}`,
              custom: r.custom,
            }))}
          />
          <SubHeading>Border width</SubHeading>
          <ScaleTable
            rows={BORDER_WIDTHS.map((b) => ({
              name: `border-${b}`,
              varName: `--bw-${b}`,
              custom: true,
            }))}
          />
          <SubHeading>Shadow geometry</SubHeading>
          <ScaleTable
            rows={SHADOW_GEOMETRY.map((s) => ({
              name: s.replace("sh-", "shadow-"),
              varName: `--${s}`,
              custom: true,
            }))}
          />
        </Section>

        <Section
          title="Inherited from Tailwind"
          lead="Scales deliberately not redefined. Listed so the omission reads as a decision."
        >
          <div className="overflow-hidden rounded-md border-hairline border-line-subtle">
            {INHERITED_FROM_TAILWIND.map(([name, note], i) => (
              <div
                key={name}
                className={cn(
                  "flex flex-wrap gap-4 px-4 py-2.5 text-caption",
                  i % 2 ? "bg-surface" : "bg-surface-card"
                )}
              >
                <span className="w-32 shrink-0 font-medium">{name}</span>
                <span className="text-foreground-secondary">{note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Components"
          lead="Rendered inside the selected scope — the same components, restyled by the tokens alone."
        >
          <div data-theme={theme} className="flex flex-col gap-8 bg-surface p-6">
            <div>
              <SubHeading>Button — variants</SubHeading>
              <div className="flex flex-wrap gap-3.5">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="yellow">Yellow</Button>
                <Button variant="cyan">Cyan</Button>
                <Button variant="green">Green</Button>
                <Button variant="red">Red</Button>
              </div>
            </div>

            <div>
              <SubHeading>
                Button — sizes (hover to lift, press to sink)
              </SubHeading>
              <div className="flex flex-wrap items-center gap-3.5">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <SubHeading>Card</SubHeading>
              <div className="flex flex-wrap gap-4">
                <Card variant="sticker" className="w-64">
                  <CardContent className="py-4">
                    <div className="font-heading font-bold uppercase">
                      Sticker card
                    </div>
                    <p className="mt-1 text-caption text-foreground-muted">
                      Border, radius and shadow all come from the scope.
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-64">
                  <CardContent>
                    <div className="font-medium">Default card</div>
                    <p className="mt-1 text-caption text-muted-foreground">
                      Stock shadcn treatment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <SubHeading>Badge</SubHeading>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SubHeading>TicketTag</SubHeading>
            <div className="flex flex-wrap gap-6">
              <TicketTag price="฿590" tone="yellow">
                Early bird
              </TicketTag>
              <TicketTag price="฿890" tone="pink">
                Regular
              </TicketTag>
              <TicketTag price="฿1,290" tone="cyan">
                VIP
              </TicketTag>
              <TicketTag price="Sold out" tone="red" />
              <TicketTag price="Free" tone="paper" />
            </div>
          </div>

          <div className="mt-8">
            <SubHeading>ImageSlot</SubHeading>
            <div className="flex gap-3.5">
              <div className="h-30 w-40">
                <ImageSlot placeholder="rect 4:3" />
              </div>
              <div className="size-30">
                <ImageSlot placeholder="circle" shape="circle" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SubHeading>VolunteersRoster — click a team to drill in</SubHeading>
            <div className="max-w-100">
              <VolunteersRoster />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ── Reading the live cascade ─────────────────────────────────── */

function readVars(el: Element, names: readonly string[]) {
  const cs = getComputedStyle(el);
  const out: Record<string, string> = {};
  for (const n of names) out[n] = cs.getPropertyValue(n).trim();
  return out;
}

const FONT_VARS = ["--t-font-heading", "--t-font-body", "--t-font-accent"];

function ThemedProbe({ theme }: { theme: ThemeId }) {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ref.current) setValues(readVars(ref.current, FONT_VARS));
  }, [theme]);

  return (
    <div ref={ref} data-theme={theme}>
      {COLOR_ROLES.map((group) => (
        <div key={group.group} className="mb-8">
          <SubHeading>{group.group}</SubHeading>
          <div className="flex flex-wrap gap-3">
            {group.tokens.map((t) => (
              <Swatch
                key={t}
                varName={`--t-${t}`}
                label={t}
                revision={theme}
              />
            ))}
          </div>
        </div>
      ))}

      <SubHeading>Fonts</SubHeading>
      <div className="overflow-hidden rounded-md border-hairline border-line-subtle">
        {(["heading", "body", "accent"] as const).map((f, i) => (
          <div
            key={f}
            className={cn(
              "flex flex-wrap items-baseline gap-4 px-4 py-3",
              i % 2 ? "bg-surface" : "bg-surface-card"
            )}
          >
            <Code className="w-40 shrink-0">--t-font-{f}</Code>
            <span
              className={cn(
                "text-lg",
                f === "heading" && "font-heading",
                f === "body" && "font-body",
                f === "accent" && "font-accent"
              )}
            >
              ส่วนผสมลับ Secret Thaigredient
            </span>
            <span className="text-micro text-foreground-muted">
              {values[`--t-font-${f}`]?.split(",")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const STRUCTURE_VARS = STRUCTURE_ROLES.map((r) => `--t-${r}`);

function StructureTable({ theme }: { theme: ThemeId }) {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ref.current) setValues(readVars(ref.current, STRUCTURE_VARS));
  }, [theme]);

  return (
    <div
      ref={ref}
      data-theme={theme}
      className="overflow-hidden rounded-md border-hairline border-line-subtle"
    >
      {STRUCTURE_ROLES.map((r, i) => (
        <div
          key={r}
          className={cn(
            "flex flex-wrap justify-between gap-4 px-4 py-2.5",
            i % 2 ? "bg-surface" : "bg-surface-card"
          )}
        >
          <Code>--t-{r}</Code>
          <Code className="text-foreground-muted">
            {values[`--t-${r}`] || "—"}
          </Code>
        </div>
      ))}
    </div>
  );
}

/* ── Presentation ─────────────────────────────────────────────── */

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t-hairline border-line-subtle py-14">
      <h2 className="font-heading text-title font-bold uppercase">{title}</h2>
      {lead ? (
        <p className="mt-1.5 mb-7 max-w-[640px] text-caption text-foreground-muted">
          {lead}
        </p>
      ) : null}
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-3.5 font-heading text-caption font-bold tracking-eyebrow uppercase text-foreground-secondary first:mt-0">
      {children}
    </h3>
  );
}

function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code className={cn("font-mono text-micro text-foreground", className)}>
      {children}
    </code>
  );
}

function Swatch({
  varName,
  label,
  revision,
}: {
  varName: string;
  label: string;
  /** Re-probe when the surrounding scope changes. */
  revision?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setResolved(getComputedStyle(el).getPropertyValue(varName).trim());
  }, [varName, revision]);

  return (
    <div ref={ref} className="flex w-33 flex-col gap-2">
      <div
        data-swatch={varName}
        className="h-16 rounded-md border-hairline border-line bg-(--swatch)"
        ref={(el) => {
          if (el) el.style.setProperty("--swatch", `var(${varName})`);
        }}
      />
      <div className="leading-tight">
        <Code>{label}</Code>
        <div className="font-mono text-micro text-foreground-muted">
          {resolved || "—"}
        </div>
      </div>
    </div>
  );
}

function ScaleTable({
  rows,
}: {
  rows: { name: string; varName: string; custom: boolean }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ref.current) {
      setValues(readVars(ref.current, rows.map((r) => r.varName)));
    }
    // rows is rebuilt each render from a module constant; its shape is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="mb-6 overflow-hidden rounded-md border-hairline border-line-subtle"
    >
      {rows.map((r, i) => (
        <div
          key={r.name}
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 px-4 py-2.5",
            i % 2 ? "bg-surface" : "bg-surface-card"
          )}
        >
          <span className="flex items-center gap-2">
            <Code>{r.name}</Code>
            {r.custom ? null : <Badge variant="outline">Tailwind</Badge>}
          </span>
          <Code className="text-foreground-muted">
            {values[r.varName] || "not emitted"}
          </Code>
        </div>
      ))}
    </div>
  );
}
