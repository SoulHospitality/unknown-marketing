import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings, getTeam } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { BrandElementsRow } from "@/components/brand/BrandElements";

export const metadata: Metadata = {
  title: "About",
};
export const dynamic = "force-dynamic";

const approach = [
  "Discover",
  "Define",
  "Strategize",
  "Create",
  "Execute",
  "Optimize",
];

export default async function AboutPage() {
  const [team, site] = await Promise.all([getTeam(), getSiteSettings()]);

  return (
    <>
      <section className="bg-charcoal text-sand pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow text-nude mb-6">About</p>
            <h1 className="font-display max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-display">
              UNKNOWN IS A
              <br />
              WAY OF THINKING.
            </h1>
            <p className="font-elegant mt-8 max-w-xl text-2xl text-sand/70">
              We believe the strongest brands are built by people willing to
              question what’s already been done.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Where UNKNOWN Started
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 font-elegant text-charcoal/70 leading-relaxed text-xl">
              <p>
                <strong className="font-display text-base tracking-normal text-charcoal">
                  Problem.
                </strong>{" "}
                Brands were splitting strategy, creative, and technology across
                disconnected teams — and losing the idea in the handoffs.
              </p>
              <p>
                <strong className="font-display text-base tracking-normal text-charcoal">
                  Idea.
                </strong>{" "}
                What if one team owned the whole journey: thinking, making, and
                shipping?
              </p>
              <p>
                <strong className="font-display text-base tracking-normal text-charcoal">
                  Beginning.
                </strong>{" "}
                UNKNOWN was built as a way of working, not just a name on a door.
              </p>
              <p>
                <strong className="font-display text-base tracking-normal text-charcoal">
                  Today.
                </strong>{" "}
                We partner with ambitious brands across industries to turn ideas
                into impact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-blush/50 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl mb-12">
              Question Everything.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Question the obvious.",
              "Challenge the expected.",
              "Create what comes next.",
            ].map((line, i) => (
              <Reveal key={line} delay={i * 0.1}>
                <p className="font-elegant text-2xl md:text-3xl border-t border-charcoal/15 pt-6">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-10 text-center">What We Believe</p>
            <BrandElementsRow />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {site.keywords.map((k) => (
                <span
                  key={k}
                  className="text-[11px] tracking-[0.22em] uppercase text-charcoal/45"
                >
                  {k}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32 border-t border-charcoal/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl mb-12">
              Our Approach
            </h2>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {approach.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="border border-charcoal/10 p-5 min-h-[140px]">
                  <p className="eyebrow text-nude mb-4">0{i + 1}</p>
                  <p className="font-display text-xl uppercase">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl mb-12">
              The People Behind UNKNOWN.
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-mist/30 mb-5">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/70 transition flex items-end p-5 opacity-0 group-hover:opacity-100">
                      <p className="text-sand text-sm leading-relaxed">{m.bio}</p>
                    </div>
                  </div>
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <p className="text-sm text-charcoal/55 mt-1">{m.position}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <ButtonLink href="/start-a-project">
              Let&apos;s Create Something UNKNOWN
            </ButtonLink>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
