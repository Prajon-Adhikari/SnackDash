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

    const product = await Product.findById(id).sort({ createdAt: -1 });

    return NextResponse.json({ message: "Fetching product", product });
  } catch (error) {
    console.log("Failed to fetch product", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const data = await req.json();

    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { $new: true }
    );

    return NextResponse.json({ message: "Product updated", product: updated });
  } catch (error) {
    console.log("Failed to update dish", error);
    return NextResponse.json(
      { message: "Failed to update dish" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.log("Failed to delete product", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
