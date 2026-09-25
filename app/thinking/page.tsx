import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ThinkingGrid } from "@/components/thinking/ThinkingGrid";

export const metadata: Metadata = { title: "Thinking" };
export const dynamic = "force-dynamic";

export default async function ThinkingPage() {
  const articles = await getArticles();

  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-6">Thinking</p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-display mb-16">
            Ideas Worth
            <br />
            Thinking About.
          </h1>
        </Reveal>
        <ThinkingGrid articles={articles} />
      </div>
    </section>
  );
}
