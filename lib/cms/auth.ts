import { cookies } from "next/headers";

export const ADMIN_COOKIE = "unknown_admin_session";

export function adminPassword(): string {
  return process.env.ADMIN_DEMO_PASSWORD || "unknown-admin";
}

export function makeAdminToken(): string {
  // Simple signed-ish token for demo CMS (not production-grade)
  const secret = process.env.ADMIN_SECRET || "unknown-cms-secret";
  return Buffer.from(`${adminPassword()}::${secret}`).toString("base64url");
}

export function isValidAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return token === makeAdminToken();
}

export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  return isValidAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

export function getTokenFromRequest(req: Request): string | null {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${ADMIN_COOKIE}=([^;]+)`));
  if (match) return decodeURIComponent(match[1]);
  const header = req.headers.get("x-admin-token");
  return header;
}
