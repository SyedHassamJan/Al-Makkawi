"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="on-field fixed inset-x-0 top-0 z-50 bg-transparent">
      {/* The solid bar fades in under the content rather than animating the header itself. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-field-2 transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden="true"
        className={`header-scrim absolute inset-x-0 top-0 -z-20 h-36 transition-opacity duration-300 ${solid ? "opacity-0" : "opacity-100"}`}
      />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" aria-label={`${site.name}, home`}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium whitespace-nowrap text-on-field-2 transition-colors hover:text-accent-soft"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={site.phoneHref} className="text-sm font-semibold whitespace-nowrap hover:text-accent-soft">
            {site.phone}
          </a>
          <a href="#contact" className="btn-primary min-h-11 px-5 text-sm">
            Register interest
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-on-field-2 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`absolute h-0.5 w-5 bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-0.5 w-5 bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto bg-field-2 xl:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 pt-2 pb-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-on-field-rule py-4 font-display text-2xl"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-6">
            Register interest
          </a>
          <a href={site.phoneHref} className="mt-4 text-center text-sm text-on-field-2">
            Call {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
