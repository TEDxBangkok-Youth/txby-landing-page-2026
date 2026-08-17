import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The rooster mixing bowl, centred at the foot of the Coming Soon stage.
 *
 * Decorative: `aria-hidden` and an empty alt. What it says, the headline
 * says in words, and a screen reader is better off with the `<h1>` alone
 * than with a described picture of a bowl.
 *
 * The bowl is the last thing in a column that has to fit the viewport, so
 * its real constraint is the stage's HEIGHT — give it a width alone and a
 * short window pushes the bowl down through the tagline band. But it is
 * sized by width anyway, with height left to the aspect ratio, because
 * setting both a height and a `max-width` does not shrink a box
 * proportionally: the height stays put and the width alone is clamped, and
 * the bowl comes out visibly squashed on a narrow screen.
 *
 * So the height limit is converted into a width instead. `44cqh` is
 * `27cqh × 520/319` — the same vertical bound, expressed on the axis that
 * can carry it alongside the other two caps: `100%` keeps the bowl out of
 * the walls on a tall narrow window, and 430px is the design's own
 * maximum.
 */
export function MixingBowl() {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[520/319] h-auto w-[min(100%,44cqh,430px)]",
        "shrink-0"
      )}
    >
      <Image
        src="/assets/thaigredient/bowl-rooster.png"
        alt=""
        width={520}
        height={319}
        priority
        sizes="(min-width: 860px) 30vw, 50vw"
        className="block size-full"
      />
    </div>
  );
}
