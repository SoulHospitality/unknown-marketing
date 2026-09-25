"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_KEY = "unknown-intro-seen";

export function IntroAnimation({
  onDone,
  onStart,
}: {
  onDone?: () => void;
  onStart?: () => void;
}) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);
  const onDoneRef = useRef(onDone);
  const onStartRef = useRef(onStart);
  onDoneRef.current = onDone;
  onStartRef.current = onStart;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(INTRO_KEY)) {
      onDoneRef.current?.();
      return;
    }

    onStartRef.current?.();
    setShow(true);

    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2300),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => {
        sessionStorage.setItem(INTRO_KEY, "1");
        setShow(false);
        onDoneRef.current?.();
      }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal text-sand"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                scale: phase >= 1 ? 1 : 0.85,
                filter: phase >= 1 ? "blur(0px)" : "blur(12px)",
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl tracking-tight"
            >
              UNKNOWN
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 12 }}
              className="mt-4 text-[11px] tracking-[0.45em] uppercase text-mist"
            >
              Marketing Solution
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 16 }}
              className="mt-8 text-sm md:text-base tracking-[0.2em] uppercase text-nude"
            >
              Ideas Beyond the Obvious.
            </motion.p>

            <motion.div
              className="mx-auto mt-10 h-px w-24 bg-sand/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 4 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
