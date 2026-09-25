import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getIndustries, getIndustry } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  return { title: industry?.title || "Industry" };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <section className="relative min-h-[50svh] bg-charcoal text-sand">
        <Image
          src={industry.visual}
          alt={industry.title}
          fill
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto flex min-h-[50svh] max-w-[1400px] flex-col justify-end px-6 pb-14 pt-36 md:px-10">
          <Reveal>
            <p className="eyebrow text-nude mb-4">Industry</p>
            <h1 className="font-display text-5xl md:text-7xl">{industry.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <p className="text-xl leading-relaxed text-charcoal/70 mb-12">
            {industry.description}
          </p>
          <h2 className="font-display text-3xl mb-8">Capabilities</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {industry.capabilities.map((c) => (
              <li key={c} className="border border-charcoal/10 px-5 py-4 font-display text-xl">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
