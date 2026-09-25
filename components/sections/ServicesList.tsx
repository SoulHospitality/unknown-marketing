"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

const flow = [
  "Strategy",
  "Creative",
  "Production",
  "Technology",
  "Distribution",
  "Results",
];

export function ServicesList({ services }: { services: ServiceItem[] }) {
  return (
    <>
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] space-y-2 px-6 md:px-10">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, duration: 0.55 }}
            >
              <Link
                href={`/services/${s.slug}`}
                data-cursor="Explore"
                className="group flex flex-col gap-4 border-t border-charcoal/12 py-10 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <motion.p
                    className="eyebrow mb-3 text-nude"
                    whileHover={{ x: 6 }}
                  >
                    0{i + 1}
                  </motion.p>
                  <h2 className="font-display text-4xl leading-display transition-all duration-500 group-hover:translate-x-3 group-hover:text-nude md:text-6xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-charcoal/55 transition-colors group-hover:text-charcoal/75">
                    {s.shortDescription}
                  </p>
                </div>
                <span className="text-[11px] tracking-[0.22em] uppercase transition-transform duration-500 group-hover:translate-x-2">
                  Explore →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-24 text-sand md:py-32">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <h2 className="mb-12 font-display text-4xl md:text-5xl">How We Work</h2>
          <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
            {flow.map((step, i) => (
              <motion.div
                key={step}
                className="flex items-center gap-4"
                whileHover={{ y: -4, color: "#BF9990" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="font-display text-2xl md:text-4xl">{step}</span>
                {i < flow.length - 1 && (
                  <span className="hidden text-nude md:inline">→</span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-14">
            <ButtonLink href="/start-a-project" variant="light">
              Start a Project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
