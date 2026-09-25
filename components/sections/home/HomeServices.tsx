"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { ServiceItem } from "@/lib/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 180, damping: 22 });
  const smy = useSpring(my, { stiffness: 180, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smx}% ${smy}%, rgba(191,153,144,0.28), transparent 55%)`;

  return (
    <motion.div
      className="shrink-0"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { scale: 1, y: 0 },
          hover: { scale: 1.035, y: -10 },
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="h-full"
      >
        <Link
          ref={ref}
          href={`/services/${service.slug}`}
          data-cursor="Explore"
          draggable={false}
          onMouseMove={(e) => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 100);
            my.set(((e.clientY - r.top) / r.height) * 100);
          }}
          onMouseLeave={() => {
            mx.set(50);
            my.set(50);
          }}
          className="group relative flex h-[min(520px,70vh)] w-[min(86vw,420px)] flex-col border border-sand/15 bg-sand/[0.04] p-6 sm:h-[58vh] sm:w-[78vw] sm:max-w-[520px] sm:p-8 md:h-[62vh] md:w-[min(42vw,560px)] md:p-10"
        >
          {/* Effects clipped separately so titles aren't cropped */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.span
              className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
            <motion.span
              className="absolute left-0 top-0 h-full w-[3px] origin-top bg-nude"
              variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute inset-0 bg-gradient-to-br from-nude/15 via-transparent to-charcoal/40"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.45 }}
            />
            <motion.span
              className="absolute -bottom-6 -right-2 font-display text-[9rem] leading-none text-sand/[0.06] md:text-[11rem]"
              variants={{
                rest: { opacity: 0, y: 30, scale: 0.9 },
                hover: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </span>

          <div className="relative z-10 flex h-full flex-col overflow-visible">
            <motion.span
              className="inline-block text-[11px] tracking-[0.3em] text-nude"
              variants={{
                rest: { x: 0, opacity: 0.85 },
                hover: { x: 8, opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            <motion.h3
              className="mt-6 font-display text-3xl leading-display sm:mt-8 sm:text-4xl md:text-5xl"
              variants={{
                rest: { x: 0, color: "#EBE4DE" },
                hover: { x: 8, color: "#BF9990" },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {service.title}
            </motion.h3>

            <motion.p
              className="mt-6 max-w-sm leading-relaxed text-sand/55"
              variants={{
                rest: { opacity: 0.7, y: 0 },
                hover: { opacity: 1, y: -2 },
              }}
              transition={{ duration: 0.35 }}
            >
              {service.shortDescription}
            </motion.p>

            <ul className="mt-6 hidden space-y-2 sm:mt-10 sm:block">
              {service.offerings.slice(0, 4).map((o, oi) => (
                <motion.li
                  key={o}
                  className="text-sm leading-snug text-sand/40"
                  variants={{
                    rest: { x: 0, opacity: 0.45 },
                    hover: { x: 10, opacity: 0.9 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: oi * 0.04,
                  }}
                >
                  — {o}
                </motion.li>
              ))}
            </ul>

            <motion.span
              className="mt-auto pt-10 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-nude"
              variants={{ rest: { x: 0 }, hover: { x: 14 } }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              Explore
              <motion.span
                variants={{
                  rest: { x: 0, rotate: 0 },
                  hover: { x: 6, rotate: -20 },
                }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                →
              </motion.span>
            </motion.span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/**
 * Horizontal services — smooth drag with momentum inertia.
 */
export function HomeServices({
  services,
  eyebrow = "What we do",
  heading = "From first idea to final execution.",
}: {
  services: ServiceItem[];
  eyebrow?: string;
  heading?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const state = useRef({
    dragging: false,
    moved: false,
    startX: 0,
    startScroll: 0,
    x: 0,
    target: 0,
    vel: 0,
    lastX: 0,
    lastT: 0,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  const clampScroll = (v: number) => {
    const el = scroller.current;
    if (!el) return v;
    const max = el.scrollWidth - el.clientWidth;
    return Math.max(0, Math.min(max, v));
  };

  const updateControls = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const stopRaf = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
  };

  // Smooth lerp while dragging + inertia after release
  const tick = useCallback(() => {
    const el = scroller.current;
    const s = state.current;
    if (!el) return;

    if (s.dragging) {
      // Ease toward pointer target — buttery follow
      s.x += (s.target - s.x) * 0.22;
      el.scrollLeft = s.x;
      updateControls();
      raf.current = requestAnimationFrame(tick);
      return;
    }

    // Momentum coast
    if (Math.abs(s.vel) > 0.15) {
      s.x = clampScroll(s.x + s.vel);
      s.vel *= 0.955;
      el.scrollLeft = s.x;
      updateControls();
      raf.current = requestAnimationFrame(tick);
      return;
    }

    s.vel = 0;
    raf.current = 0;
  }, [updateControls]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
      stopRaf();
    };
  }, [services.length, updateControls]);

  // Drag / arrows only — never steal vertical page scroll
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Block trackpad/shift-wheel from moving this strip
      if (Math.abs(e.deltaX) > 1) {
        e.preventDefault();
      }
      // Vertical delta passes through → page keeps scrolling
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    stopRaf();
    state.current.vel = 0;
    const card = el.querySelector<HTMLElement>("[data-service-card]");
    const amount = card ? card.offsetWidth + 32 : el.clientWidth * 0.75;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || e.button !== 0) return;

    stopRaf();
    const now = performance.now();
    state.current = {
      dragging: true,
      moved: false,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      x: el.scrollLeft,
      target: el.scrollLeft,
      vel: 0,
      lastX: e.clientX,
      lastT: now,
    };

    el.setPointerCapture(e.pointerId);
    setGrabbing(true);
    raf.current = requestAnimationFrame(tick);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    const s = state.current;
    if (!el || !s.dragging) return;

    const now = performance.now();
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;

    s.target = clampScroll(s.startScroll - dx * 1.15);

    const dt = Math.max(8, now - s.lastT);
    const instantVel = ((s.lastX - e.clientX) / dt) * 16;
    s.vel = s.vel * 0.7 + instantVel * 0.3;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scroller.current;
    const s = state.current;
    if (!el) return;

    s.dragging = false;
    // Amplify flick a bit for a satisfying glide
    s.vel *= 18;
    s.vel = Math.max(-85, Math.min(85, s.vel));
    s.x = el.scrollLeft;

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setGrabbing(false);

    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  return (
    <section className="relative bg-charcoal text-sand">
      <div className="site-container flex flex-wrap items-end justify-between gap-4 pt-20 sm:gap-6 sm:pt-24 md:pt-32">
        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-4 text-nude">{eyebrow}</p>
          <h2 className="font-display max-w-3xl text-[clamp(2rem,6vw,4.5rem)] leading-display whitespace-pre-line">
            {heading}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-3 pb-1">
          <p className="mr-2 hidden text-[11px] tracking-[0.22em] uppercase text-sand/40 md:block">
            Drag or use arrows
          </p>
          <button
            type="button"
            aria-label="Previous services"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="tap-target flex h-11 w-11 items-center justify-center border border-sand/25 text-sand transition hover:border-nude hover:text-nude disabled:opacity-25"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next services"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="tap-target flex h-11 w-11 items-center justify-center border border-sand/25 text-sand transition hover:border-nude hover:text-nude disabled:opacity-25"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        className={`services-scroller mt-8 overflow-x-auto overflow-y-hidden pb-8 pt-4 select-none sm:mt-10 sm:pt-6 ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          // Allow vertical page scroll; horizontal only via drag / arrows
          touchAction: "pan-y",
          overscrollBehaviorX: "none",
        }}
      >
        <div className="flex w-max gap-4 px-[var(--page-pad)] sm:gap-6 md:gap-8 md:px-[var(--page-pad)]">
          {services.map((s, i) => (
            <div key={s.slug} data-service-card>
              <ServiceCard service={s} index={i} />
            </div>
          ))}

          <div className="flex h-[min(520px,70vh)] w-[min(70vw,320px)] shrink-0 items-center sm:h-[58vh] sm:max-w-[420px] md:h-[62vh]">
            <ButtonLink
              href="/services"
              variant="ghost"
              className="!border-sand/40 !text-sand"
            >
              All Services
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="site-container mb-16 sm:mb-20">
        <div className="h-px bg-sand/15">
          <div
            className="h-px origin-left bg-nude transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
