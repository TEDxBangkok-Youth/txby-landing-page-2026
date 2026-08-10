"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type ImageSlotProps = {
  placeholder?: string;
  shape?: "rect" | "circle";
  fit?: "cover" | "contain";
  className?: string;
};

/**
 * Placeholder image drop-zone, ported from the design's `<image-slot>`
 * web component. Renders a dashed frame with a caption until a real
 * asset is wired in. `placeholder` is optional and falls back to the
 * generic `common.imagePlaceholder` message — this is a client component
 * (rather than requiring every caller to pass the translation down) so
 * server components can render it directly without doing that lookup
 * themselves.
 */
export function ImageSlot({
  placeholder,
  shape = "rect",
  className,
}: ImageSlotProps) {
  const t = useTranslations("common");
  const label = placeholder ?? t("imagePlaceholder");

  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-surface-sunken text-center",
        shape === "circle" ? "rounded-full" : "rounded-sm",
        className
      )}
    >
      <span className="flex flex-col items-center gap-1 px-2 font-body text-xs font-medium leading-tight text-foreground-on-sunken/45">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        {label}
      </span>
    </div>
  );
}
