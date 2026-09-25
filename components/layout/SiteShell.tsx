"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IntroAnimation } from "@/components/motion/IntroAnimation";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";
import { Navbar } from "@/components/layout/Navbar";

export function SiteShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [ready, setReady] = useState(true);
  const [introActive, setIntroActive] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setReady(true);
      setIntroActive(false);
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <IntroAnimation
        onStart={() => {
          setIntroActive(true);
          setReady(false);
        }}
        onDone={() => {
          setIntroActive(false);
          setReady(true);
        }}
      />
      <Navbar />
      <main
        className={`flex-1 transition-opacity duration-700 ${
          ready || !introActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <PageTransition key={pathname}>{children}</PageTransition>
      </main>
      {footer}
    </SmoothScroll>
  );
}
