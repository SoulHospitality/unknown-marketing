"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BrandElementId =
  | "ideas"
  | "strategy"
  | "growth"
  | "creativity"
  | "possibilities";

const icons: Record<BrandElementId, ReactNode> = {
  ideas: (
    <path
      fill="currentColor"
      d="M32 4c2.2 10.5 9.5 17.8 20 20-10.5 2.2-17.8 9.5-20 20-2.2-10.5-9.5-17.8-20-20 10.5-2.2 17.8-9.5 20-20z"
    />
  ),
  strategy: (
    <>
      <circle
        cx="26"
        cy="32"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="38"
        cy="32"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </>
  ),
  growth: (
    <path
      d="M16 48 L48 16 M48 16 H28 M48 16 V36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  creativity: (
    <g fill="currentColor">
      <path
        d="M32 54V28"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M32 36c-8-2-14-10-14-18 8 1 14 8 14 18z" />
      <path d="M32 34c8-1 14-8 14-16-7 2-13 8-14 16z" />
    </g>
  ),
  possibilities: (
    <circle
      cx="32"
      cy="32"
      r="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  ),
};

const iconHover: Record<
  BrandElementId,
  { rotate?: number; scale?: number; y?: number }
> = {
  ideas: { rotate: 45, scale: 1.15 },
  strategy: { scale: 1.12, rotate: -8 },
  growth: { y: -6, scale: 1.12 },
  creativity: { scale: 1.18, y: -4 },
  possibilities: { scale: 1.2, rotate: 12 },
};

export const brandElements: {
  id: BrandElementId;
  label: string;
}[] = [
  { id: "ideas", label: "Ideas" },
  { id: "strategy", label: "Strategy" },
  { id: "growth", label: "Growth" },
  { id: "creativity", label: "Creativity" },
  { id: "possibilities", label: "Possibilities" },
];

export function BrandIcon({
  id,
  className,
}: {
  id: BrandElementId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      aria-hidden
    >
      {icons[id]}
    </svg>
  );
}

function BrandElementItem({
  id,
  label,
  index,
  bordered,
}: {
  id: BrandElementId;
  label: string;
  index: number;
  bordered: boolean;
}) {
  return (
    <motion.li
      data-cursor={label}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        delay: index * 0.08,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative flex cursor-default flex-col items-center px-4 py-6 text-center",
        bordered && "lg:border-l lg:border-charcoal/15"
      )}
    >
      <motion.div
        className="relative flex w-full flex-col items-center"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.span
          className="pointer-events-none absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full"
          variants={{
            rest: { backgroundColor: "rgba(191,153,144,0)", scale: 0.8 },
            hover: {
              backgroundColor: "rgba(191,153,144,0.22)",
              scale: 1.35,
            },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />

        <motion.div
          className="relative z-10 mb-5"
          variants={{
            rest: { rotate: 0, scale: 1, y: 0, color: "#212121" },
            hover: {
              ...iconHover[id],
              color: "#BF9990",
            },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <BrandIcon id={id} className="h-12 w-12" />
        </motion.div>

        <motion.span
          className="eyebrow relative z-10"
          variants={{
            rest: { y: 0, color: "rgba(33,33,33,0.7)", letterSpacing: "0.28em" },
            hover: {
              y: 2,
              color: "#212121",
              letterSpacing: "0.34em",
            },
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {label}
        </motion.span>

        <motion.span
          className="relative z-10 mt-4 h-px w-10 bg-nude"
          variants={{
            rest: { scaleX: 0.35, opacity: 0.35 },
            hover: { scaleX: 1.6, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.li>
  );
}

export function BrandElementsRow({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0",
        className
      )}
    >
      {brandElements.map((el, i) => (
        <BrandElementItem
          key={el.id}
          id={el.id}
          label={el.label}
          index={i}
          bordered={i > 0}
        />
      ))}
    </ul>
  );
}
