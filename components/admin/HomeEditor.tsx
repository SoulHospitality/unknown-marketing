"use client";

import type { HomeContent } from "@/lib/cms/types";
import {
  AdminLoading,
  AdminPageHeader,
  AdminPanel,
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";
import { motion } from "framer-motion";

const TEXT_FIELDS: { key: keyof HomeContent; label: string; multiline?: boolean }[] = [
  { key: "heroEyebrow", label: "Hero eyebrow" },
  { key: "heroLine1", label: "Hero headline line 1" },
  { key: "heroLine2", label: "Hero headline line 2" },
  { key: "heroSub", label: "Hero subtext", multiline: true },
  { key: "brandHeadline", label: "Brand statement headline" },
  { key: "brandCopy", label: "Brand statement copy", multiline: true },
  { key: "servicesSub", label: "Services section eyebrow" },
  { key: "servicesHeading", label: "Services section heading" },
  { key: "workEyebrow", label: "Selected work eyebrow" },
  { key: "workHeadline", label: "Selected work headline" },
  { key: "whyHeadline", label: "Why UNKNOWN headline" },
  { key: "industriesHeadline", label: "Industries headline" },
  { key: "aboutEyebrow", label: "About preview eyebrow" },
  { key: "aboutHeadline", label: "About preview headline" },
  { key: "aboutCopy", label: "About preview copy", multiline: true },
  { key: "clientsHeadline", label: "Clients headline" },
  { key: "ctaHeadline", label: "Final CTA headline" },
  { key: "ctaTagline", label: "Final CTA tagline" },
];

const TOGGLES: { key: keyof HomeContent; label: string }[] = [
  { key: "showServices", label: "Show Services" },
  { key: "showWork", label: "Show Selected Work" },
  { key: "showWhy", label: "Show Why UNKNOWN" },
  { key: "showIndustries", label: "Show Industries" },
  { key: "showNumbers", label: "Show Numbers" },
  { key: "showAbout", label: "Show About preview" },
  { key: "showClients", label: "Show Clients" },
  { key: "showCta", label: "Show Final CTA" },
];

export function HomeEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<HomeContent>("home");

  if (loading || !data) {
    return <AdminLoading label="Loading homepage…" />;
  }

  const set = <K extends keyof HomeContent>(key: K, value: HomeContent[K]) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div>
      <SaveBar
        saving={saving}
        savedAt={savedAt}
        error={error}
        onSave={() => save(data)}
      />

      <AdminPageHeader
        eyebrow="Homepage"
        title="Shape the first impression"
        description="Control every section that appears on the homepage — copy, headlines, and visibility."
      />

      <AdminPanel className="mb-8">
        <h2 className="mb-4 text-[11px] tracking-[0.2em] uppercase text-charcoal/40">
          Section visibility
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOGGLES.map((t, i) => (
            <motion.label
              key={t.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition ${
                data[t.key]
                  ? "border-nude/50 bg-nude/10"
                  : "border-charcoal/10 bg-white/70 hover:border-charcoal/25"
              }`}
            >
              <input
                type="checkbox"
                className="accent-[#BF9990]"
                checked={Boolean(data[t.key])}
                onChange={(e) =>
                  set(t.key, e.target.checked as HomeContent[typeof t.key])
                }
              />
              {t.label}
            </motion.label>
          ))}
        </div>
      </AdminPanel>

      <AdminPanel>
        <h2 className="mb-5 text-[11px] tracking-[0.2em] uppercase text-charcoal/40">
          Copy & headlines
        </h2>
        <div className="grid max-w-3xl gap-5">
          {TEXT_FIELDS.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.multiline ? (
                <textarea
                  className={textareaClass}
                  value={String(data[f.key] ?? "")}
                  onChange={(e) =>
                    set(f.key, e.target.value as HomeContent[typeof f.key])
                  }
                />
              ) : (
                <input
                  className={inputClass}
                  value={String(data[f.key] ?? "")}
                  onChange={(e) =>
                    set(f.key, e.target.value as HomeContent[typeof f.key])
                  }
                />
              )}
            </Field>
          ))}
        </div>
      </AdminPanel>
    </div>
  );
}
