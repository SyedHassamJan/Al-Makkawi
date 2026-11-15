"use client";

import { useEffect } from "react";

// One observer for the whole page: adds `is-shown` to every `.reveal`
// element the first time it scrolls into view. The hidden state lives in
// CSS behind prefers-reduced-motion, so reduced-motion visitors and
// visitors without JavaScript always see everything.
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-shown)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-shown"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-shown");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
