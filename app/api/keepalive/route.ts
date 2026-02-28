import { NextResponse } from "next/server";
import { connectedToDB } from "@/lib/mongoose";

export async function GET(req: Request) {
  const secret = process.env.KEEPALIVE_SECRET;
  const provided = req.headers.get("x-keepalive-secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectedToDB();
    await conn.connection.db.admin().ping();
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
