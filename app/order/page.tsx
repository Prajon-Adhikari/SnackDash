"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaBox } from "react-icons/fa";
import axiosInstance from "@/lib/axiosInstance";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axiosInstance.get("/order");
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-20">No orders found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-xl p-6">
            {/* Order Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order._id}</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-sm font-medium capitalize">
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="border rounded-lg divide-y">
              {order.items.map((item: any) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FaBox />
                <span className="capitalize">{order.orderStatus}</span>
              </div>

              <p className="font-bold text-lg">Total: ₹{order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
