"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandElementsRow } from "@/components/brand/BrandElements";
import { TextReveal } from "@/components/motion/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement({
  headline = "More Than Marketing. A Smarter Way Forward.",
  copy = "We bring strategy, creativity, technology and execution under one roof — turning ambitious ideas into meaningful brand experiences.",
  keywords = [],
}: {
  headline?: string;
  copy?: string;
  keywords?: string[];
}) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".bs-panel", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <p className="eyebrow mb-8">The UNKNOWN way</p>
        <TextReveal className="font-display max-w-5xl text-[clamp(2.6rem,7vw,6rem)] leading-display">
          {headline}
        </TextReveal>

        <div className="bs-panel mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="font-elegant max-w-xl text-2xl md:text-3xl leading-relaxed text-charcoal/70">
            {copy}
          </p>
          <div className="flex flex-wrap content-start gap-x-5 gap-y-3 self-end border-t border-charcoal/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            {keywords.map((k) => (
              <span
                key={k}
                className="text-[11px] tracking-[0.22em] uppercase text-charcoal/40"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        <div className="bs-panel mt-24 border-t border-charcoal/10 pt-16">
          <BrandElementsRow />
        </div>
      </div>
    </section>
  );
}
