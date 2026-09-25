"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article, ArticleCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

const cats: { id: ArticleCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "marketing", label: "Marketing" },
  { id: "branding", label: "Branding" },
  { id: "digital", label: "Digital" },
  { id: "technology", label: "Technology" },
  { id: "creative", label: "Creative" },
];

export function ThinkingGrid({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState<ArticleCategory | "all">("all");
  const featured = articles.find((a) => a.featured) || articles[0];
  const list = useMemo(() => {
    const rest = articles.filter((a) => a.slug !== featured?.slug);
    return cat === "all" ? rest : rest.filter((a) => a.category === cat);
  }, [articles, cat, featured]);

  return (
    <div>
      {featured && (
        <Reveal>
          <Link
            href={`/thinking/${featured.slug}`}
            className="group mb-16 grid gap-8 border-b border-charcoal/10 pb-16 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-4">
                {featured.category} · {formatDate(featured.date)}
              </p>
              <h2 className="font-display text-3xl leading-display md:text-5xl group-hover:text-nude transition">
                {featured.title}
              </h2>
              <p className="mt-5 text-charcoal/65 text-lg">{featured.excerpt}</p>
              <p className="mt-6 text-[11px] tracking-[0.2em] uppercase">Read →</p>
            </div>
          </Link>
        </Reveal>
      )}

      <div className="flex flex-wrap gap-3 mb-10">
        {cats.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition ${
              cat === c.id
                ? "bg-charcoal text-sand border-charcoal"
                : "border-charcoal/20 text-charcoal/60"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {list.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.05}>
            <Link href={`/thinking/${a.slug}`} className="group block">
              <div className="relative aspect-[16/10] mb-5 overflow-hidden">
                <Image
                  src={a.coverImage}
                  alt={a.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <p className="eyebrow mb-2">{a.category}</p>
              <h3 className="font-display text-2xl leading-display group-hover:text-nude transition">
                {a.title}
              </h3>
              <p className="mt-3 text-charcoal/60 text-sm">{a.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
