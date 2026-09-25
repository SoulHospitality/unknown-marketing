import { promises as fs } from "fs";
import path from "path";
import {
  articles as seedArticles,
  clients as seedClients,
  industries as seedIndustries,
  jobs as seedJobs,
  projects as seedProjects,
  services as seedServices,
  siteConfig as seedSite,
  siteStats as seedStats,
  team as seedTeam,
  testimonials as seedTestimonials,
} from "@/lib/data/seed";
import type { CmsCollection, CmsDatabase, HomeContent, SiteSettings } from "@/lib/cms/types";

const DATA_PATH = path.join(process.cwd(), "data", "cms.json");

const defaultHome: HomeContent = {
  heroEyebrow: "Marketing · Branding · Digital · Experience",
  heroLine1: "Ideas Beyond",
  heroLine2: "the Obvious.",
  heroSub:
    "Strategy, creativity and technology — shaped into brands that feel inevitable.",
  brandHeadline: "More Than Marketing. A Smarter Way Forward.",
  brandCopy:
    "We bring strategy, creativity, technology and execution under one roof — turning ambitious ideas into meaningful brand experiences.",
  servicesHeading: "From first idea to final execution.",
  servicesSub: "What we do",
  workEyebrow: "Selected work",
  workHeadline: "Ideas We Turned Into Impact.",
  whyHeadline: "We Don't Follow What's Obvious.",
  industriesHeadline: "Built For Different Industries.",
  aboutEyebrow: "About UNKNOWN",
  aboutHeadline: "We're not just a marketing agency. We're your growth partner.",
  aboutCopy:
    "Strategy × Creativity × Technology — connected so ideas don't die between departments.",
  clientsHeadline: "Brands That Believe In Ideas.",
  ctaHeadline: "Ready to turn your ideas into real results?",
  ctaTagline: "Ideas Beyond the Obvious.",
  showServices: true,
  showWork: true,
  showWhy: true,
  showIndustries: true,
  showNumbers: true,
  showAbout: true,
  showClients: true,
  showCta: true,
};

function defaultDb(): CmsDatabase {
  return {
    services: structuredClone(seedServices),
    projects: structuredClone(seedProjects),
    industries: structuredClone(seedIndustries),
    articles: structuredClone(seedArticles),
    team: structuredClone(seedTeam),
    clients: structuredClone(seedClients),
    testimonials: structuredClone(seedTestimonials),
    stats: structuredClone(seedStats),
    jobs: structuredClone(seedJobs),
    inquiries: [],
    home: defaultHome,
    site: {
      name: seedSite.name,
      tagline: seedSite.tagline,
      email: seedSite.email,
      phone: seedSite.phone,
      location: seedSite.location,
      keywords: [...seedSite.keywords],
      social: { ...seedSite.social },
    } satisfies SiteSettings,
    updatedAt: new Date().toISOString(),
  };
}

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(defaultDb(), null, 2), "utf8");
  }
}

export async function readCms(): Promise<CmsDatabase> {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw) as CmsDatabase;
  // Merge missing keys if schema grows
  const base = defaultDb();
  return {
    ...base,
    ...data,
    home: { ...base.home, ...(data.home || {}) },
    site: { ...base.site, ...(data.site || {}) },
  };
}

export async function writeCms(db: CmsDatabase): Promise<CmsDatabase> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  const next = { ...db, updatedAt: new Date().toISOString() };
  await fs.writeFile(DATA_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function getCollection<K extends CmsCollection>(
  key: K
): Promise<CmsDatabase[K]> {
  const db = await readCms();
  return db[key];
}

export async function setCollection<K extends CmsCollection>(
  key: K,
  value: CmsDatabase[K]
): Promise<CmsDatabase[K]> {
  const db = await readCms();
  db[key] = value;
  await writeCms(db);
  return value;
}

export async function resetCms(): Promise<CmsDatabase> {
  const db = defaultDb();
  return writeCms(db);
}

export { DATA_PATH, defaultHome };
