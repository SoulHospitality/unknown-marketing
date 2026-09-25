import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getService, getServices } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return { title: service?.title || "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const projects = await getProjects();
  const related = projects
    .filter((p) =>
      p.services.some((s) =>
        service.title.toLowerCase().includes(s.toLowerCase().split(" ")[0]) ||
        p.filters.some((f) => service.category.includes(f))
      )
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-charcoal text-sand pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow text-nude mb-6">Services</p>
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-display">
              {service.title}
              <br />
              <span className="text-nude">Beyond the Obvious.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-sand/70">
              {service.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-4xl mb-10">What We Do</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <Reveal key={o} delay={i * 0.04}>
                <div className="border border-charcoal/10 p-6 min-h-[120px]">
                  <p className="font-display text-xl">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blush/40 py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-4xl mb-10">Our Process</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {service.process.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <span className="font-display text-2xl">{step}</span>
                {i < service.process.length - 1 && (
                  <span className="text-nude">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-sand py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <h2 className="font-display text-4xl mb-10">Related Work</h2>
            <ul className="space-y-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="font-display text-3xl hover:text-nude transition"
                  >
                    {p.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="bg-sand pb-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <h2 className="font-display text-4xl mb-10">FAQ</h2>
            <div className="space-y-8">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-t border-charcoal/10 pt-6">
                  <h3 className="font-display text-xl mb-3">{f.q}</h3>
                  <p className="text-charcoal/65 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-charcoal text-sand py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-10">
          Let&apos;s Grow Your Brand.
        </h2>
        <ButtonLink href="/start-a-project" variant="light">
          Start a Project
        </ButtonLink>
      </section>
    </>
  );
}
