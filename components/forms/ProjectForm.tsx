"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const needsOptions = [
  "Marketing",
  "Branding",
  "Digital",
  "Content",
  "Production",
  "Website",
  "App",
  "Events",
  "Something Else",
];

const budgets = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
];

const timelines = ["ASAP", "1–3 Months", "3–6 Months", "6+ Months"];

export function ProjectForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    website: "",
    location: "",
    needs: [] as string[],
    description: "",
    budget: "",
    timeline: "",
  });

  const update = (key: string, value: string | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleNeed = (need: string) => {
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(need)
        ? f.needs.filter((n) => n !== need)
        : [...f.needs, need],
    }));
  };

  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border border-charcoal/10 bg-blush/30 p-10 md:p-14 text-center">
        <h2 className="font-display text-4xl mb-4">Brief received.</h2>
        <p className="text-charcoal/65 mb-8">
          We’ll review your project and get back to you soon.
        </p>
        <ButtonLink href="/">Back Home</ButtonLink>
      </div>
    );
  }

  return (
    <div className="border border-charcoal/10 bg-white/40 p-5 sm:p-6 md:p-10">
      <p className="eyebrow mb-6 sm:mb-8">Step 0{step} of 06</p>

      {step === 1 && (
        <fieldset className="space-y-5">
          <legend className="mb-6 font-display text-2xl sm:text-3xl">About You</legend>
          {(
            [
              ["name", "Name"],
              ["company", "Company"],
              ["email", "Email"],
              ["phone", "Phone"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block">
              <span className="eyebrow mb-2 block">{label}</span>
              <input
                className="w-full border-b border-charcoal/20 bg-transparent py-3 text-base outline-none focus:border-charcoal"
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                autoComplete={
                  key === "email" ? "email" : key === "name" ? "name" : "organization"
                }
                inputMode={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
              />
            </label>
          ))}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-3xl mb-6">Your Business</legend>
          {(
            [
              ["industry", "Industry"],
              ["website", "Company Website"],
              ["location", "Location"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block">
              <span className="eyebrow mb-2 block">{label}</span>
              <input
                className="w-full border-b border-charcoal/20 bg-transparent py-3 text-base outline-none focus:border-charcoal"
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </label>
          ))}
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="font-display text-3xl mb-6">What Do You Need?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {needsOptions.map((n) => (
              <label
                key={n}
                className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 ${
                  form.needs.includes(n)
                    ? "border-charcoal bg-charcoal text-sand"
                    : "border-charcoal/15"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={form.needs.includes(n)}
                  onChange={() => toggleNeed(n)}
                />
                {n}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend className="font-display text-3xl mb-6">Tell Us More</legend>
          <textarea
            rows={6}
            className="w-full border border-charcoal/15 bg-transparent p-4 outline-none focus:border-charcoal"
            placeholder="Tell us about your project..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </fieldset>
      )}

      {step === 5 && (
        <fieldset>
          <legend className="font-display text-3xl mb-6">Budget</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {budgets.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => update("budget", b)}
                className={`border px-4 py-3 text-left ${
                  form.budget === b
                    ? "border-charcoal bg-charcoal text-sand"
                    : "border-charcoal/15"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 6 && (
        <fieldset>
          <legend className="font-display text-3xl mb-6">Timeline</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {timelines.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => update("timeline", t)}
                className={`border px-4 py-3 text-left ${
                  form.timeline === t
                    ? "border-charcoal bg-charcoal text-sand"
                    : "border-charcoal/15"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="min-h-11 text-[11px] tracking-[0.2em] uppercase disabled:opacity-30"
        >
          ← Back
        </button>
        {step < 6 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(6, s + 1))}
            className="min-h-11 bg-charcoal px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-sand transition hover:bg-nude hover:text-charcoal"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "loading"}
            className="min-h-11 bg-charcoal px-7 py-4 text-[11px] tracking-[0.18em] uppercase text-sand transition hover:bg-nude hover:text-charcoal disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Project Brief →"}
          </button>
        )}
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
