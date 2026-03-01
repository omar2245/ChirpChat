import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const secret = process.env.KEEPALIVE_SECRET;
  const provided = req.headers.get("x-keepalive-secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
