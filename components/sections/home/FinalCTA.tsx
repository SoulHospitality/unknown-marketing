"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { Logo } from "@/components/ui/Logo";

gsap.registerPlugin(ScrollTrigger);

/**
 * Closing CTA — scale + mark return (Active Theory / Resn end beat).
 */
export function FinalCTA({
  headline = "Ready to turn your ideas into real results?",
  tagline = "Ideas Beyond the Obvious.",
  email = "hello@unknown.agency",
}: {
  headline?: string;
  tagline?: string;
  email?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-scale", {
        scale: 0.88,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-charcoal text-sand py-36 md:py-48 grain"
    >
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_30%_40%,#BF9990,transparent_45%)]" />
      <div className="cta-scale relative mx-auto max-w-[1500px] px-6 text-center md:px-10">
        <div className="mx-auto mb-10 flex justify-center opacity-90">
          <Logo variant="header" className="[&_img]:!h-24 [&_img]:!w-24 md:[&_img]:!h-28 md:[&_img]:!w-28" />
        </div>
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.6rem,7vw,6rem)] leading-display whitespace-pre-line">
          {headline}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Magnetic strength={0.4}>
            <ButtonLink href="/start-a-project" variant="light" data-cursor="Go">
              Start a Project
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink
              href={`mailto:${email}`}
              variant="ghost"
              className="!text-sand !border-sand/40"
            >
              Let&apos;s Talk
            </ButtonLink>
          </Magnetic>
        </div>
        <p className="mt-16 text-[11px] tracking-[0.4em] uppercase text-nude">
          {tagline}
        </p>
      </div>
    </section>
  );
}
