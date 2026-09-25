"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { n: "01", title: "Strategy", copy: "We start with understanding — clarity before noise." },
  { n: "02", title: "Creativity", copy: "We challenge conventional thinking until it feels owned." },
  { n: "03", title: "Technology", copy: "We use technology to amplify ideas, not replace them." },
  { n: "04", title: "Execution", copy: "Ideas only matter when they become real in market." },
];

export function WhyUnknown({
  headline = "We Don’t Follow What’s Obvious.",
}: {
  headline?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".why-item", {
        y: 50,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-blush/40 py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <TextReveal className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-display">
          {headline}
        </TextReveal>

        <div className="mt-20 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <motion.div
              key={p.n}
              className="why-item group cursor-default border-t border-charcoal/15 px-0 py-8 md:border-t-0 md:border-l md:px-8 md:py-0 first:md:border-l-0 first:md:pl-0"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <p className="eyebrow mb-5 text-nude transition-transform duration-500 group-hover:translate-x-1">
                {p.n}
              </p>
              <h3 className="mb-4 font-display text-3xl leading-display transition-colors duration-500 group-hover:text-nude">
                {p.title}
              </h3>
              <p className="font-elegant text-xl leading-relaxed text-charcoal/65">
                {p.copy}
              </p>
              <motion.span
                className="mt-6 block h-px origin-left bg-nude/50"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.45 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
