"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite marquee — Synchronized / Basement strip energy.
 */
export function Marquee({
  items,
  speed = 40,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let x = 0;
    const step = () => {
      x -= speed / 60;
      const w = el.scrollWidth / 2;
      if (Math.abs(x) >= w) x = 0;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-charcoal/10 ${className}`}>
      <div ref={track} className="flex w-max will-change-transform py-4 md:py-5">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-6 font-display text-sm md:text-base tracking-[0.28em] uppercase text-charcoal/55"
          >
            {item}
            <span className="text-nude">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
