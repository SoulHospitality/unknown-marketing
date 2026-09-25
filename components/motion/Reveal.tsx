"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal that hydrates safely:
 * SSR + first client paint are identical static markup;
 * motion only activates after mount (skipped when reduced-motion).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduced);
  }, []);

  const classes = cn(className);

  if (!animate) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay, ease: easings.outExpo }}
    >
      {children}
    </motion.div>
  );
}
