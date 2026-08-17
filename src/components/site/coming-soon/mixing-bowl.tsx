import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The mixing bowl, centred at the foot of the Coming Soon stage.
 *
 * The same art as the landing page's hero bowl
 * (`thaigredient/bowl-mix-hero.png`), deliberately: this screen is the
 * teaser for that page, and the bowl is the thing a returning visitor
 * recognises. It is a wider, flatter bowl than the rooster one — the ratio
 * below is its own, not a crop.
 *
 * Because it is the centrepiece here, it is kept out of the ingredient
 * walls; the rooster bowl took its place there. Art that is both the focal
 * point and a wall tile stops reading as either.
 *
 * Decorative: `aria-hidden` and an empty alt. What it says, the headline
 * says in words, and a screen reader is better off with the `<h1>` alone
 * than with a described picture of a bowl. (The landing page gives the same
 * art a real alt, because there it is the hero rather than a flourish under
 * one.)
 *
 * The bowl is the last thing in a column that has to fit the viewport, so
 * its real constraint is the stage's HEIGHT — give it a width alone and a
 * short window pushes the bowl down through the tagline band. But it is
 * sized by width anyway, with height left to the aspect ratio, because
 * setting both a height and a `max-width` does not shrink a box
 * proportionally: the height stays put and the width alone is clamped, and
 * the bowl comes out visibly squashed on a narrow screen.
 *
 * So the height limit is converted into a width instead. `51cqh` is
 * `27cqh × 2557/1352` — the same vertical bound, expressed on the axis that
 * can carry it alongside the other two caps: `100%` keeps the bowl clear of
 * the walls on a tall narrow window, and 480px is its ceiling. That
 * conversion is tied to the ratio, so swapping the art means recomputing
 * it; the old rooster bowl was `44cqh` for the same 27cqh of height.
 */
export function MixingBowl() {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[2557/1352] h-auto w-[min(100%,51cqh,480px)]",
        "shrink-0"
      )}
    >
      <Image
        src="/assets/thaigredient/bowl-mix-hero.png"
        alt=""
        width={2557}
        height={1352}
        // The largest image above the fold, and this screen is exactly one
        // viewport tall, so it is the page's LCP element at every size —
        // which is the one case the docs say `preload` is for. Everything
        // else here stays lazy or eager rather than racing it with a second
        // preload link.
        preload
        sizes="(min-width: 860px) 30vw, 55vw"
        className="block size-full"
      />
    </div>
  );
}
