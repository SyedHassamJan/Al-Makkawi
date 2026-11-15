"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import poster from "@/public/images/mecca-hero-poster.jpg";

// Two clips of the Kaaba, played back to back with a crossfade.
const CLIPS = [
  { desktop: "/videos/mecca-hero-1.mp4", mobile: "/videos/mecca-hero-1-mobile.mp4" },
  { desktop: "/videos/mecca-hero-2.mp4", mobile: "/videos/mecca-hero-2-mobile.mp4" },
];
const FADE_S = 1.2;

const REDUCED = "(prefers-reduced-motion: reduce)";
const PHONE = "(max-width: 767px)";
type Mode = "poster" | "desktop" | "mobile";

function subscribe(cb: () => void) {
  const queries = [matchMedia(REDUCED), matchMedia(PHONE)];
  queries.forEach((q) => q.addEventListener("change", cb));
  return () => queries.forEach((q) => q.removeEventListener("change", cb));
}
// Visitors with Data Saver on, or on a 2G link, only get the poster.
const saveData = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || c.effectiveType === "2g" || c.effectiveType === "slow-2g");
};
const getMode = (): Mode =>
  matchMedia(REDUCED).matches || saveData() ? "poster" : matchMedia(PHONE).matches ? "mobile" : "desktop";

export default function HeroVideo() {
  // The server (and reduced-motion visitors) only ever get the poster.
  const mode = useSyncExternalStore(subscribe, getMode, () => "poster" as Mode);
  const wrap = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (mode === "poster" || failed) return;
    const [a, b] = vids.current;
    const el = wrap.current;
    if (!a || !b || !el) return;

    let inView = true;
    activeRef.current = 0;

    const play = (v: HTMLVideoElement) =>
      v.play().then(
        () => setPlaying(true),
        () => {}, // Autoplay blocked (e.g. low-power mode): the poster stays.
      );

    const crossfade = () => {
      const next = 1 - activeRef.current;
      const v = vids.current[next];
      if (!v) return;
      v.currentTime = 0;
      activeRef.current = next;
      setActive(next);
      if (inView) play(v);
    };

    // Start the next clip FADE_S before the current one ends, so the
    // outgoing clip is still moving while the incoming one fades in.
    const onTime = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (vids.current.indexOf(v) !== activeRef.current || !v.duration) return;
      if (v.duration - v.currentTime <= FADE_S) crossfade();
    };
    // Fallback in case timeupdate fired too late to catch the window.
    const onEnded = (e: Event) => {
      if (vids.current.indexOf(e.currentTarget as HTMLVideoElement) === activeRef.current) crossfade();
    };

    for (const v of [a, b]) {
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("ended", onEnded);
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      const v = vids.current[activeRef.current];
      if (!v) return;
      if (inView) play(v);
      else v.pause();
    });
    io.observe(el);

    play(a);

    return () => {
      io.disconnect();
      for (const v of [a, b]) {
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("ended", onEnded);
        v.pause();
      }
    };
  }, [mode, failed]);

  const showVideo = mode !== "poster" && !failed;

  return (
    <div ref={wrap} className="absolute inset-0 -z-10 overflow-hidden bg-field-2" aria-hidden="true">
      <Image
        src={poster}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      {showVideo &&
        CLIPS.map((clip, i) => (
          <video
            key={`${mode}-${i}`}
            ref={(el) => {
              vids.current[i] = el;
            }}
            src={clip[mode as "desktop" | "mobile"]}
            muted
            playsInline
            // Only the first clip loads up front; the second waits until the
            // first is playing so it never competes with it (or the LCP poster).
            preload={i === 0 || playing ? "auto" : "none"}
            poster={poster.src}
            disablePictureInPicture
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              transitionDuration: `${FADE_S * 1000}ms`,
              opacity: playing && active === i ? 1 : 0,
            }}
          />
        ))}
    </div>
  );
}
