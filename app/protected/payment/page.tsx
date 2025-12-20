"use client";

import CheckoutPage from "../../Components/CheckoutPage";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/context/CartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Payment() {
  const { items } = useCart();

  const amount = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Secure Payment</h2>

          {amount > 0 ? (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubCurrency(amount),
                currency: "usd",
                paymentMethodCreation: "manual",
              }}
            >
              <CheckoutPage amount={amount} />
            </Elements>
          ) : (
            <p className="text-gray-500 text-center">
              Your cart is empty. Add items to pay.
            </p>
          )}

          <p className="text-sm text-gray-500 mt-4 text-center">
            Payments are secured and encrypted by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
