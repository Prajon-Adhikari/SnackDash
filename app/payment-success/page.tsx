"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <FaCheckCircle className="text-green-600" size={48} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-3">
          Thank you for your purchase! Your payment has been processed
          successfully and your order is now confirmed.
        </p>

        {/* Info Box */}
        <div className="bg-gray-50 border rounded-lg p-4 mt-6 text-sm text-gray-600">
          A confirmation email has been sent to your registered email address
          with order details.
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/order">
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              View My Orders
            </button>
          </Link>

          <Link href="/">
            <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          If you have any issues, please contact support.
        </p>
      </div>
    </div>
  );
}
