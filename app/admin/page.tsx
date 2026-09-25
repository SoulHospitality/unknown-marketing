import {
  getAllArticles,
  getClients,
  getCmsMeta,
  getInquiries,
  getAllProjects,
  getServices,
  getTeam,
} from "@/lib/content";
import { hasCloudinary } from "@/lib/cloudinary";
import { hasSupabase } from "@/lib/supabase/client";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, articles, team, clients, services, inquiries, meta] =
    await Promise.all([
      getAllProjects(),
      getAllArticles(),
      getTeam(),
      getClients(),
      getServices(),
      getInquiries(),
      getCmsMeta(),
    ]);

  const cards = [
    {
      label: "Homepage",
      value: "Edit",
      href: "/admin/home",
      hint: "Hero, sections, headlines",
    },
    {
      label: "Services",
      value: services.length,
      href: "/admin/services",
      hint: "What we do + detail pages",
    },
    {
      label: "Work",
      value: projects.length,
      href: "/admin/projects",
      hint: "Case studies & featured",
    },
    {
      label: "Thinking",
      value: articles.length,
      href: "/admin/articles",
      hint: "Articles & ideas",
    },
    {
      label: "Team",
      value: team.length,
      href: "/admin/team",
      hint: "People on About",
    },
    {
      label: "Clients",
      value: clients.length,
      href: "/admin/clients",
      hint: "Logos & testimonials",
    },
    {
      label: "Inquiries",
      value: inquiries.length,
      href: "/admin/inquiries",
      hint: "Project briefs inbox",
    },
  ];

  return (
    <AdminDashboardClient
      cards={cards}
      metaUpdatedAt={meta.updatedAt}
      status={{
        cms: "Local JSON",
        supabase: hasSupabase() ? "Connected" : "Optional",
        cloudinary: hasCloudinary() ? "Connected" : "Not configured",
      }}
    />
  );
}
