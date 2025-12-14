import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import { verifyToken } from "@/utils/verifyToken";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const decoded = verifyToken(req);
    console.log("decoded", decoded);

    if (!decoded) {
      return NextResponse.json(
        { user: null, message: "Unauthorized" },
        { status: 200 }
      );
    }

    const user = await User.findById(decoded.userId).select("-password");

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
