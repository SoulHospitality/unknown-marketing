"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Magnetic } from "@/components/motion/Magnetic";
import { navLinks } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dark =
    scrolled ||
    (pathname !== "/" && !pathname.startsWith("/work/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        "pt-[env(safe-area-inset-top,0px)]",
        dark
          ? "bg-sand/85 backdrop-blur-xl text-charcoal border-b border-charcoal/5"
          : "text-sand"
      )}
    >
      <div className="site-container flex max-w-[var(--site-max)] items-center justify-between py-3 md:py-3.5">
        <Magnetic strength={0.2}>
          <Logo variant="header" className="relative z-10" />
        </Magnetic>

        <nav className="hidden items-center gap-6 xl:gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="Go"
                className="group relative min-h-11 inline-flex items-center py-1"
              >
                <motion.span
                  className={cn(
                    "block text-[11px] tracking-[0.24em] uppercase transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                  )}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {link.label}
                </motion.span>
                <motion.span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left",
                    dark ? "bg-charcoal" : "bg-sand"
                  )}
                  initial={false}
                  animate={{ scaleX: active ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Magnetic strength={0.3}>
            <ButtonLink
              href="/start-a-project"
              variant={dark ? "primary" : "light"}
              className="!px-5 !py-3 !text-[11px]"
              data-cursor="Brief"
            >
              Start a Project
            </ButtonLink>
          </Magnetic>
        </div>

        <motion.button
          type="button"
          className="relative z-10 flex min-h-11 min-w-11 items-center justify-center text-[11px] tracking-[0.2em] uppercase lg:hidden"
          onClick={() => setOpen((v) => !v)}
          data-cursor="Menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          whileTap={{ scale: 0.95 }}
        >
          {open ? "Close" : "Menu"}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-offset)] z-40 overflow-y-auto border-t border-charcoal/10 bg-sand text-charcoal lg:hidden"
            style={{
              paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="site-container flex min-h-full flex-col gap-2 py-8 sm:py-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  <Link
                    href={link.href}
                    className="font-display block py-3 text-3xl leading-display sm:text-4xl"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <ButtonLink
                href="/start-a-project"
                className="mt-6 w-full justify-center sm:w-fit"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
