import type {
  Article,
  Client,
  Industry,
  Inquiry,
  Job,
  Project,
  ServiceItem,
  SiteStat,
  TeamMember,
  Testimonial,
} from "@/lib/types";

export interface HomeContent {
  heroEyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  brandHeadline: string;
  brandCopy: string;
  servicesHeading: string;
  servicesSub: string;
  workEyebrow: string;
  workHeadline: string;
  whyHeadline: string;
  industriesHeadline: string;
  aboutEyebrow: string;
  aboutHeadline: string;
  aboutCopy: string;
  clientsHeadline: string;
  ctaHeadline: string;
  ctaTagline: string;
  showServices: boolean;
  showWork: boolean;
  showWhy: boolean;
  showIndustries: boolean;
  showNumbers: boolean;
  showAbout: boolean;
  showClients: boolean;
  showCta: boolean;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  keywords: string[];
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
    tiktok: string;
  };
}

export interface CmsDatabase {
  services: ServiceItem[];
  projects: Project[];
  industries: Industry[];
  articles: Article[];
  team: TeamMember[];
  clients: Client[];
  testimonials: Testimonial[];
  stats: SiteStat[];
  jobs: Job[];
  inquiries: Inquiry[];
  home: HomeContent;
  site: SiteSettings;
  updatedAt: string;
}

export type CmsCollection = keyof Omit<CmsDatabase, "updatedAt">;
