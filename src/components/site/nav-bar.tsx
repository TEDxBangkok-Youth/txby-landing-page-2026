"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-data";

/**
 * Fixed nav that sits over the yellow hero. A white "sheet" fades in once the
 * page is scrolled, matching the design's `navSheet` behaviour. Logo is red,
 * links are ink-black, CTA is TED red.
 */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

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
    <div
      data-ci="main"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--main-white)",
          borderBottom: "1px solid var(--main-border-light)",
          transition: "opacity 140ms ease",
          pointerEvents: "none",
          opacity: scrolled ? 1 : 0,
        }}
      />
      <nav
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          fontFamily: "var(--main-font-sans)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a href="#hero" style={{ display: "inline-flex" }}>
            <img
              src="/assets/logos/tedxbangkokyouth-lockup-red.png"
              alt="TEDxBangkok Youth"
              style={{ height: 34, width: "auto", display: "block" }}
            />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <ul
              className="hidden md:flex"
              style={{ gap: 26, listStyle: "none", margin: 0, padding: 0 }}
            >
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      color: "var(--main-black)",
                      fontSize: 14,
                      fontWeight: "var(--main-fw-medium)",
                      textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#tickets"
              style={{
                background: "var(--main-accent)",
                color: "var(--main-white)",
                border: "none",
                borderRadius: "var(--main-radius-md)",
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: "var(--main-fw-semibold)",
                fontFamily: "var(--main-font-sans)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              ซื้อบัตรเข้าชม
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
