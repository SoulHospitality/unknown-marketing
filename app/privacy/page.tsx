import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        UNKNOWN Marketing Solution respects your privacy. This policy explains
        what information we collect through this website and how we use it.
      </p>
      <p>
        Project briefs submitted via Start a Project are used solely to respond
        to your inquiry and deliver related services. We do not sell personal
        data.
      </p>
      <p>
        When Cloudinary and Supabase are connected, media and form data are
        processed by those providers under their respective terms.
      </p>
    </LegalLayout>
  );
}

function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-sand pt-36 pb-28 md:pt-44">
      <div className="mx-auto max-w-[720px] px-6 md:px-10 prose-unknown">
        <h1 className="font-display text-4xl md:text-5xl mb-10">{title}</h1>
        <div className="space-y-5 text-charcoal/70 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}
