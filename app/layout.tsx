import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UNKNOWN Marketing Solution",
    template: "%s · UNKNOWN",
  },
  description:
    "Ideas Beyond the Obvious. Strategy, creativity, technology and execution under one roof.",
  keywords: [
    "Creative",
    "Smart",
    "Feminine",
    "Strategic",
    "Modern",
    "Trusted",
    "Impactful",
    "Marketing Agency",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UNKNOWN",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EBE4DE" },
    { media: "(prefers-color-scheme: dark)", color: "#212121" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-sand text-charcoal">
        <SiteShell footer={<Footer site={site} />}>{children}</SiteShell>
      </body>
    </html>
  );
}
