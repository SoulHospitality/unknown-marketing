import type { Metadata } from "next";
import { getIndustries } from "@/lib/content";
import { TextReveal } from "@/components/motion/TextReveal";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";

export const metadata: Metadata = { title: "Industries" };
export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <section className="bg-sand pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <p className="eyebrow mb-6">Industries</p>
          <TextReveal className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-display">
            Different Industries. One Way of Thinking.
          </TextReveal>
        </div>
      </section>
      <IndustriesGrid industries={industries} />
    </>
  );
}
