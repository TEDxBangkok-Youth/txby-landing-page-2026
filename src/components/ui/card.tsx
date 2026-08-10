import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The `sticker` variant takes its border width, radius and offset
 * shadow from the active [data-theme] scope, so the same card is a
 * 2.5px navy-shadowed Thaigredient panel in one section and a 1.5px
 * black-shadowed TED Club panel in the next.
 */
const cardVariants = cva(
  "group/card flex flex-col overflow-hidden text-sm [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]",
  {
    variants: {
      variant: {
        default:
          "gap-(--card-spacing) rounded-xl bg-card py-(--card-spacing) text-card-foreground ring-1 ring-foreground/10 [--card-radius:var(--radius-xl)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        sticker:
          "border-card border-line-strong rounded-card bg-surface-card text-foreground shadow-card [--card-radius:var(--t-radius-card)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-size={size}
      className={cn(
        cardVariants({ variant }),
        "*:[img:first-child]:rounded-t-(--card-radius) *:[img:last-child]:rounded-b-(--card-radius)",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-(--card-radius) px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm group-data-[variant=sticker]/card:font-heading group-data-[variant=sticker]/card:font-bold",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-(--card-radius) border-t bg-muted/50 p-(--card-spacing) group-data-[variant=sticker]/card:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
