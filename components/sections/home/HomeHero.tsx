"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";

type HomeHeroProps = {
  eyebrow?: string;
  line1?: string;
  line2?: string;
  sub?: string;
};

/**
 * Cinematic hero — Active Theory immersion + Basement typography scale.
 */
export function HomeHero({
  eyebrow = "Marketing · Branding · Digital · Experience",
  line1 = "Ideas Beyond",
  line2 = "the Obvious.",
  sub = "Strategy, creativity and technology — shaped into brands that feel inevitable.",
}: HomeHeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.9 })
        .from(".hero-line", { yPercent: 110, duration: 1.15, stagger: 0.12 }, "-=0.55")
        .from(".hero-sub", { y: 28, opacity: 0, duration: 0.9 }, "-=0.55")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-media", { scale: 1.12, opacity: 0, duration: 1.4 }, 0);

      gsap.to(".hero-media-inner", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="hero-compact relative min-h-[100svh] min-h-[100dvh] overflow-hidden bg-charcoal text-sand"
    >
      <div className="hero-media absolute inset-0">
        <div
          className="hero-media-inner absolute inset-[-12%] opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(191,153,144,0.35), transparent 42%), url(https://picsum.photos/seed/unknown-cinematic/2400/1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/55 to-charcoal" />
      </div>

      <div className="site-container relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col justify-end pb-12 pt-28 sm:pb-16 sm:pt-32 md:pb-24 md:pt-36">
        <p className="hero-eyebrow eyebrow mb-5 text-nude sm:mb-7">{eyebrow}</p>

        <h1 className="font-display max-w-[14ch] text-[clamp(2.6rem,10vw,8.5rem)] leading-display-tight tracking-[-0.04em] sm:max-w-[12ch]">
          <span className="clip-text block">
            <span className="hero-line inline-block">{line1}</span>
          </span>
          <span className="clip-text block">
            <span className="hero-line inline-block text-nude">{line2}</span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl font-elegant text-lg leading-relaxed text-sand/70 sm:mt-8 sm:text-xl md:text-2xl">
          {sub}
        </p>

        <div className="hero-cta mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4">
          <Magnetic strength={0.35}>
            <ButtonLink
              href="/start-a-project"
              variant="light"
              className="w-full justify-center sm:w-auto"
              data-cursor="Start"
            >
              Start a Project
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.35}>
            <ButtonLink
              href="/work"
              variant="ghost"
              className="w-full justify-center !text-sand !border-sand/35 sm:w-auto"
              data-cursor="Work"
            >
              Explore Work
            </ButtonLink>
          </Magnetic>
        </div>

        <div className="mt-10 hidden items-center gap-4 text-[10px] tracking-[0.35em] uppercase text-sand/40 sm:mt-16 sm:flex">
          <span className="h-px w-10 bg-sand/30" />
          Scroll to discover
        </div>
      </div>
    </section>
  );
}
