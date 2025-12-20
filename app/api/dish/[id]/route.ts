import { NextRequest, NextResponse } from "next/server";
import Product from "@/model/Product";
import { verifyToken } from "@/utils/verifyToken";
import connectDB from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);

    return NextResponse.json({ message: "Fetching product", product });
  } catch (error) {
    console.log("Failed to fetch product", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
