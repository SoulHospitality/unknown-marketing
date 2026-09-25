"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin top progress — always-on scroll feedback */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOn(!reduced);
  }, []);

  if (!on) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] origin-left bg-nude"
      style={{ scaleX }}
    />
  );
}
