import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTokenFromRequest, isValidAdminToken } from "@/lib/cms/auth";
import { readCms, setCollection } from "@/lib/cms/store";
import type { CmsCollection, CmsDatabase } from "@/lib/cms/types";

const COLLECTIONS: CmsCollection[] = [
  "services",
  "projects",
  "industries",
  "articles",
  "team",
  "clients",
  "testimonials",
  "stats",
  "jobs",
  "inquiries",
  "home",
  "site",
];

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function isCollection(key: string): key is CmsCollection {
  return (COLLECTIONS as string[]).includes(key);
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ collection: string }> }
) {
  if (!isValidAdminToken(getTokenFromRequest(req))) return unauthorized();
  const { collection } = await ctx.params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const db = await readCms();
  return NextResponse.json(db[collection]);
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ collection: string }> }
) {
  if (!isValidAdminToken(getTokenFromRequest(req))) return unauthorized();
  const { collection } = await ctx.params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const saved = await setCollection(
    collection,
    body as CmsDatabase[typeof collection]
  );
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  return NextResponse.json(saved);
}
