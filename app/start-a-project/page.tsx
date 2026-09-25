import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectForm } from "@/components/forms/ProjectForm";

export const metadata: Metadata = { title: "Start a Project" };

export default function StartProjectPage() {
  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-6">Start a Project</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-display mb-6">
            Tell us what you’re building, changing or imagining.
          </h1>
          <p className="text-charcoal/60 mb-12 text-lg">
            The more context you share, the sharper our first conversation.
          </p>
        </Reveal>
        <ProjectForm />
      </div>
    </section>
  );
}
