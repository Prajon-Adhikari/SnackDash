import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logged Out" });

    response.cookies.set({
      name: "token",
      value: "",
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.log("Failed to logout", error);
    return NextResponse.json({ message: "Failed to logout" });
  }
}
