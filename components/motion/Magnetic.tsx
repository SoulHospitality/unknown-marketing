"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Stronger magnetic pull + subtle scale — CTAs & nav actions (pointer:fine only) */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });
  const ss = useSpring(scale, { stiffness: 300, damping: 20 });

  const canMagnet = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, scale: ss }}
      className={className ?? "inline-block"}
      onMouseMove={(e) => {
        if (!canMagnet()) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
        scale.set(1.04);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        scale.set(1);
      }}
    >
      {children}
    </motion.div>
  );
}
