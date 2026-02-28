import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "./models/user.model";
import { connectedToDB } from "./mongoose";
import { AUTH_COOKIE_NAME } from "./auth-constants";

type JwtPayload = {
  sub: string;
};

function getJwtSecret() {
  return process.env.JWT_SECRET || "dev_only_change_me";
}

export function signAuthToken(userId: string) {
  return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return getUserFromToken(token);
}

export async function getUserFromToken(token?: string) {
  if (!token) return null;

  const payload = verifyAuthToken(token);
  if (!payload?.sub) return null;

  await connectedToDB();
  return User.findOne({ id: payload.sub }).select("-password");
}
