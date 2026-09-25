import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTokenFromRequest, isValidAdminToken } from "@/lib/cms/auth";
import { readCms, resetCms, writeCms } from "@/lib/cms/store";
import type { CmsDatabase } from "@/lib/cms/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function assertAuth(req: Request) {
  return isValidAdminToken(getTokenFromRequest(req));
}

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function GET(req: Request) {
  if (!assertAuth(req)) return unauthorized();
  const db = await readCms();
  return NextResponse.json(db);
}

export async function PUT(req: Request) {
  if (!assertAuth(req)) return unauthorized();
  const body = (await req.json().catch(() => null)) as CmsDatabase | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const saved = await writeCms(body);
  revalidateSite();
  return NextResponse.json(saved);
}

export async function DELETE(req: Request) {
  if (!assertAuth(req)) return unauthorized();
  const saved = await resetCms();
  revalidateSite();
  return NextResponse.json(saved);
}
