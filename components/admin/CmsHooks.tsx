"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export function useCmsCollection<T>(collection: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/content/${collection}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(res.status === 401 ? "Unauthorized" : "Failed to load");
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (next: T) => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/content/${collection}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error(res.status === 401 ? "Unauthorized" : "Failed to save");
      const saved = (await res.json()) as T;
      setData(saved);
      setSavedAt(new Date().toLocaleTimeString());
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, loading, saving, error, savedAt, save, reload: load };
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] tracking-[0.18em] uppercase text-charcoal/45">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "admin-input w-full border border-charcoal/10 bg-white/80 px-3.5 py-3 text-sm outline-none transition focus:border-nude focus:bg-white focus:shadow-[0_0_0_3px_rgba(191,153,144,0.18)]";

export const textareaClass = `${inputClass} min-h-[110px] resize-y`;

export function AdminPageHeader({
  eyebrow = "CMS",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative mb-8 overflow-hidden border border-charcoal/10 bg-white/50 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-nude/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-blush/40 blur-3xl" />
      <p className="eyebrow relative mb-3 text-nude">{eyebrow}</p>
      <h1 className="relative font-display text-3xl leading-display sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/55 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-charcoal/10 bg-white/60 p-5 shadow-[0_20px_60px_rgba(33,33,33,0.04)] backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function SaveBar({
  saving,
  savedAt,
  error,
  onSave,
  extra,
}: {
  saving: boolean;
  savedAt: string | null;
  error: string;
  onSave: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-4 mb-8 flex flex-wrap items-center gap-3 border-b border-charcoal/10 bg-sand/80 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
      <motion.button
        type="button"
        onClick={onSave}
        disabled={saving}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-charcoal px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase text-sand disabled:opacity-50"
      >
        <span
          className={`absolute inset-0 bg-nude/30 ${saving ? "admin-save-pulse" : ""}`}
        />
        <span className="relative z-10">
          {saving ? "Saving…" : "Save changes"}
        </span>
      </motion.button>
      {savedAt && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-charcoal/45"
        >
          Saved {savedAt}
        </motion.span>
      )}
      {error && <span className="text-xs text-red-700">{error}</span>}
      <div className="ml-auto flex flex-wrap items-center gap-2">{extra}</div>
    </div>
  );
}

export function AdminListButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative block w-full truncate px-3 py-2.5 text-left text-sm transition ${
        active
          ? "bg-charcoal text-sand"
          : "bg-white/70 text-charcoal/70 hover:bg-white hover:text-charcoal"
      }`}
    >
      {active && (
        <span className="absolute inset-y-0 left-0 w-[3px] bg-nude" />
      )}
      {children}
    </button>
  );
}

export function AdminGhostButton({
  onClick,
  children,
  danger,
}: {
  onClick: () => void;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 text-xs transition ${
        danger
          ? "border-red-300 text-red-700 hover:bg-red-50"
          : "border-charcoal/15 hover:border-charcoal hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

export function AdminLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-charcoal/45">
      <motion.div
        className="h-10 w-10 border border-charcoal/15 border-t-nude"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-sm tracking-wide">{label}</p>
    </div>
  );
}
