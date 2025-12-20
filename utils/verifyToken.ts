import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(req: NextRequest): JwtPayload | null {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET_KEY missing");
  }

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
