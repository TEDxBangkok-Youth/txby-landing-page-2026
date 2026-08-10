import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { footerLinks, social } from "@/lib/site-data";

/** Main-CI footer on an inverted (black) surface. */
export function SiteFooter() {
  return (
    <footer
      data-theme="main"
      data-surface="inverse"
      className="bg-surface px-8 pt-16 pb-8 font-body text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-10">
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/logos/tedxbangkokyouth-lockup-white.png"
            alt="TEDxBangkok Youth"
            width={259}
            height={40}
            className="h-10 w-auto self-start object-contain"
          />
          <p className="max-w-80 text-caption leading-[1.6] text-foreground-muted">
            This independent TEDx event is operated under license from TED.
          </p>
        </div>

        <div className="flex flex-wrap gap-14">
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-2.5">
              <span className="text-micro tracking-caps uppercase text-foreground-muted">
                {group.title}
              </span>
              {group.items.map((it) => (
                <a key={it} href="#" className="text-sm leading-normal text-foreground">
                  {it}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <Separator className="bg-line-subtle" />
        <div className="flex flex-wrap justify-between gap-4 pt-5 text-xs leading-normal text-foreground-faint">
          <span>© 2026 TEDxBangkok Youth</span>
          <div className="flex gap-4">
            {social.map((s) => (
              <a key={s} href="#" className="text-foreground-faint">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
