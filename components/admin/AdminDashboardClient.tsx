"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AdminPageHeader } from "@/components/admin/CmsHooks";
import { ResetCmsButton } from "@/components/admin/ResetCmsButton";

type Card = { label: string; value: string | number; href: string; hint: string };

export function AdminDashboardClient({
  cards,
  metaUpdatedAt,
  status,
}: {
  cards: Card[];
  metaUpdatedAt?: string;
  status: { cms: string; supabase: string; cloudinary: string };
}) {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Command center"
        title="Dashboard"
        description="Edit the live UNKNOWN site from here. Changes save instantly to local CMS storage."
      />

      {metaUpdatedAt && (
        <p className="mb-6 text-xs tracking-wide text-charcoal/40">
          Last updated · {new Date(metaUpdatedAt).toLocaleString()}
        </p>
      )}

      <div className="mb-10 flex flex-wrap gap-2 text-[10px] tracking-[0.16em] uppercase sm:gap-3 sm:text-[11px]">
        {[
          { label: `CMS · ${status.cms}`, on: true },
          { label: `Supabase · ${status.supabase}`, on: status.supabase === "Connected" },
          {
            label: `Cloudinary · ${status.cloudinary}`,
            on: status.cloudinary === "Connected",
          },
        ].map((s) => (
          <span
            key={s.label}
            className={`border px-3 py-2 ${
              s.on
                ? "border-nude/50 bg-nude/10 text-charcoal"
                : "border-charcoal/15 text-charcoal/45"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.href}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={c.href}
              className="admin-card group relative block overflow-hidden border border-charcoal/10 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-nude/50 hover:shadow-[0_24px_60px_rgba(33,33,33,0.08)]"
            >
              <span className="admin-card-shine pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100" />
              <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-nude transition-transform duration-500 group-hover:scale-y-100" />
              <p className="eyebrow relative mb-4 text-nude">{c.label}</p>
              <p className="relative font-display text-4xl leading-display transition-colors group-hover:text-nude sm:text-5xl">
                {c.value}
              </p>
              <p className="relative mt-4 text-sm text-charcoal/45">{c.hint}</p>
              <p className="relative mt-6 text-[11px] tracking-[0.2em] uppercase text-charcoal/35 transition group-hover:translate-x-1 group-hover:text-nude">
                Open →
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 border border-charcoal/10 bg-charcoal p-6 text-sand sm:p-8">
        <p className="eyebrow mb-3 text-nude">Danger zone</p>
        <p className="mb-5 max-w-xl text-sm text-sand/55">
          Reset all CMS content back to the original seed data.
        </p>
        <ResetCmsButton />
      </div>
    </div>
  );
}
