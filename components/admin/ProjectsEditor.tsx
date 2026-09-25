"use client";

import { useState } from "react";
import type { Project, ProjectFilter } from "@/lib/types";
import {
  AdminLoading,
  AdminPageHeader,
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

const FILTERS: ProjectFilter[] = [
  "branding",
  "digital",
  "social",
  "web",
  "production",
  "events",
];

function emptyProject(): Project {
  return {
    slug: `project-${Date.now()}`,
    title: "New Project",
    client: "",
    industry: "",
    services: [],
    filters: ["branding"],
    coverImage: "https://picsum.photos/seed/new-project/1600/1000",
    challenge: "",
    objective: "",
    strategy: "",
    idea: "",
    execution: "",
    results: [],
    gallery: [],
    featured: false,
    published: true,
  };
}

export function ProjectsEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<Project[]>("projects");
  const [active, setActive] = useState(0);

  if (loading || !data) {
    return <AdminLoading label="Loading projects…" />;
  }

  const item = data[active] ?? data[0];

  const update = (patch: Partial<Project>) => {
    if (!item) return;
    setData(data.map((p, i) => (i === active ? { ...p, ...patch } : p)));
  };

  return (
    <div>
      <SaveBar
        saving={saving}
        savedAt={savedAt}
        error={error}
        onSave={() => save(data)}
        extra={
          <button
            type="button"
            onClick={() => {
              setData([...data, emptyProject()]);
              setActive(data.length);
            }}
            className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
          >
            + Add project
          </button>
        }
      />

      <AdminPageHeader
        eyebrow="Work"
        title="Projects / Work"
        description="Featured projects appear in Selected Work on the homepage."
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 space-y-1 lg:w-56">
          {data.map((p, i) => (
            <button
              key={p.slug + i}
              type="button"
              onClick={() => setActive(i)}
              className={`block w-full truncate px-3 py-2.5 text-left text-sm ${
                i === active
                  ? "bg-charcoal text-sand"
                  : "bg-white/50 text-charcoal/70"
              }`}
            >
              {p.featured ? "★ " : ""}
              {p.title}
            </button>
          ))}
        </aside>

        {item && (
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                />
                Featured on homepage
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(e) => update({ published: e.target.checked })}
                />
                Published
              </label>
              <button
                type="button"
                className="text-xs text-red-700"
                onClick={() => {
                  if (!confirm(`Remove “${item.title}”?`)) return;
                  setData(data.filter((_, i) => i !== active));
                  setActive(0);
                }}
              >
                Remove
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["title", "Title"],
                  ["slug", "Slug"],
                  ["client", "Client"],
                  ["industry", "Industry"],
                  ["coverImage", "Cover image URL"],
                ] as const
              ).map(([key, label]) => (
                <Field key={key} label={label}>
                  <input
                    className={inputClass}
                    value={item[key]}
                    onChange={(e) => update({ [key]: e.target.value })}
                  />
                </Field>
              ))}
            </div>

            <Field label="Services (comma-separated)">
              <input
                className={inputClass}
                value={item.services.join(", ")}
                onChange={(e) =>
                  update({
                    services: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>

            <Field label="Filters">
              <div className="flex flex-wrap gap-3">
                {FILTERS.map((f) => (
                  <label key={f} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.filters.includes(f)}
                      onChange={(e) => {
                        const filters = e.target.checked
                          ? [...item.filters, f]
                          : item.filters.filter((x) => x !== f);
                        update({ filters });
                      }}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </Field>

            {(
              [
                ["challenge", "Challenge"],
                ["objective", "Objective"],
                ["strategy", "Strategy"],
                ["idea", "Idea"],
                ["execution", "Execution"],
              ] as const
            ).map(([key, label]) => (
              <Field key={key} label={label}>
                <textarea
                  className={textareaClass}
                  value={item[key]}
                  onChange={(e) => update({ [key]: e.target.value })}
                />
              </Field>
            ))}

            <Field label="Results (label|value per line)">
              <textarea
                className={textareaClass}
                value={item.results
                  .map((r) => `${r.label}|${r.value}`)
                  .join("\n")}
                onChange={(e) =>
                  update({
                    results: e.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [label, ...rest] = line.split("|");
                        return { label: label.trim(), value: rest.join("|").trim() };
                      }),
                  })
                }
              />
            </Field>

            <Field label="Gallery image URLs (one per line)">
              <textarea
                className={textareaClass}
                value={item.gallery.join("\n")}
                onChange={(e) =>
                  update({
                    gallery: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
