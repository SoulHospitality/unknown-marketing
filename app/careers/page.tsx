import type { Metadata } from "next";
import { getJobs, getSiteSettings } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Careers" };
export const dynamic = "force-dynamic";

const culture = ["Creative", "Smart", "Curious", "Strategic", "Fearless"];

export default async function CareersPage() {
  const [jobs, site] = await Promise.all([getJobs(), getSiteSettings()]);

  return (
    <>
      <section className="bg-charcoal text-sand pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow text-nude mb-6">Careers</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-display">
              BUILD WHAT&apos;S NEXT.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-4xl mb-10">Culture</h2>
          <div className="flex flex-wrap gap-4">
            {culture.map((c) => (
              <span
                key={c}
                className="border border-charcoal/15 px-5 py-3 font-display text-xl"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-4xl mb-10">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-4 border border-charcoal/10 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl">{job.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/55">
                    {job.department} · {job.location} · {job.type}
                  </p>
                  <p className="mt-3 max-w-xl text-charcoal/65">{job.description}</p>
                </div>
                <ButtonLink href={`mailto:${site.email}?subject=Apply: ${job.title}`}>
                  Apply
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
