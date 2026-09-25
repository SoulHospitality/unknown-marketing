"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Industry } from "@/lib/types";
import { TextReveal } from "@/components/motion/TextReveal";

export function HomeIndustries({
  industries,
  headline = "Built For Different Industries.",
}: {
  industries: Industry[];
  headline?: string;
}) {
  const [active, setActive] = useState(0);
  const current = industries[active] || industries[0];

  return (
    <section className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <TextReveal className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-display">
          {headline}
        </TextReveal>

        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <ul>
            {industries.map((ind, i) => {
              const isActive = i === active;
              return (
                <li key={ind.slug} className="border-b border-charcoal/10">
                  <motion.button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor="Open"
                    className="flex w-full items-baseline justify-between gap-4 py-5 text-left"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="relative font-display text-2xl leading-display md:text-4xl"
                    >
                      <motion.span
                        animate={{
                          color: isActive ? "#212121" : "rgba(33,33,33,0.28)",
                        }}
                        transition={{ duration: 0.35 }}
                        className="relative"
                      >
                        {ind.title}
                      </motion.span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-nude"
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </Link>
                    <motion.span
                      className="text-[10px] tracking-[0.2em] uppercase"
                      animate={{
                        color: isActive
                          ? "#BF9990"
                          : "rgba(33,33,33,0.3)",
                        x: isActive ? 0 : 0,
                      }}
                    >
                      0{i + 1}
                    </motion.span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <div className="relative min-h-[420px] overflow-hidden bg-charcoal">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.03, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.visual}
                  alt={current.title}
                  fill
                  className="object-cover opacity-80"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
                <motion.div
                  className="absolute bottom-0 p-8 text-sand md:p-10"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <p className="eyebrow mb-3 text-nude">{current.title}</p>
                  <p className="max-w-md font-elegant text-xl text-sand/80">
                    {current.description}
                  </p>
                  <p className="mt-5 text-sm text-sand/45">
                    {current.capabilities.join(" · ")}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
