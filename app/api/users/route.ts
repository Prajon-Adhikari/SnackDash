import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");

    const users = await db.collection("users").find().toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.log("Internal error while fetching users data", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("mydb");

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Save user into MongoDB
    const result = await db.collection("users").insertOne({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.log("Internal error while posting user data", error);
    return new Response(JSON.stringify({ error: "Failed to post user data" }), {
      status: 500,
    });
  }
}
