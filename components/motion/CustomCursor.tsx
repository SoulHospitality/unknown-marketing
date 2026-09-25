"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });
  const ring = useSpring(hovering ? 1 : 0, { stiffness: 280, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setVisible(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor], .tilt-hot"
      ) as HTMLElement | null;
      if (t) {
        setHovering(true);
        setLabel(t.dataset.cursor || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className={cn(
            "flex items-center justify-center rounded-full border border-sand bg-sand/15"
          )}
          animate={{
            width: hovering ? 84 : 12,
            height: hovering ? 84 : 12,
            backgroundColor: hovering
              ? "rgba(235,228,222,0.12)"
              : "rgba(235,228,222,1)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          {label && (
            <span className="text-[9px] tracking-[0.22em] uppercase text-sand">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] h-1.5 w-1.5 rounded-full bg-nude mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          scale: ring,
          opacity: hovering ? 0 : 1,
        }}
      />
    </>
  );
}
