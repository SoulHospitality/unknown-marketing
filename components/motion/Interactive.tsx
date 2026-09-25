"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 280, damping: 22 };

/** Shared hover spotlight + lift wrapper */
export function HoverLift({
  children,
  className,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ y: -6, scale }}
      whileTap={{ scale: 0.985 }}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}

/** Mouse-follow glow for cards / panels */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 200, damping: 24 });
  const smy = useSpring(my, { stiffness: 200, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(380px circle at ${smx}% ${smy}%, rgba(191,153,144,0.22), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("group relative overflow-visible", className)}
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
      whileHover={{ y: -4 }}
      transition={spring}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
}

export const listItemVariants = {
  rest: { x: 0, opacity: 0.35 },
  hover: { x: 12, opacity: 1 },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};
