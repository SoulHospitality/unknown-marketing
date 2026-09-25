import {
  getClients,
  getFeaturedProjects,
  getHomeContent,
  getIndustries,
  getServices,
  getSiteSettings,
  getStats,
} from "@/lib/content";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { BrandStatement } from "@/components/sections/home/BrandStatement";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { WhyUnknown } from "@/components/sections/home/WhyUnknown";
import { HomeIndustries } from "@/components/sections/home/HomeIndustries";
import { HomeNumbers } from "@/components/sections/home/HomeNumbers";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { HomeClients } from "@/components/sections/home/HomeClients";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { Marquee } from "@/components/motion/Marquee";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [home, site, services, projects, industries, stats, clients] =
    await Promise.all([
      getHomeContent(),
      getSiteSettings(),
      getServices(),
      getFeaturedProjects(),
      getIndustries(),
      getStats(),
      getClients(),
    ]);

  return (
    <>
      <HomeHero
        eyebrow={home.heroEyebrow}
        line1={home.heroLine1}
        line2={home.heroLine2}
        sub={home.heroSub}
      />
      <Marquee items={site.keywords} speed={28} className="bg-sand" />
      <BrandStatement
        headline={home.brandHeadline}
        copy={home.brandCopy}
        keywords={site.keywords}
      />
      {home.showServices && (
        <HomeServices
          services={services}
          eyebrow={home.servicesSub}
          heading={home.servicesHeading}
        />
      )}
      {home.showWork && (
        <SelectedWork
          projects={projects}
          eyebrow={home.workEyebrow}
          headline={home.workHeadline}
        />
      )}
      {home.showWhy && <WhyUnknown headline={home.whyHeadline} />}
      {home.showIndustries && (
        <HomeIndustries
          industries={industries}
          headline={home.industriesHeadline}
        />
      )}
      {home.showNumbers && <HomeNumbers stats={stats} />}
      {home.showAbout && (
        <AboutPreview
          eyebrow={home.aboutEyebrow}
          headline={home.aboutHeadline}
          copy={home.aboutCopy}
        />
      )}
      {home.showClients && (
        <HomeClients clients={clients} headline={home.clientsHeadline} />
      )}
      {home.showCta && (
        <FinalCTA
          headline={home.ctaHeadline}
          tagline={home.ctaTagline}
          email={site.email}
        />
      )}
    </>
  );
}
