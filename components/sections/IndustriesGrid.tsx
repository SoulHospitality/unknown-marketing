"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Industry } from "@/lib/types";
import { SpotlightCard } from "@/components/motion/Interactive";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function IndustriesGrid({ industries }: { industries: Industry[] }) {
  return (
    <section className="bg-sand pb-28">
      <div className="mx-auto grid max-w-[1500px] gap-6 px-6 md:grid-cols-2 md:px-10">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.55 }}
          >
            <SpotlightCard className="border border-charcoal/10">
              <Link
                href={`/industries/${ind.slug}`}
                data-cursor="Open"
                className="group relative z-20 block"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={ind.visual}
                    alt={ind.title}
                    fill
                    className="img-zoom object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="p-7 transition-colors duration-500 group-hover:bg-blush/30">
                  <h2 className="mb-3 font-display text-3xl leading-display transition-colors group-hover:text-nude">
                    {ind.title}
                  </h2>
                  <p className="mb-5 text-charcoal/60">{ind.description}</p>
                  <p className="text-sm text-charcoal/50">
                    {ind.capabilities.join(" · ")}
                  </p>
                  <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-nude opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">
                    Explore →
                  </p>
                </div>
              </Link>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-[1500px] px-6 text-center md:px-10">
        <h2 className="mb-8 font-display text-3xl">What&apos;s Your Industry?</h2>
        <ButtonLink href="/start-a-project">Let&apos;s Talk</ButtonLink>
      </div>
    </section>
  );
}
