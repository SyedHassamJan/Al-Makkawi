"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import blueMosque from "@/public/images/blue-mosque.jpg";
import alhambra from "@/public/images/alhambra-castle.jpg";
import egypt from "@/public/images/egypt-cairo-mosque.jpg";
import mostar from "@/public/images/bosnia-mostar.jpg";
import dubai from "@/public/images/burj-khalifa-dubai.jpg";
import morocco from "@/public/images/morocco-hassan-ii-mosque.jpg";

type Tour = {
  name: string;
  arabic: string;
  places: string;
  photo: StaticImageData | null; // null = no photo yet, tinted placeholder
  alt: string;
  focus?: string; // object-position for the card crop
};

const tours: Tour[] = [
  { name: "Turkey", arabic: "تركيا", places: "Istanbul", photo: blueMosque, alt: "Courtyard of the Blue Mosque in Istanbul" },
  { name: "Spain", arabic: "إسبانيا", places: "Granada and Córdoba", photo: alhambra, alt: "The Alcazaba of the Alhambra in Granada" },
  { name: "Egypt", arabic: "مصر", places: "Cairo", photo: egypt, alt: "Minarets of a historic mosque in Cairo", focus: "50% 70%" },
  { name: "Morocco", arabic: "المغرب", places: "Fez and Marrakesh", photo: morocco, alt: "The minaret of the Hassan II Mosque in Casablanca", focus: "50% 30%" },
  { name: "Dubai", arabic: "دبي", places: "City breaks and stopovers", photo: dubai, alt: "The Burj Khalifa framed by palm trees" },
  { name: "Bosnia", arabic: "البوسنة", places: "Sarajevo and Mostar", photo: mostar, alt: "Stari Most bridge over the Neretva in Mostar" },
];

export default function ToursSection() {
  const [active, setActive] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);

  // On touch screens there is no hover, so follow the card nearest the
  // middle of the screen while scrolling through the list.
  useEffect(() => {
    const list = grid.current;
    const sec = section.current;
    if (!list || !sec || !matchMedia("(hover: none)").matches) return;

    const cards = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.tour ?? null);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    list.querySelectorAll<HTMLElement>("[data-tour]").forEach((el) => cards.observe(el));

    const leave = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) setActive(null);
    });
    leave.observe(sec);

    return () => {
      cards.disconnect();
      leave.disconnect();
    };
  }, []);

  const current = tours.find((t) => t.name === active);

  return (
    <section
      ref={section}
      id="tours"
      aria-labelledby="tours-title"
      className="on-field-deep relative isolate overflow-hidden py-24 sm:py-36"
    >
      {/* Section background: every layer is in the page from the start, so a swap is instant. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {tours.map((t) => (
          <div
            key={t.name}
            data-active={active === t.name}
            className="tour-layer absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: active === t.name ? 1 : 0 }}
          >
            {t.photo ? (
              <Image src={t.photo} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
            ) : (
              <div className="photo-placeholder h-full w-full" />
            )}
          </div>
        ))}
        <div className="band-scrim absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <h2 id="tours-title" className="text-section">
            Islamic heritage tours
          </h2>
          <p className="mt-6 max-w-sm text-lead text-on-field-2">
            Many can be combined with Umrah or a visit to Al-Aqsa.
          </p>
          <p className="mt-10 min-h-6 text-sm text-on-field-2" aria-live="polite">
            {current ? (current.photo ? current.alt : `${current.name}: photo to follow`) : ""}
          </p>
          <p className="mt-3 inline-block rounded-full border border-dashed border-on-field-2 px-3 py-1 text-sm text-on-field-2">
            Sample copy: the cities listed are placeholders until confirmed
          </p>
        </div>

        <ul
          ref={grid}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onMouseLeave={() => setActive(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
          }}
        >
          {tours.map((t, i) => (
            <li
              key={t.name}
              data-tour={t.name}
              className="reveal"
              style={{ "--i": i % 2 } as React.CSSProperties}
              onMouseEnter={() => setActive(t.name)}
              onFocus={() => setActive(t.name)}
              onClick={() => setActive(t.name)}
            >
              <a
                href="#contact"
                aria-label={`Enquire about a heritage tour to ${t.name}`}
                className={`card-shade relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-card border-2 p-6 transition-colors duration-300 ${
                  active === t.name ? "border-accent" : "border-transparent"
                }`}
              >
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={t.focus ? { objectPosition: t.focus } : undefined}
                    />
                  ) : (
                    <div className="photo-placeholder flex h-full w-full items-start justify-end px-6 pt-8">
                      <span lang="ar" dir="rtl" className="font-outlier text-4xl leading-normal text-accent-soft">
                        {t.arabic}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-title">{t.name}</h3>
                <p className="mt-1 text-sm text-on-field-2">{t.places}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
