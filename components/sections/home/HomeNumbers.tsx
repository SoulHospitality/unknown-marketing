"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import type { SiteStat } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function HomeNumbers({ stats }: { stats: SiteStat[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !stats.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 48,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });

      el.querySelectorAll<HTMLElement>("[data-stat]").forEach((node) => {
        const raw = node.dataset.stat || "0";
        const numeric = parseFloat(raw.replace(/[^\d.]/g, ""));
        const suffix = raw.replace(/[\d.]/g, "");
        if (!numeric) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numeric,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 85%" },
          onUpdate: () => {
            node.textContent =
              (numeric >= 10 ? Math.round(obj.val) : obj.val.toFixed(0)) + suffix;
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [stats.length]);

  if (!stats.length) return null;

  return (
    <section ref={root} className="bg-charcoal py-16 text-sand sm:py-24 md:py-28">
      <div className="site-container grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            className="stat-item group cursor-default"
            whileHover={{ y: -8, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p
              data-stat={s.value}
              className="font-display text-4xl leading-display tracking-tight text-nude transition-colors duration-500 group-hover:text-sand sm:text-5xl md:text-7xl"
            >
              {s.value}
            </p>
            <p className="eyebrow mt-3 transition-transform duration-500 group-hover:translate-x-1 sm:mt-4">
              {s.label}
            </p>
            <motion.span
              className="mt-3 block h-px origin-left bg-nude/60 sm:mt-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
