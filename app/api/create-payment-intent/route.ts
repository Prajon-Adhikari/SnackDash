import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const decoded = verifyToken(req);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.userId;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: userId.toString(),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Internal server error", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 20,
    });

    return NextResponse.json(payments.data);
  } catch (error) {
    console.log("Internal error while fetching payments", error);
    return NextResponse.json({
      message: "Internal error while fetching payments",
    });
  }
}
