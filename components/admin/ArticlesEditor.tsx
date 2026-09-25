"use client";

import { useState } from "react";
import type { Article, ArticleCategory } from "@/lib/types";
import {
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

const CATS: ArticleCategory[] = [
  "marketing",
  "branding",
  "digital",
  "technology",
  "creative",
  "news",
];

function empty(): Article {
  return {
    slug: `article-${Date.now()}`,
    title: "New Article",
    excerpt: "",
    category: "marketing",
    coverImage: "https://picsum.photos/seed/article/1200/800",
    author: "UNKNOWN",
    date: new Date().toISOString().slice(0, 10),
    content: "",
    featured: false,
    published: true,
  };
}

export function ArticlesEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<Article[]>("articles");
  const [active, setActive] = useState(0);

  if (loading || !data) return <p className="text-charcoal/50">Loading…</p>;
  const item = data[active] ?? data[0];
  const update = (patch: Partial<Article>) => {
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
            + Add article
          </button>
        }
      />
      <h1 className="font-display text-4xl mb-2">Thinking / Articles</h1>
      <p className="mb-8 text-charcoal/55">Content for the Thinking page.</p>
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
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                />
                Featured
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
                  if (!confirm("Remove?")) return;
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
                  ["author", "Author"],
                  ["date", "Date"],
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
              <Field label="Category">
                <select
                  className={inputClass}
                  value={item.category}
                  onChange={(e) =>
                    update({ category: e.target.value as ArticleCategory })
                  }
                >
                  {CATS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Excerpt">
              <textarea
                className={textareaClass}
                value={item.excerpt}
                onChange={(e) => update({ excerpt: e.target.value })}
              />
            </Field>
            <Field label="Content (markdown / plain text)">
              <textarea
                className={`${textareaClass} min-h-[220px]`}
                value={item.content}
                onChange={(e) => update({ content: e.target.value })}
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
