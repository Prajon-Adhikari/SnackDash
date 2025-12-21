import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import sendEmail from "@/lib/sendEmail";
import { generateOtp } from "@/lib/generateOtp";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOtp();

    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(email, "OTP Verification", `Your Otp is ${otp}`);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Failed to send otp", error);
    return NextResponse.json(
      { message: "Failed to send otp" },
      { status: 500 }
    );
  }
}
