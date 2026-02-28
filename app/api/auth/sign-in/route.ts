import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";
import { signAuthToken } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: "username and password are required" },
        { status: 400 }
      );
    }

    await connectedToDB();
    const normalizedUsername = String(username).trim().toLowerCase();
    const user = await User.findOne({ username: normalizedUsername }).select(
      "+password"
    );

    if (!user?.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(String(password), user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signAuthToken(user.id);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
