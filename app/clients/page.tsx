import type { Metadata } from "next";
import Image from "next/image";
import { getClients, getTestimonials } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Clients" };
export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const [clients, testimonials] = await Promise.all([
    getClients(),
    getTestimonials(),
  ]);

  const byIndustry = clients.reduce<Record<string, typeof clients>>((acc, c) => {
    acc[c.industry] = acc[c.industry] || [];
    acc[c.industry].push(c);
    return acc;
  }, {});

  return (
    <>
      <section className="bg-sand pt-36 pb-16 md:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-6">Clients</p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-display">
              Brands We’ve
              <br />
              Built With.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 space-y-14">
          {Object.entries(byIndustry).map(([industry, list]) => (
            <div key={industry}>
              <p className="eyebrow mb-5">{industry}</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {list.map((c) => (
                  <div
                    key={c.id}
                    className="flex h-24 items-center justify-center border border-charcoal/10 gap-3"
                  >
                    <Image src={c.logo} alt="" width={24} height={24} />
                    <span className="font-display text-lg">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-sand py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 space-y-14">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="border-l border-nude pl-8">
              <p className="font-display text-2xl md:text-4xl leading-snug">
                “{t.quote}”
              </p>
              <footer className="mt-6 text-sand/60 text-sm">
                {t.name} · {t.position}, {t.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-sand py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-10">
          Your Brand Could Be Next.
        </h2>
        <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
      </section>
    </>
  );
}
