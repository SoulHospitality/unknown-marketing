import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[720px] px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-10">
          Terms & Conditions
        </h1>
        <div className="space-y-5 text-charcoal/70 leading-relaxed">
          <p>
            By using this website you agree to these terms. Content is provided
            for general information about UNKNOWN Marketing Solution.
          </p>
          <p>
            Case studies and metrics shown may include illustrative seed data
            until live client work is published through the CMS.
          </p>
          <p>
            Project engagements are governed by separate statements of work and
            contracts.
          </p>
        </div>
      </div>
    </section>
  );
}
