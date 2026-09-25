"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "mark" | "wordmark" | "full" | "header";
  className?: string;
  inverted?: boolean;
};

/**
 * Official UNKNOWN logo — your enhanced brand file (transparent PNG).
 * Not a recreated SVG.
 */
export function Logo({ variant = "header", className }: Props) {
  const size =
    variant === "header"
      ? "h-12 w-12 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] xl:h-20 xl:w-20"
      : "h-11 w-11";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label="UNKNOWN Marketing Solution"
      data-cursor="Home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-header.png"
        alt="UNKNOWN"
        width={72}
        height={72}
        className={cn(
          "object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out group-hover:scale-[1.05]",
          size
        )}
      />
    </Link>
  );
}
