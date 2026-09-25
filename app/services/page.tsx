import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";
import { Marquee } from "@/components/motion/Marquee";
import { ServicesList } from "@/components/sections/ServicesList";

export const metadata: Metadata = { title: "Services" };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="bg-sand pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <p className="eyebrow mb-6">Services</p>
          <TextReveal className="font-display max-w-5xl text-[clamp(2.6rem,7vw,5.8rem)] leading-display">
            We Don’t Just Offer Services. We Build Solutions.
          </TextReveal>
          <p className="mt-8 max-w-xl font-elegant text-2xl text-charcoal/60">
            Strategy, creativity, technology and execution — connected.
          </p>
        </div>
      </section>

      <Marquee
        items={services.map((s) => s.title)}
        speed={26}
        className="bg-blush/30"
      />

      <ServicesList services={services} />
    </>
  );
}
