"use client";

import { useState } from "react";
import type { Industry } from "@/lib/types";
import {
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

function empty(): Industry {
  return {
    slug: `industry-${Date.now()}`,
    title: "New Industry",
    description: "",
    capabilities: [],
    visual: "https://picsum.photos/seed/industry/1200/800",
  };
}

export function IndustriesEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<Industry[]>("industries");
  const [active, setActive] = useState(0);

  if (loading || !data) return <p className="text-charcoal/50">Loading…</p>;
  const item = data[active] ?? data[0];
  const update = (patch: Partial<Industry>) => {
    setData(data.map((x, i) => (i === active ? { ...x, ...patch } : x)));
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
              setData([...data, empty()]);
              setActive(data.length);
            }}
            className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
          >
            + Add industry
          </button>
        }
      />
      <h1 className="font-display text-4xl mb-2">Industries</h1>
      <p className="text-charcoal/55 mb-8">
        Powers “Built For Different Industries” on the homepage and the Industries page.
      </p>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 space-y-1 lg:w-56">
          {data.map((x, i) => (
            <button
              key={x.slug + i}
              type="button"
              onClick={() => setActive(i)}
              className={`block w-full truncate px-3 py-2.5 text-left text-sm ${
                i === active ? "bg-charcoal text-sand" : "bg-white/50"
              }`}
            >
              {x.title}
            </button>
          ))}
        </aside>
        {item && (
          <div className="flex-1 space-y-5">
            <button
              type="button"
              className="text-xs text-red-700"
              onClick={() => {
                if (!confirm("Remove?")) return;
                setData(data.filter((_, i) => i !== active));
                setActive(0);
              }}
            >
              Remove
            </button>
            {(
              [
                ["title", "Title"],
                ["slug", "Slug"],
                ["visual", "Visual image URL"],
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
            <Field label="Description">
              <textarea
                className={textareaClass}
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </Field>
            <Field label="Capabilities (one per line)">
              <textarea
                className={textareaClass}
                value={item.capabilities.join("\n")}
                onChange={(e) =>
                  update({
                    capabilities: e.target.value
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
