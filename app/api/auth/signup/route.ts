import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { IUser } from "@/model/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data: IUser = await req.json();

    const { fullName, email, password } = data;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Please fillup all the data" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already used" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Successfully sign up", newUser });
  } catch (error) {
    console.log("Internal error while signup", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
