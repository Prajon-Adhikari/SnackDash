"use client";

import { useCart } from "@/context/CartContext";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(productId, 1);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-black text-white py-3 rounded-xl mt-8 hover:bg-gray-800 transition"
    >
      Add To Cart
    </button>
  );
}
