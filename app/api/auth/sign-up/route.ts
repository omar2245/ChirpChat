import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user.model";
import { connectedToDB } from "@/lib/mongoose";
import { signAuthToken } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

export async function POST(req: Request) {
  try {
    const { name, username, password } = await req.json();

    if (!name || !username || !password) {
      return NextResponse.json(
        { error: "name, username and password are required" },
        { status: 400 }
      );
    }

    await connectedToDB();

    const normalizedUsername = String(username).trim().toLowerCase();
    const exists = await User.findOne({ username: normalizedUsername });
    if (exists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const createdUser = await User.create({
      id: "",
      name: String(name).trim(),
      username: normalizedUsername,
      password: hashedPassword,
      image: "https://placehold.co/400x400",
      bio: "",
      onBoarded: false,
    });

    createdUser.id = createdUser._id.toString();
    await createdUser.save();

    const token = signAuthToken(createdUser.id);
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
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
