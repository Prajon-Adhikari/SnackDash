import { NextRequest, NextResponse } from "next/server";
import Cart, { ICart, ICartProduct } from "@/model/Cart";
import { verifyToken } from "@/utils/verifyToken";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unathourized" }, { status: 401 });
    }

    const userId = decoded.userId;

    const data = await req.json();

    const { productId, quantity } = data;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ product: productId, quantity }],
      });

      return NextResponse.json(
        { message: "Product is added to cart", cart },
        { status: 201 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item: ICartProduct) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    return NextResponse.json(
      { message: "Cart Updated", cart },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to add to cart", error);
    return NextResponse.json(
      { message: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json({ message: "Fetching cart products", cart });
  } catch (error) {
    console.log("Failed to fetch cart products", error);
    return NextResponse.json(
      { message: "Failed to fetch cart products" },
      { status: 500 }
    );
  }
}
