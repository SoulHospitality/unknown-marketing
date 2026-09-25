"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  once?: boolean;
};

/**
 * Line + word reveal (Locomotive / Basic·Dept typography craft).
 */
export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="tr-line clip-text inline-block align-bottom"><span class="tr-word inline-block will-change-transform">${w}&nbsp;</span></span>`
      )
      .join("");

    const targets = el.querySelectorAll(".tr-word");
    gsap.set(targets, { yPercent: 110, rotate: 4 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      rotate: 0,
      duration: 1.05,
      stagger: 0.045,
      ease: "power4.out",
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [children, delay, once]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
