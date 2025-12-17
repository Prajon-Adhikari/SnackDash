import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Cart, { ICart, ICartProduct } from "@/model/Cart";
import Order from "@/model/Order";
import connectDB from "@/lib/mongodb";
import { IProduct } from "@/model/Product";
import { Types } from "mongoose";

function isPopulatedProduct(
  product: Types.ObjectId | IProduct
): product is IProduct {
  return typeof product === "object" && "price" in product;
}

const stripe = new Stripe(process.env.NEXT_WEBHOOK_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.NEXT_WEBHOOK_STRIPE_SECRET_KEY!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    try {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment Succecced", paymentIntent);

      const userId = paymentIntent.metadata.userId;

      console.log({ userId });

      // 🔽 YOUR CODE GOES HERE
      const cart = await Cart.findOne({ userId }).populate("items.product");

      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ message: "Cart empty" });
      }

      const subtotal = cart.items.reduce((sum: number, item: ICartProduct) => {
        if (!isPopulatedProduct(item.product)) {
          throw new Error("Product not populated");
        }
        return sum + Number(item.product.price) * item.quantity;
      }, 0);

      // ✅ Create order safely
      const newOrder = await Order.create({
        userId,
        items: cart.items.map((item: ICartProduct) => {
          if (!isPopulatedProduct(item.product)) {
            throw new Error("Product not populated");
          }

          return {
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          };
        }),
        subtotal,
        deliveryFee: 100,
        totalAmount: subtotal + 100,
        paymentIntentId: paymentIntent.id,
        paymentStatus: "paid",
      });

      cart.items = [];
      await cart.save();

      return NextResponse.json(
        { message: "Order Created Successfully", newOrder },
        { status: 200 }
      );
    } catch (error) {
      console.log("Internal error while creating order", error);
      return NextResponse.json(
        { message: "Internal error while creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
