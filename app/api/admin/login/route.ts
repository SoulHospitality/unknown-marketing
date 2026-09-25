import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPassword,
  makeAdminToken,
} from "@/lib/cms/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (body.password !== adminPassword()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = makeAdminToken();
  const res = NextResponse.json({ ok: true, token });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
