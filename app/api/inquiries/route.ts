import { NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry } from "@/lib/content";

const schema = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  website: z.string().optional(),
  location: z.string().optional(),
  needs: z.array(z.string()).default([]),
  description: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  timeline: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const result = await createInquiry(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Invalid" },
      { status: 400 }
    );
  }
}
