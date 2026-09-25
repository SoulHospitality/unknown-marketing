import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return { title: project?.title || "Case Study" };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const sections = [
    { title: "The Challenge", body: project.challenge },
    { title: "The Objective", body: project.objective },
    { title: "The Strategy", body: project.strategy },
    { title: "The Idea", body: project.idea },
    { title: "The Execution", body: project.execution },
  ];

  return (
    <>
      <section className="relative min-h-[70svh] bg-charcoal text-sand">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-36 md:px-10">
          <p className="eyebrow text-nude mb-4">
            {project.industry} / {project.services.join(" / ")}
          </p>
          <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-display">
            {project.title}
          </h1>
          <p className="mt-4 text-sand/70">Client: {project.client}</p>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-10 space-y-16">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl mb-5">{s.title}</h2>
                <p className="text-lg leading-relaxed text-charcoal/70">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-sand py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-4xl mb-12">The Results</h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-5xl text-nude">{r.value}</p>
                <p className="eyebrow mt-3">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-6 md:grid-cols-2">
          {project.gallery.map((src) => (
            <div key={src} className="relative aspect-[16/10] overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-charcoal/10 pt-12">
          <div>
            <p className="eyebrow mb-3">Next Case Study</p>
            <Link
              href={`/work/${next.slug}`}
              className="font-display text-3xl md:text-5xl hover:text-nude transition"
            >
              {next.title} →
            </Link>
          </div>
          <ButtonLink href="/start-a-project">Start a Project</ButtonLink>
        </div>
      </section>
    </>
  );
}
