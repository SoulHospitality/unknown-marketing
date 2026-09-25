"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ProjectFilter } from "@/lib/types";
import { TextReveal } from "@/components/motion/TextReveal";
import { SpotlightCard } from "@/components/motion/Interactive";

const filters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "digital", label: "Digital" },
  { id: "social", label: "Social" },
  { id: "web", label: "Web" },
  { id: "production", label: "Production" },
  { id: "events", label: "Events" },
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const list = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.filters.includes(filter)),
    [filter, projects]
  );

  return (
    <div>
      <div className="mb-14 flex flex-wrap gap-2">
        {filters.map((f) => (
          <motion.button
            key={f.id}
            type="button"
            data-cursor="Filter"
            onClick={() => setFilter(f.id)}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition ${
              filter === f.id
                ? "border-charcoal bg-charcoal text-sand"
                : "border-charcoal/20 text-charcoal/55 hover:border-charcoal"
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
              className={i % 5 === 0 ? "md:col-span-2" : ""}
            >
              <SpotlightCard>
                <Link
                  href={`/work/${p.slug}`}
                  data-cursor="Case"
                  className={`group relative block overflow-hidden bg-charcoal ${
                    i % 5 === 0 ? "aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="img-zoom object-cover opacity-80 group-hover:opacity-100"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-sand transition-transform duration-500 group-hover:translate-y-0 translate-y-1 md:p-8">
                    <p className="eyebrow mb-2 text-nude">
                      {p.industry} / {p.services.join(" · ")}
                    </p>
                    <h2 className="font-display text-2xl leading-display md:text-4xl">{p.title}</h2>
                    <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-nude opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">
                      View case study →
                    </p>
                  </div>
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function WorkHero() {
  return (
    <div className="mb-16">
      <p className="eyebrow mb-6">Work</p>
      <TextReveal className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-display">
        Work That Speaks For Itself.
      </TextReveal>
    </div>
  );
}
