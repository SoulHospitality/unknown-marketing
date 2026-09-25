"use client";

import { useState } from "react";
import type { Client, TeamMember, Testimonial, SiteStat, Job } from "@/lib/types";
import {
  Field,
  SaveBar,
  inputClass,
  textareaClass,
  useCmsCollection,
} from "@/components/admin/CmsHooks";

export function TeamEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<TeamMember[]>("team");
  const [active, setActive] = useState(0);
  if (loading || !data) return <p className="text-charcoal/50">Loading…</p>;
  const item = data[active] ?? data[0];
  const update = (patch: Partial<TeamMember>) =>
    setData(data.map((x, i) => (i === active ? { ...x, ...patch } : x)));

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
              setData([
                ...data,
                {
                  id: `tm-${Date.now()}`,
                  name: "New Member",
                  position: "",
                  bio: "",
                  photo: "https://picsum.photos/seed/team/600/800",
                  order: data.length + 1,
                },
              ]);
              setActive(data.length);
            }}
            className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
          >
            + Add member
          </button>
        }
      />
      <h1 className="font-display text-4xl mb-8">Team</h1>
      <EditorLayout
        list={data.map((x) => x.name)}
        active={active}
        setActive={setActive}
      >
        {item && (
          <div className="space-y-5">
            <RemoveBtn
              onClick={() => {
                setData(data.filter((_, i) => i !== active));
                setActive(0);
              }}
            />
            {(
              [
                ["name", "Name"],
                ["position", "Position"],
                ["photo", "Photo URL"],
              ] as const
            ).map(([k, l]) => (
              <Field key={k} label={l}>
                <input
                  className={inputClass}
                  value={item[k]}
                  onChange={(e) => update({ [k]: e.target.value })}
                />
              </Field>
            ))}
            <Field label="Order">
              <input
                type="number"
                className={inputClass}
                value={item.order}
                onChange={(e) => update({ order: Number(e.target.value) })}
              />
            </Field>
            <Field label="Bio">
              <textarea
                className={textareaClass}
                value={item.bio}
                onChange={(e) => update({ bio: e.target.value })}
              />
            </Field>
          </div>
        )}
      </EditorLayout>
    </div>
  );
}

export function ClientsEditor() {
  const clients = useCmsCollection<Client[]>("clients");
  const testimonials = useCmsCollection<Testimonial[]>("testimonials");
  const [tab, setTab] = useState<"clients" | "testimonials">("clients");
  const [active, setActive] = useState(0);

  if (clients.loading || testimonials.loading || !clients.data || !testimonials.data) {
    return <p className="text-charcoal/50">Loading…</p>;
  }

  if (tab === "clients") {
    const data = clients.data;
    const item = data[active] ?? data[0];
    const update = (patch: Partial<Client>) =>
      clients.setData(data.map((x, i) => (i === active ? { ...x, ...patch } : x)));

    return (
      <div>
        <SaveBar
          saving={clients.saving}
          savedAt={clients.savedAt}
          error={clients.error}
          onSave={() => clients.save(data)}
          extra={
            <div className="flex gap-2">
              <TabBtn active={tab === "clients"} onClick={() => { setTab("clients"); setActive(0); }}>
                Clients
              </TabBtn>
              <TabBtn active={false} onClick={() => { setTab("testimonials"); setActive(0); }}>
                Testimonials
              </TabBtn>
              <button
                type="button"
                onClick={() => {
                  clients.setData([
                    ...data,
                    {
                      id: `c-${Date.now()}`,
                      name: "New Client",
                      industry: "",
                      logo: "",
                    },
                  ]);
                  setActive(data.length);
                }}
                className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
              >
                + Add
              </button>
            </div>
          }
        />
        <h1 className="font-display text-4xl mb-2">Clients</h1>
        <p className="mb-8 text-charcoal/55">
          “Brands That Believe In Ideas” on the homepage.
        </p>
        <EditorLayout
          list={data.map((x) => x.name)}
          active={active}
          setActive={setActive}
        >
          {item && (
            <div className="space-y-5">
              <RemoveBtn
                onClick={() => {
                  clients.setData(data.filter((_, i) => i !== active));
                  setActive(0);
                }}
              />
              {(
                [
                  ["name", "Name"],
                  ["industry", "Industry"],
                  ["logo", "Logo URL"],
                ] as const
              ).map(([k, l]) => (
                <Field key={k} label={l}>
                  <input
                    className={inputClass}
                    value={item[k]}
                    onChange={(e) => update({ [k]: e.target.value })}
                  />
                </Field>
              ))}
            </div>
          )}
        </EditorLayout>
      </div>
    );
  }

  const data = testimonials.data;
  const item = data[active] ?? data[0];
  const update = (patch: Partial<Testimonial>) =>
    testimonials.setData(
      data.map((x, i) => (i === active ? { ...x, ...patch } : x))
    );

  return (
    <div>
      <SaveBar
        saving={testimonials.saving}
        savedAt={testimonials.savedAt}
        error={testimonials.error}
        onSave={() => testimonials.save(data)}
        extra={
          <div className="flex gap-2">
            <TabBtn active={false} onClick={() => { setTab("clients"); setActive(0); }}>
              Clients
            </TabBtn>
            <TabBtn active onClick={() => { setTab("testimonials"); setActive(0); }}>
              Testimonials
            </TabBtn>
            <button
              type="button"
              onClick={() => {
                testimonials.setData([
                  ...data,
                  {
                    id: `t-${Date.now()}`,
                    quote: "",
                    name: "",
                    position: "",
                    company: "",
                  },
                ]);
                setActive(data.length);
              }}
              className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
            >
              + Add
            </button>
          </div>
        }
      />
      <h1 className="font-display text-4xl mb-8">Testimonials</h1>
      <EditorLayout
        list={data.map((x) => x.name || "Untitled")}
        active={active}
        setActive={setActive}
      >
        {item && (
          <div className="space-y-5">
            <RemoveBtn
              onClick={() => {
                testimonials.setData(data.filter((_, i) => i !== active));
                setActive(0);
              }}
            />
            <Field label="Quote">
              <textarea
                className={textareaClass}
                value={item.quote}
                onChange={(e) => update({ quote: e.target.value })}
              />
            </Field>
            {(
              [
                ["name", "Name"],
                ["position", "Position"],
                ["company", "Company"],
              ] as const
            ).map(([k, l]) => (
              <Field key={k} label={l}>
                <input
                  className={inputClass}
                  value={item[k]}
                  onChange={(e) => update({ [k]: e.target.value })}
                />
              </Field>
            ))}
          </div>
        )}
      </EditorLayout>
    </div>
  );
}

export function StatsEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<SiteStat[]>("stats");
  if (loading || !data) return <p className="text-charcoal/50">Loading…</p>;

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
            onClick={() =>
              setData([
                ...data,
                {
                  id: `st-${Date.now()}`,
                  label: "New stat",
                  value: "0",
                  verified: true,
                  order: data.length + 1,
                },
              ])
            }
            className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
          >
            + Add stat
          </button>
        }
      />
      <h1 className="font-display text-4xl mb-2">Numbers / Stats</h1>
      <p className="mb-8 text-charcoal/55">Homepage numbers section.</p>
      <div className="space-y-4 max-w-2xl">
        {data.map((s, i) => (
          <div
            key={s.id}
            className="grid gap-3 border border-charcoal/10 bg-white/60 p-4 sm:grid-cols-[1fr_1fr_auto_auto_auto]"
          >
            <input
              className={inputClass}
              placeholder="Value"
              value={s.value}
              onChange={(e) => {
                const next = [...data];
                next[i] = { ...s, value: e.target.value };
                setData(next);
              }}
            />
            <input
              className={inputClass}
              placeholder="Label"
              value={s.label}
              onChange={(e) => {
                const next = [...data];
                next[i] = { ...s, label: e.target.value };
                setData(next);
              }}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={s.verified}
                onChange={(e) => {
                  const next = [...data];
                  next[i] = { ...s, verified: e.target.checked };
                  setData(next);
                }}
              />
              Show
            </label>
            <input
              type="number"
              className={`${inputClass} w-20`}
              value={s.order}
              onChange={(e) => {
                const next = [...data];
                next[i] = { ...s, order: Number(e.target.value) };
                setData(next);
              }}
            />
            <button
              type="button"
              className="text-xs text-red-700"
              onClick={() => setData(data.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JobsEditor() {
  const { data, setData, loading, saving, error, savedAt, save } =
    useCmsCollection<Job[]>("jobs");
  const [active, setActive] = useState(0);
  if (loading || !data) return <p className="text-charcoal/50">Loading…</p>;
  const item = data[active] ?? data[0];
  const update = (patch: Partial<Job>) =>
    setData(data.map((x, i) => (i === active ? { ...x, ...patch } : x)));

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
              setData([
                ...data,
                {
                  id: `job-${Date.now()}`,
                  title: "New Role",
                  department: "",
                  location: "",
                  type: "Full-time",
                  description: "",
                  open: true,
                },
              ]);
              setActive(data.length);
            }}
            className="border border-charcoal/20 px-4 py-2 text-[11px] tracking-[0.15em] uppercase"
          >
            + Add job
          </button>
        }
      />
      <h1 className="font-display text-4xl mb-8">Careers / Jobs</h1>
      <EditorLayout
        list={data.map((x) => x.title)}
        active={active}
        setActive={setActive}
      >
        {item && (
          <div className="space-y-5">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.open}
                onChange={(e) => update({ open: e.target.checked })}
              />
              Open position
            </label>
            <RemoveBtn
              onClick={() => {
                setData(data.filter((_, i) => i !== active));
                setActive(0);
              }}
            />
            {(
              [
                ["title", "Title"],
                ["department", "Department"],
                ["location", "Location"],
                ["type", "Type"],
              ] as const
            ).map(([k, l]) => (
              <Field key={k} label={l}>
                <input
                  className={inputClass}
                  value={item[k]}
                  onChange={(e) => update({ [k]: e.target.value })}
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
          </div>
        )}
      </EditorLayout>
    </div>
  );
}

function EditorLayout({
  list,
  active,
  setActive,
  children,
}: {
  list: string[];
  active: number;
  setActive: (n: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 space-y-1 lg:w-56">
        {list.map((label, i) => (
          <button
            key={label + i}
            type="button"
            onClick={() => setActive(i)}
            className={`block w-full truncate px-3 py-2.5 text-left text-sm ${
              i === active ? "bg-charcoal text-sand" : "bg-white/50"
            }`}
          >
            {label}
          </button>
        ))}
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="text-xs text-red-700"
      onClick={() => {
        if (confirm("Remove?")) onClick();
      }}
    >
      Remove
    </button>
  );
}

function TabBtn({
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
      className={`px-3 py-2 text-[11px] tracking-[0.15em] uppercase ${
        active ? "bg-charcoal text-sand" : "border border-charcoal/20"
      }`}
    >
      {children}
    </button>
  );
}
