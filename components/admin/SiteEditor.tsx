"use client";

import type { SiteSettings } from "@/lib/cms/types";
import {
  AdminLoading,
  AdminPageHeader,
  AdminPanel,
  Field,
  SaveBar,
  inputClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

export function SiteEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<SiteSettings>("site");

  if (loading || !data) {
    return <AdminLoading label="Loading settings…" />;
  }

  return (
    <div>
      <SaveBar
        saving={saving}
        savedAt={savedAt}
        error={error}
        onSave={() => save(data)}
      />
      <AdminPageHeader
        eyebrow="Site"
        title="Global settings"
        description="Brand details used in the footer, marquee, and contact areas."
      />

      <AdminPanel className="max-w-2xl space-y-5">
        {(
          [
            ["name", "Agency name"],
            ["tagline", "Tagline"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["location", "Location"],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label}>
            <input
              className={inputClass}
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
            />
          </Field>
        ))}

        <Field label="Keywords (comma-separated — used in marquee)">
          <input
            className={inputClass}
            value={data.keywords.join(", ")}
            onChange={(e) =>
              setData({
                ...data,
                keywords: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>

        <h2 className="mt-2 text-[11px] tracking-[0.2em] uppercase text-charcoal/40">
          Social links
        </h2>
        {(["instagram", "linkedin", "facebook", "tiktok"] as const).map(
          (key) => (
            <Field key={key} label={key}>
              <input
                className={inputClass}
                value={data.social[key]}
                onChange={(e) =>
                  setData({
                    ...data,
                    social: { ...data.social, [key]: e.target.value },
                  })
                }
              />
            </Field>
          )
        )}
      </AdminPanel>
    </div>
  );
}
