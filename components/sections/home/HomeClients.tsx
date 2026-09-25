"use client";

import Image from "next/image";
import type { Client } from "@/lib/types";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import { Marquee } from "@/components/motion/Marquee";

export function HomeClients({
  clients,
  headline = "Brands That Believe In Ideas.",
}: {
  clients: Client[];
  headline?: string;
}) {
  return (
    <section className="bg-sand py-28 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <TextReveal className="font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-display">
          {headline}
        </TextReveal>
      </div>

      <div className="mt-14">
        <Marquee items={clients.map((c) => c.name)} speed={32} />
      </div>

      <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-2 gap-4 px-6 md:grid-cols-4 md:px-10">
        {clients.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="flex h-28 cursor-default items-center justify-center border border-charcoal/10 bg-white/30 px-4"
          >
            <div className="flex items-center gap-3 opacity-65 transition duration-500 hover:opacity-100">
              <Image src={c.logo} alt="" width={24} height={24} />
              <span className="font-display text-lg tracking-tight">{c.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
