import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * `.txby-btn` — the chunky sticker button from the TEDxBangkok Youth
 * design system. Hard offset shadow that lifts on hover and presses on active.
 */
const stickerButton = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold uppercase tracking-[0.02em] " +
    "border-[2.5px] border-ink rounded-[14px] cursor-pointer no-underline " +
    "shadow-[2px_3px_0_rgba(17,29,69,0.9)] transition-[transform,box-shadow] duration-[120ms] ease-out " +
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_6px_0_rgba(17,29,69,0.9)] " +
    "active:translate-x-px active:translate-y-0.5 active:shadow-[1px_1px_0_rgba(17,29,69,0.9)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        pink: "bg-pink text-white",
        yellow: "bg-yellow text-ink",
        cyan: "bg-cyan text-white",
        green: "bg-green text-white",
        red: "bg-red text-white",
        outline: "bg-paper text-ink",
      },
      size: {
        md: "px-5 py-2.5 text-[15px]",
        lg: "px-7 py-3.5 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
    },
  }
);

type StickerButtonProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof stickerButton> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function StickerButton({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: StickerButtonProps) {
  const classes = cn(stickerButton({ variant, size }), className);

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
