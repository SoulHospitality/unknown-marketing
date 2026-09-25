import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/lib/motion";
import type { SiteSettings } from "@/lib/cms/types";

export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="overflow-hidden bg-charcoal text-sand">
      <div className="site-container border-b border-sand/10 py-12 sm:py-16 md:py-24">
        <p className="eyebrow mb-5 text-nude sm:mb-6">Next step</p>
        <Link
          href="/start-a-project"
          data-cursor="Start"
          className="group block font-display text-[clamp(2rem,8vw,6.5rem)] leading-display tracking-tight"
        >
          Let&apos;s make it
          <br />
          <span className="text-nude transition-all duration-500 group-hover:tracking-wide">
            UNKNOWN →
          </span>
        </Link>
      </div>

      <div className="site-container py-12 sm:py-16 md:py-20">
        <div className="grid gap-10 sm:gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variant="header" className="mb-6 [&_img]:!h-14 [&_img]:!w-14 sm:[&_img]:!h-16 sm:[&_img]:!w-16" />
            <p className="max-w-sm leading-relaxed text-sand/60">{site.tagline}</p>
            <p className="mt-4 font-script text-xl text-nude sm:text-2xl">
              Unknown today Iconic tomorrow.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5 text-mist">Navigation</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sand/70 transition hover:text-sand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-mist">Contact</p>
            <ul className="space-y-3 text-sand/70">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center break-all hover:text-sand"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
              <li>{site.location}</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4 text-[11px] tracking-[0.2em] uppercase text-sand/50">
              {Object.entries(site.social).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center hover:text-sand"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-sand/10 pt-8 text-sm text-sand/40 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-sand">
              Privacy
            </Link>
            <Link href="/terms" className="inline-flex min-h-10 items-center hover:text-sand">
              Terms
            </Link>
            <Link href="/cookies" className="inline-flex min-h-10 items-center hover:text-sand">
              Cookies
            </Link>
            <Link
              href="/admin"
              className="inline-flex min-h-10 items-center text-[11px] tracking-[0.15em] uppercase text-sand/25 transition hover:text-nude"
            >
              Admin sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
