"use client";

import { Dishes } from "@/interfaces/interface";
import axiosInstance from "@/lib/axiosInstance";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  product: Dishes;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCart: (productId: string, quantity: number) => Promise<void>;
  deleteFromCart: (productId: string) => Promise<void>;
  itemLength: Number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/cart");
      setItems(response.data.cart.items || []);
    } catch (error) {
      console.log("Failed to fetch cart product", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: String, quantity: Number) => {
    try {
      await axiosInstance.post("/cart", {
        productId,
        quantity,
      });
      router.push("/");
      await fetchCart();
    } catch (error) {
      console.log("Failed to add cart", error);
    }
  };

  const updateCart = async (productId: String, quantity: Number) => {
    try {
      await axiosInstance.patch("/cart", {
        productId,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.log("Failed to add cart", error);
    }
  };

  const deleteFromCart = async (productId: String) => {
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      await fetchCart();
    } catch (error) {
      console.log("Failed to add cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateCart,
        deleteFromCart,
        itemLength: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
