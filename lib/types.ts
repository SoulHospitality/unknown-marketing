export type ServiceCategory =
  | "marketing"
  | "branding"
  | "media-production"
  | "web-solutions"
  | "technology"
  | "events";

export type ProjectFilter =
  | "all"
  | "branding"
  | "digital"
  | "social"
  | "web"
  | "production"
  | "events";

export type ArticleCategory =
  | "marketing"
  | "branding"
  | "digital"
  | "technology"
  | "creative"
  | "news";

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  offerings: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  filters: ProjectFilter[];
  coverImage: string;
  challenge: string;
  objective: string;
  strategy: string;
  idea: string;
  execution: string;
  results: { label: string; value: string }[];
  gallery: string[];
  featured: boolean;
  published: boolean;
}

export interface Industry {
  slug: string;
  title: string;
  description: string;
  capabilities: string[];
  visual: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  coverImage: string;
  author: string;
  date: string;
  content: string;
  featured: boolean;
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  order: number;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  position: string;
  company: string;
}

export interface SiteStat {
  id: string;
  label: string;
  value: string;
  verified: boolean;
  order: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  open: boolean;
}

export interface Inquiry {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  location?: string;
  needs: string[];
  description: string;
  budget: string;
  timeline: string;
  created_at?: string;
}
