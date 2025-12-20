import { NextRequest, NextResponse } from "next/server";
import Cart, { ICart, ICartProduct } from "@/model/Cart";
import "@/model/Product";
import { verifyToken } from "@/utils/verifyToken";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
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
    await connectDB();

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

export async function PATCH(req: NextRequest) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;
    const { productId, quantity } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { message: "Quantity cannot be negative" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const cartIndex = cart.items.findIndex(
      (item: ICartProduct) => item.product.toString() === productId
    );

    if (cartIndex === -1) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      cart.items.splice(cartIndex, 1);
    } else {
      cart.items[cartIndex].quantity = quantity;
    }

    await cart.save();

    return NextResponse.json({ message: "Cart Updated succssfully", cart });
  } catch (error) {
    console.log("Internal error while updating cart", error);
    return NextResponse.json(
      { message: "Internal error while updating cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;
    const { productId } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item: ICartProduct) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }

    await cart.save();

    return NextResponse.json(
      { message: "Product removed from cart", cart },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to delete cart item", error);
    return NextResponse.json(
      { message: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
