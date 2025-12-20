"use client";

import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, deleteFromCart, updateCart } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4"
                >
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500">Rs. {item.product.price}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          if (item.quantity >= 1) {
                            updateCart(item.product._id, item.quantity - 1);
                          }
                        }}
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          if (item.quantity >= 1) {
                            updateCart(item.product._id, item.quantity + 1);
                          }
                        }}
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <p className="font-semibold">
                      Rs. {Number(item.product.price) * item.quantity}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={() => deleteFromCart(item.product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Rs. 100</span>
                </div>
                <div className="flex justify-between font-semibold text-black">
                  <span>Total</span>
                  <span>Rs. {subtotal + 100}</span>
                </div>
              </div>

              <Link href="/protected/payment">
                <button className="mt-6 w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
