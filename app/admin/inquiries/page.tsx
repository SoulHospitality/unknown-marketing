import { getInquiries } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="font-display text-4xl mb-2">Inquiries</h1>
      <p className="text-charcoal/55 mb-8 text-sm">
        Project inquiries from the Start a Project form.
      </p>
      {inquiries.length === 0 ? (
        <p className="text-charcoal/50">No inquiries yet.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inq) => (
            <li key={inq.id} className="border border-charcoal/10 p-5 bg-white/50">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-medium">
                  {inq.name} · {inq.company}
                </p>
                <p className="text-sm text-charcoal/45">{inq.created_at}</p>
              </div>
              <p className="text-sm mt-1">
                {inq.email} · {inq.phone}
              </p>
              <p className="text-sm mt-2 text-charcoal/60">
                Needs: {inq.needs.join(", ") || "—"}
              </p>
              <p className="mt-3 text-charcoal/70">{inq.description}</p>
              <p className="mt-2 text-sm text-charcoal/50">
                Budget: {inq.budget || "—"} · Timeline: {inq.timeline || "—"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
