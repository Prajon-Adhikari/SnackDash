import { NextRequest, NextResponse } from "next/server";
import Product from "@/model/Product";
import { IProduct } from "@/model/Product";
import { verifyToken } from "@/utils/verifyToken";
import uploadToCloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const variation = formData.get("variation") as string;
    const rating = Number(formData.get("rating"));
    const imageFile = formData.get("image") as File;

    if (!name || !price || !description || !imageFile || !variation) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const uploadResult: any = await uploadToCloudinary(imageFile);

    const newProduct = await Product.create({
      name,
      price,
      description,
      variation,
      rating,
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.log("Failed to add product", error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const products = await Product.find();

    return NextResponse.json({ message: "Fetching products", products });
  } catch (error) {
    console.log("Failed to fetch products", error);
    return NextResponse.json({ message: "Failed to fetch products" });
  }
}
