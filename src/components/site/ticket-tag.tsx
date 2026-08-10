import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Ticket-shaped tag with punched-out circular notches on either side.
 * Ported from the Thaigredient DS `.txby-tag`.
 */
const ticketTag = cva(
  "relative inline-flex flex-col items-center justify-center border-card border-line-strong rounded-md px-4.5 py-2 font-heading shadow-control",
  {
    variants: {
      tone: {
        pink: "bg-tg-pink text-white",
        cyan: "bg-tg-cyan text-white",
        red: "bg-tg-red text-white",
        yellow: "bg-tg-yellow text-foreground",
        paper: "bg-surface-card text-foreground",
      },
    },
    defaultVariants: { tone: "yellow" },
  }
);

const notch =
  "absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-card border-line-strong bg-surface-card";

export function TicketTag({
  price,
  tone,
  className,
  children,
}: {
  price: string;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof ticketTag>) {
  return (
    <span className={cn(ticketTag({ tone }), className)}>
      <span aria-hidden className={cn(notch, "-left-1.75")} />
      <span aria-hidden className={cn(notch, "-right-1.75")} />
      <b className="text-xl leading-none">{price}</b>
      {children ? (
        <span className="text-[10px] tracking-wider uppercase opacity-85">
          {children}
        </span>
      ) : null}
    </span>
  );
}
