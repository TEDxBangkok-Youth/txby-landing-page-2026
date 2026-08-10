"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteNav, SiteNavLogo } from "@/components/site/site-nav";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site-data";

/**
 * Fixed nav over the yellow hero. A white sheet fades in once the page
 * is scrolled. Shares its bar with the event pages — see SiteNav — and
 * adds the two things only this page needs: the scroll state and the
 * mobile sheet.
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
    <SiteNav
      className="fixed inset-x-0 top-0 z-50"
      links={navLinks}
      brand={<SiteNavLogo href="#hero" />}
      backdrop={
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 border-b border-line bg-surface-card transition-opacity duration-140",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
      }
      actions={
        <>
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
              <SheetTitle className="px-6 pt-6 font-heading text-xl leading-heading">
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
        </>
      }
    />
  );
}
