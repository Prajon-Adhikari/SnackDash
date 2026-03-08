"use client";

import { useCart } from "@/context/CartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { useState } from "react";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(productId, 1);
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={adding}
      className={`w-full relative overflow-hidden group flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white transition-all duration-300 active:scale-95 shadow-xl shadow-black/5 ${
        adding ? "bg-green-500 shadow-green-500/10" : "bg-gray-900 hover:bg-red-500"
      }`}
    >
      <MdAddShoppingCart size={18} className={adding ? "animate-bounce" : "group-hover:-translate-y-1 transition-transform"} />
      <span className="uppercase tracking-widest text-[10px]">
        {adding ? "Item Added!" : "Add To Bag"}
      </span>
      
      {/* Subtle shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>

  );
}

