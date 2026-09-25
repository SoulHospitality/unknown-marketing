import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { WorkGrid, WorkHero } from "@/components/work/WorkGrid";

export const metadata: Metadata = { title: "Work" };
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <WorkHero />
        <WorkGrid projects={projects} />
      </div>
    </section>
  );
}
