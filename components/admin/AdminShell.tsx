"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/home", label: "Homepage", icon: "◉" },
  { href: "/admin/services", label: "Services", icon: "◇" },
  { href: "/admin/projects", label: "Work", icon: "▣" },
  { href: "/admin/industries", label: "Industries", icon: "⬡" },
  { href: "/admin/articles", label: "Thinking", icon: "✎" },
  { href: "/admin/team", label: "Team", icon: "◎" },
  { href: "/admin/clients", label: "Clients", icon: "✦" },
  { href: "/admin/stats", label: "Numbers", icon: "◈" },
  { href: "/admin/jobs", label: "Careers", icon: "▹" },
  { href: "/admin/site", label: "Site settings", icon: "⚙" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉" },
  { href: "/admin/media", label: "Media", icon: "▣" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem("unknown-admin") === "1";
    setAuthed(ok);
    setChecking(false);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("unknown-admin", "1");
      setAuthed(true);
    } else {
      setError("Invalid password");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    sessionStorage.removeItem("unknown-admin");
    setAuthed(false);
    router.push("/admin");
  };

  if (checking) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal text-sand">
        <div className="admin-orb absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-nude/20 blur-3xl" />
        <motion.p
          className="font-display text-2xl tracking-tight"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          UNKNOWN
        </motion.p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-5 text-sand">
        <div className="pointer-events-none absolute inset-0">
          <div className="admin-orb absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-nude/25 blur-3xl" />
          <div className="admin-orb-slow absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-blush/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(235,228,222,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(235,228,222,0.15)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <motion.form
          onSubmit={login}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md overflow-hidden border border-sand/15 bg-sand/[0.04] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
        >
          <div className="mb-8 flex items-center gap-4">
            <Logo variant="header" className="[&_img]:!h-14 [&_img]:!w-14" />
            <div>
              <p className="eyebrow text-nude">Staff only</p>
              <h1 className="font-display text-3xl leading-display">Sign in</h1>
            </div>
          </div>

          <p className="mb-8 text-sm leading-relaxed text-sand/55">
            Admin access for UNKNOWN CMS. No public registration.
          </p>

          <label className="block space-y-2">
            <span className="text-[11px] tracking-[0.2em] uppercase text-sand/40">
              Password
            </span>
            <div
              className={`relative border-b transition ${
                focused ? "border-nude" : "border-sand/25"
              }`}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="••••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent py-3 text-base outline-none placeholder:text-sand/25"
              />
              <motion.span
                className="pointer-events-none absolute bottom-0 left-0 h-px bg-nude"
                animate={{ scaleX: focused ? 1 : 0 }}
                style={{ originX: 0, width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </label>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-nude"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-8 flex min-h-12 w-full items-center justify-center overflow-hidden bg-sand text-[11px] tracking-[0.22em] uppercase text-charcoal"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-nude transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative z-10">Enter CMS →</span>
          </motion.button>

          <p className="mt-6 text-xs text-sand/30">
            Demo: <code className="text-nude">unknown-admin</code>
          </p>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="admin-app relative flex min-h-screen flex-col text-charcoal md:flex-row">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-sand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(191,153,144,0.18),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(240,219,214,0.35),transparent_40%),linear-gradient(180deg,#EBE4DE_0%,#F4EEE8_100%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#212121_1px,transparent_1px),linear-gradient(90deg,#212121_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Mobile top nav */}
      <div className="sticky top-0 z-30 border-b border-charcoal/10 bg-charcoal/95 text-sand backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo variant="header" className="[&_img]:!h-10 [&_img]:!w-10" />
            <p className="font-display text-lg">CMS</p>
          </div>
          <div className="flex gap-4 text-[10px] tracking-[0.15em] uppercase text-sand/50">
            <Link href="/" className="hover:text-nude">
              Site
            </Link>
            <button type="button" onClick={logout} className="hover:text-nude">
              Log out
            </button>
          </div>
        </div>
        <nav className="flex gap-1.5 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`shrink-0 border px-3 py-2 text-xs whitespace-nowrap transition ${
                  active
                    ? "border-nude bg-nude/20 text-sand"
                    : "border-sand/15 text-sand/55"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="sticky top-0 hidden max-h-screen w-64 shrink-0 overflow-y-auto border-r border-charcoal/10 bg-charcoal text-sand md:flex md:flex-col">
        <div className="relative overflow-hidden border-b border-sand/10 p-6">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-nude/20 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <Logo variant="header" className="[&_img]:!h-12 [&_img]:!w-12" />
            <div>
              <p className="font-display text-xl leading-none">UNKNOWN</p>
              <p className="mt-1 text-[10px] tracking-[0.22em] uppercase text-nude">
                Content Studio
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {links.map((l, i) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            return (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.025, duration: 0.35 }}
              >
                <Link
                  href={l.href}
                  className={`group relative flex items-center gap-3 overflow-hidden px-3 py-2.5 text-sm tracking-wide transition ${
                    active
                      ? "bg-sand text-charcoal"
                      : "text-sand/50 hover:bg-sand/10 hover:text-sand"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="admin-nav-glow"
                      className="absolute inset-y-0 left-0 w-[3px] bg-nude"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span
                    className={`text-[11px] ${active ? "text-nude" : "text-sand/30 group-hover:text-nude"}`}
                  >
                    {l.icon}
                  </span>
                  {l.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="border-t border-sand/10 p-5 space-y-3">
          <button
            type="button"
            onClick={logout}
            className="block text-[11px] tracking-[0.2em] uppercase text-sand/40 transition hover:text-nude"
          >
            Log out
          </button>
          <Link
            href="/"
            className="block text-[11px] tracking-[0.2em] uppercase text-sand/40 transition hover:text-nude"
          >
            View site →
          </Link>
        </div>
      </aside>

      <div className="relative min-w-0 flex-1 p-4 sm:p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
