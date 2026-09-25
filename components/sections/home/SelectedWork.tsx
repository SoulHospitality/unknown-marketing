"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextReveal } from "@/components/motion/TextReveal";
import { SpotlightCard } from "@/components/motion/Interactive";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({ project: p, index: i }: { project: Project; index: number }) {
  return (
    <SpotlightCard
      className={`work-card border border-sand/10 transition-colors duration-500 hover:border-nude/45 ${
        i % 2 === 0 ? "" : ""
      }`}
    >
      <Link
        href={`/work/${p.slug}`}
        data-cursor="Case"
        className={`group relative z-20 grid gap-0 md:items-stretch ${
          i % 2 === 0 ? "md:grid-cols-[1.35fr_1fr]" : "md:grid-cols-[1fr_1.35fr]"
        }`}
      >
        <div
          className={`relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[420px] ${
            i % 2 === 1 ? "md:order-2" : ""
          }`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={p.coverImage}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 60vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/15" />
        </div>

        <div className="flex flex-col justify-between bg-sand/[0.03] p-8 transition-colors duration-500 group-hover:bg-sand/[0.07] md:p-12">
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={false}
              whileHover={{ x: 4 }}
            >
              {p.industry} / {p.services[0]}
            </motion.p>
            <h3 className="font-display text-3xl leading-display transition-colors duration-500 group-hover:text-nude md:text-5xl">
              {p.title}
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-sand/50 transition-colors duration-500 group-hover:text-sand/70">
              {p.challenge.slice(0, 120)}…
            </p>
          </div>
          <motion.p
            className="mt-10 text-[11px] tracking-[0.22em] uppercase text-nude"
            variants={{
              rest: { x: 0 },
              hover: { x: 12 },
            }}
          >
            <span className="inline-flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-3">
              View case study
              <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-12">
                →
              </span>
            </span>
          </motion.p>
        </div>
      </Link>
    </SpotlightCard>
  );
}

export function SelectedWork({
  projects,
  eyebrow = "Selected work",
  headline = "Ideas We Turned Into Impact.",
}: {
  projects: Project[];
  eyebrow?: string;
  headline?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 1,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-charcoal py-28 text-sand md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <p className="eyebrow mb-6 text-nude">{eyebrow}</p>
        <TextReveal className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-display">
          {headline}
        </TextReveal>

        <div className="mt-20 space-y-6 md:space-y-8">
          {projects.slice(0, 4).map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-16">
          <ButtonLink href="/work" variant="ghost" className="!border-sand/40 !text-sand">
            View All Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
