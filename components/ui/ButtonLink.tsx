"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
  "data-cursor"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  "data-cursor": cursor,
}: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-cursor={cursor || "Open"}
      className={cn(
        "group relative inline-flex min-h-11 items-center gap-3 overflow-hidden text-sm tracking-[0.18em] uppercase transition-all duration-500 ease-out",
        variant === "primary" &&
          "bg-charcoal text-sand px-6 py-3.5 sm:px-7 sm:py-4 hover:text-charcoal",
        variant === "ghost" &&
          "link-underline text-charcoal border-b border-transparent pb-1",
        variant === "light" &&
          "bg-sand text-charcoal px-6 py-3.5 sm:px-7 sm:py-4 hover:bg-nude",
        className
      )}
    >
      {(variant === "primary") && (
        <span className="absolute inset-0 origin-left scale-x-0 bg-nude transition-transform duration-500 ease-out group-hover:scale-x-100" />
      )}
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
        →
      </span>
    </Link>
  );
}
