"use client";

import Image from "next/image";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";

export function AboutPreview({
  eyebrow = "About UNKNOWN",
  headline = "We’re not just a marketing agency. We’re your growth partner.",
  copy = "Strategy × Creativity × Technology — connected so ideas don’t die between departments.",
}: {
  eyebrow?: string;
  headline?: string;
  copy?: string;
}) {
  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-[var(--site-max)] lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[420px] lg:min-h-[720px]">
          <Image
            src="https://picsum.photos/seed/about-preview/1400/1600"
            alt="UNKNOWN studio"
            fill
            className="scale-105 object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
        </div>
        <div className="flex flex-col justify-center px-[var(--page-pad)] py-14 sm:py-20 md:px-16 lg:px-20">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <TextReveal className="font-display text-[clamp(1.85rem,4.5vw,4.2rem)] leading-display">
            {headline}
          </TextReveal>
          <p className="mt-6 max-w-md font-elegant text-lg leading-relaxed text-charcoal/65 sm:mt-8 sm:text-xl">
            {copy}
          </p>
          <div className="mt-10 sm:mt-12">
            <Magnetic>
              <ButtonLink href="/about" data-cursor="Meet">
                Discover UNKNOWN
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
