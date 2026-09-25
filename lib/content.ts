import {
  getCollection,
  readCms,
  setCollection,
} from "@/lib/cms/store";
import type { HomeContent, SiteSettings } from "@/lib/cms/types";
import { hasSupabase, createServerClient } from "@/lib/supabase/client";
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

export async function getHomeContent(): Promise<HomeContent> {
  return getCollection("home");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getCollection("site");
}

export async function getServices(): Promise<ServiceItem[]> {
  return getCollection("services");
}

export async function getService(slug: string): Promise<ServiceItem | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

export async function getProjects(filter?: string): Promise<Project[]> {
  let list = (await getCollection("projects")).filter((p) => p.published);
  if (filter && filter !== "all") {
    list = list.filter((p) =>
      p.filters.includes(filter as Project["filters"][number])
    );
  }
  return list;
}

export async function getAllProjects(): Promise<Project[]> {
  return getCollection("projects");
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getIndustries(): Promise<Industry[]> {
  return getCollection("industries");
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  const all = await getIndustries();
  return all.find((i) => i.slug === slug);
}

export async function getArticles(category?: string): Promise<Article[]> {
  let list = (await getCollection("articles")).filter((a) => a.published);
  if (category && category !== "all") {
    list = list.filter((a) => a.category === category);
  }
  return list;
}

export async function getAllArticles(): Promise<Article[]> {
  return getCollection("articles");
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug);
}

export async function getTeam(): Promise<TeamMember[]> {
  const team = await getCollection("team");
  return [...team].sort((a, b) => a.order - b.order);
}

export async function getClients(): Promise<Client[]> {
  return getCollection("clients");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return getCollection("testimonials");
}

export async function getStats(): Promise<SiteStat[]> {
  const stats = await getCollection("stats");
  return stats.filter((s) => s.verified).sort((a, b) => a.order - b.order);
}

export async function getAllStats(): Promise<SiteStat[]> {
  return getCollection("stats");
}

export async function getJobs(): Promise<Job[]> {
  const jobs = await getCollection("jobs");
  return jobs.filter((j) => j.open);
}

export async function getAllJobs(): Promise<Job[]> {
  return getCollection("jobs");
}

export async function createInquiry(
  inquiry: Inquiry
): Promise<{ ok: boolean; id?: string }> {
  if (hasSupabase()) {
    const sb = createServerClient();
    if (sb) {
      const { data, error } = await sb
        .from("inquiries")
        .insert({
          name: inquiry.name,
          company: inquiry.company,
          email: inquiry.email,
          phone: inquiry.phone,
          industry: inquiry.industry,
          website: inquiry.website,
          location: inquiry.location,
          needs: inquiry.needs,
          description: inquiry.description,
          budget: inquiry.budget,
          timeline: inquiry.timeline,
        })
        .select("id")
        .single();
      if (!error && data) return { ok: true, id: data.id };
    }
  }

  const id = `local-${Date.now()}`;
  const entry: Inquiry = {
    ...inquiry,
    id,
    created_at: new Date().toISOString(),
  };
  const list = await getCollection("inquiries");
  await setCollection("inquiries", [entry, ...list]);
  return { ok: true, id };
}

export async function getInquiries(): Promise<Inquiry[]> {
  return getCollection("inquiries");
}

/** @deprecated use getInquiries */
export async function getMemoryInquiries(): Promise<Inquiry[]> {
  return getInquiries();
}

export async function getCmsMeta() {
  const db = await readCms();
  return { updatedAt: db.updatedAt };
}
