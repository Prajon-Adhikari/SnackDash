import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginData {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data: LoginData = await req.json();

    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fillup all the data" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Password Does not matched" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT SECRET KEY is not defined");
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      message: "Successfully sign up",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log("Internal error while signup", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
