"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt + spotlight on hover — cards, project tiles, service panels.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(520px circle at ${px}% ${py}%, rgba(240,219,214,0.22), transparent 45%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("relative transform-gpu will-change-transform", className)}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        ry.set((x - 0.5) * maxTilt * 2);
        rx.set((0.5 - y) * maxTilt * 2);
        px.set(x * 100);
        py.set(y * 100);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
      {children}
    </motion.div>
  );
}
