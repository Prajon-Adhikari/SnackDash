import { NextResponse, NextRequest } from "next/server";
import Order from "@/model/Order";
import { verifyToken } from "@/utils/verifyToken";
import connectDB from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;

    const orders = await Order.find({ userId });

    return NextResponse.json({ message: "Fetching orders", orders });
  } catch (error) {
    console.log("Failed to fetched orders", error);
    return NextResponse.json(
      { message: "Failed to fetched orders" },
      { status: 500 }
    );
  }
}
