"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site-data";

/**
 * Fixed nav over the yellow hero. A white sheet fades in once the page
 * is scrolled. Runs on the main CI scope, not the seasonal skin.
 */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-theme="main" className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 border-b border-line bg-surface-card transition-opacity duration-140",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <nav className="relative flex items-center justify-between px-8 py-5 font-body">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
          <a href="#hero" className="inline-flex">
            <Image
              src="/assets/logos/tedxbangkokyouth-lockup-red.png"
              alt="TEDxBangkok Youth"
              width={220}
              height={34}
              className="block h-8.5 w-auto"
            />
          </a>

          <div className="flex items-center gap-7">
            <ul className="hidden gap-6.5 md:flex">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm leading-normal font-medium text-foreground hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <Button asChild className="text-sm leading-normal">
              <a href="#tickets">ซื้อบัตรเข้าชม</a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon-sm" aria-label="เปิดเมนู">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" data-theme="main" className="w-72">
                <SheetTitle className="px-6 pt-6 font-heading text-title-sm">
                  เมนู
                </SheetTitle>
                <ul className="flex flex-col px-6 py-4">
                  {navLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-line-subtle py-3 text-base font-medium text-foreground hover:text-brand"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
