"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaBox, FaShoppingBag } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlinePayment, MdReceipt } from "react-icons/md";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-6">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaShoppingBag className="text-3xl text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">No Orders Yet</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
            Looks like you haven't placed any orders yet. Explore our delicious menu and find something you love.
          </p>
          <Link href="/dishes">
            <button className="w-full bg-gray-900 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-black/5 active:scale-95">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Order History</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">Tracking all your delicious moments.</p>
        </header>

        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <MdReceipt size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order ID</p>
                    <p className="text-xs font-bold text-gray-700 truncate max-w-[150px]">{order._id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Payment Status</p>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <FaCheckCircle className={order.paymentStatus === 'paid' ? 'text-green-500' : 'text-amber-500'} size={12} />
                      <span className="text-[11px] font-black uppercase tracking-wider text-gray-700">{order.paymentStatus}</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                  <div className="flex flex-col items-center sm:items-end">
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Grand Total</p>
                     <p className="text-lg font-black text-gray-900 leading-none mt-1">₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="p-0">
                <div className="divide-y divide-gray-50">
                  {order.items.map((item: any) => (
                    <div key={item.product} className="flex items-center justify-between p-6 bg-white transition-colors hover:bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                          <div className="flex items-center gap-2">
                             <div className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase">Qty: {item.quantity}</div>
                             <p className="text-xs text-gray-400 font-medium tracking-tight">₹{item.price} each</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-black text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <FaBox className="text-red-500/50" size={12} />
                  <span>Status: <span className="text-gray-700">{order.orderStatus}</span></span>
                </div>
                <button className="text-[11px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors">
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

