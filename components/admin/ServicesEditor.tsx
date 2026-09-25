"use client";

import { useState } from "react";
import type { ServiceCategory, ServiceItem } from "@/lib/types";
import {
  AdminGhostButton,
  AdminListButton,
  AdminLoading,
  AdminPageHeader,
  AdminPanel,
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

const CATEGORIES: ServiceCategory[] = [
  "marketing",
  "branding",
  "media-production",
  "web-solutions",
  "technology",
  "events",
];

function emptyService(): ServiceItem {
  return {
    slug: `service-${Date.now()}`,
    title: "New Service",
    category: "marketing",
    shortDescription: "",
    description: "",
    offerings: [],
    process: [],
    faqs: [],
  };
}

export function ServicesEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<ServiceItem[]>("services");
  const [active, setActive] = useState(0);

  if (loading || !data) {
    return <AdminLoading label="Loading services…" />;
  }

  const item = data[active] ?? data[0];

  const update = (patch: Partial<ServiceItem>) => {
    if (!item) return;
    const next = data.map((s, i) => (i === active ? { ...s, ...patch } : s));
    setData(next);
  };

  const add = () => {
    setData([...data, emptyService()]);
    setActive(data.length);
  };

  const remove = () => {
    if (data.length <= 1) return;
    if (!confirm(`Remove “${item.title}”?`)) return;
    const next = data.filter((_, i) => i !== active);
    setData(next);
    setActive(Math.max(0, active - 1));
  };

  const move = (dir: -1 | 1) => {
    const j = active + dir;
    if (j < 0 || j >= data.length) return;
    const next = [...data];
    [next[active], next[j]] = [next[j], next[active]];
    setData(next);
    setActive(j);
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
            onClick={add}
            className="border border-charcoal/20 bg-white/70 px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition hover:border-nude hover:text-nude"
          >
            + Add service
          </button>
        }
      />

      <AdminPageHeader
        eyebrow="Services"
        title="What we do"
        description="Add, remove, and reorder services. Powers the homepage strip and the Services page."
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full shrink-0 space-y-1 border border-charcoal/10 bg-white/40 p-2 lg:w-60">
          {data.map((s, i) => (
            <AdminListButton
              key={s.slug + i}
              active={i === active}
              onClick={() => setActive(i)}
            >
              {s.title}
            </AdminListButton>
          ))}
        </aside>

        {item && (
          <AdminPanel className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-wrap gap-2">
              <AdminGhostButton onClick={() => move(-1)}>↑ Move up</AdminGhostButton>
              <AdminGhostButton onClick={() => move(1)}>↓ Move down</AdminGhostButton>
              <AdminGhostButton onClick={remove} danger>
                Remove
              </AdminGhostButton>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => update({ title: e.target.value })}
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  className={inputClass}
                  value={item.slug}
                  onChange={(e) =>
                    update({
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-"),
                    })
                  }
                />
              </Field>
              <Field label="Category">
                <select
                  className={inputClass}
                  value={item.category}
                  onChange={(e) =>
                    update({ category: e.target.value as ServiceCategory })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Short description (cards / What we do)">
              <textarea
                className={textareaClass}
                value={item.shortDescription}
                onChange={(e) => update({ shortDescription: e.target.value })}
              />
            </Field>

            <Field label="Full description (service detail page)">
              <textarea
                className={`${textareaClass} min-h-[140px]`}
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </Field>

            <Field label="Offerings (one per line)">
              <textarea
                className={textareaClass}
                value={item.offerings.join("\n")}
                onChange={(e) =>
                  update({
                    offerings: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>

            <Field label="Process steps (one per line)">
              <textarea
                className={textareaClass}
                value={item.process.join("\n")}
                onChange={(e) =>
                  update({
                    process: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.18em] uppercase text-charcoal/45">
                  FAQs
                </span>
                <button
                  type="button"
                  className="text-xs underline"
                  onClick={() =>
                    update({
                      faqs: [...item.faqs, { q: "New question?", a: "" }],
                    })
                  }
                >
                  + Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {item.faqs.map((faq, fi) => (
                  <div
                    key={fi}
                    className="space-y-2 border border-charcoal/10 bg-white/60 p-4"
                  >
                    <input
                      className={inputClass}
                      placeholder="Question"
                      value={faq.q}
                      onChange={(e) => {
                        const faqs = item.faqs.map((f, i) =>
                          i === fi ? { ...f, q: e.target.value } : f
                        );
                        update({ faqs });
                      }}
                    />
                    <textarea
                      className={textareaClass}
                      placeholder="Answer"
                      value={faq.a}
                      onChange={(e) => {
                        const faqs = item.faqs.map((f, i) =>
                          i === fi ? { ...f, a: e.target.value } : f
                        );
                        update({ faqs });
                      }}
                    />
                    <button
                      type="button"
                      className="text-xs text-red-700"
                      onClick={() =>
                        update({
                          faqs: item.faqs.filter((_, i) => i !== fi),
                        })
                      }
                    >
                      Remove FAQ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AdminPanel>
        )}
      </div>
    </div>
  );
}
