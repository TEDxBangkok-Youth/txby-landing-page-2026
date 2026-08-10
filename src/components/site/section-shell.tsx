import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The section chrome repeated across the landing page: full-bleed
 * coloured field, paper-grain overlay, ink rule, and a centred
 * max-w-7xl column. `surface` picks the field and the text colours
 * that read on it.
 */
const sectionShell = cva("relative font-body", {
  variants: {
    surface: {
      paper: "bg-surface text-foreground",
      brand: "bg-brand text-foreground-inverse",
      ink: "bg-surface-inverse text-foreground-inverse",
      /* Defers entirely to the section's own [data-theme] scope. */
      theme: "bg-surface text-foreground",
    },
    rule: {
      bottom: "border-b-rule border-line-strong",
      both: "border-t-marker border-b-marker border-line-strong",
      none: "",
    },
  },
  defaultVariants: { surface: "paper", rule: "bottom" },
});

export function SectionShell({
  id,
  surface,
  rule,
  grain = false,
  decoration,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> &
  VariantProps<typeof sectionShell> & {
    grain?: boolean;
    /** Bleed art positioned against the section, outside the column. */
    decoration?: React.ReactNode;
  }) {
  return (
    <section
      id={id}
      className={cn(
        sectionShell({ surface, rule }),
        grain && "grain-overlay",
        "px-8 py-26",
        className
      )}
      {...props}
    >
      {decoration}
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

const sectionLead = cva("mt-4.5 text-pretty", {
  variants: {
    surface: {
      paper: "text-foreground-secondary",
      /* Deep plum is the only body colour with enough contrast on
         the pink field. */
      brand: "text-tg-plum",
      ink: "text-foreground-faint",
      theme: "text-foreground-secondary",
    },
  },
  defaultVariants: { surface: "paper" },
});

export function SectionHeader({
  title,
  lead,
  aside,
  surface,
  align = "end",
  size = "h1",
  leadSize = "lg",
  measure,
  leadMeasure,
  className,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
  align?: "end" | "start";
  size?: "h1" | "h3";
  leadSize?: "lg" | "body-lg";
  /** Width of the whole text block. A layout measure, not a token. */
  measure?: string;
  /** Width of the lead paragraph. */
  leadMeasure?: string;
  className?: string;
} & VariantProps<typeof sectionLead>) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-between gap-10",
        align === "end" ? "items-end" : "items-start",
        className
      )}
    >
      <div className={measure}>
        <h2
          className={cn(
            "font-heading font-bold",
            size === "h1" ? "text-h1 uppercase" : "text-h3"
          )}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className={cn(
              sectionLead({ surface }),
              leadSize === "lg" ? "text-lg leading-normal" : "text-lg",
              leadMeasure
            )}
          >
            {lead}
          </p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}
