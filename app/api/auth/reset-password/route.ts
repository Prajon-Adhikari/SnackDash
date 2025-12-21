import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, newPassword, token } = await req.json();

    if (token !== "otp-verified") {
      return NextResponse.json(
        { message: "OTP verification required" },
        { status: 403 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.log("Failed to reset password", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
