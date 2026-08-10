import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Every structural trait here comes from the active [data-theme]
 * scope, so one Button renders as a chunky Thaigredient sticker, a
 * TED Club ink control or a flat main-CI button without the
 * component knowing which section it sits in. See
 * src/styles/themes/ for what each scope sets.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-heading control-type border-control border-line-strong rounded-control shadow-control select-none transition-[transform,box-shadow,background-color,color] duration-140 ease-ink hover:translate-x-(--t-lift-x) hover:translate-y-(--t-lift-y) hover:shadow-control-hover active:translate-x-(--t-press-x) active:translate-y-(--t-press-y) active:shadow-control-press focus-visible:ring-focus focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-brand text-brand-foreground hover:bg-brand-hover active:bg-brand-press",
        outline: "bg-surface-card text-foreground hover:bg-surface-raised",
        secondary: "bg-surface-raised text-foreground hover:bg-surface-wash",
        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:bg-surface-wash hover:shadow-none active:shadow-none",
        link: "border-transparent bg-transparent text-link shadow-none underline-offset-4 hover:text-link-hover hover:underline hover:shadow-none active:shadow-none",
        destructive: "bg-destructive text-brand-foreground",
        /* Thaigredient's playful accent set. These read as brand
           colors rather than semantic roles, so they are only
           meaningful inside the Thaigredient scope. */
        yellow: "bg-tg-yellow text-tg-ink",
        cyan: "bg-tg-cyan text-white",
        green: "bg-tg-green text-white",
        red: "bg-tg-red text-white",
      },
      size: {
        sm: "px-3.5 py-2 text-caption",
        default: "px-5 py-2.5 text-body-sm",
        lg: "px-7 py-3.5 text-lg",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
