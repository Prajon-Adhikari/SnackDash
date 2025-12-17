import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}
