import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[720px] px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-10">Cookie Policy</h1>
        <div className="space-y-5 text-charcoal/70 leading-relaxed">
          <p>
            We use essential cookies and session storage (for example, to skip
            the intro animation after first view). Analytics cookies may be added
            later with consent tooling.
          </p>
        </div>
      </div>
    </section>
  );
}
