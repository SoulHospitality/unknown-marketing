import { NextResponse } from "next/server";
import { getUploadSignature, hasCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  if (!hasCloudinary()) {
    return NextResponse.json(
      { ok: false, error: "Cloudinary not configured" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const folder = typeof body.folder === "string" ? body.folder : "unknown";
  const signature = getUploadSignature(folder);
  return NextResponse.json({ ok: true, ...signature });
}
