import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    console.log(email, otp);

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "OTP verified",
      token: "otp-verified",
    });
  } catch (error) {
    console.log("Internal server error during otp verification", error);
    return NextResponse.json(
      { message: "Internal server error during otp verification" },
      { status: 500 }
    );
  }
}
