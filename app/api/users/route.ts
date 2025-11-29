import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
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

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.log("Internal error while posting user data", error);
    return new Response(JSON.stringify({ error: "Failed to post user data" }), {
      status: 500,
    });
  }
}
