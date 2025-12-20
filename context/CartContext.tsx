"use client";

import { Dishes } from "@/interfaces/interface";
import axiosInstance from "@/lib/axiosInstance";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface CartItem {
  product: Dishes;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCart: (productId: string, quantity: number) => Promise<void>;
  deleteFromCart: (productId: string) => Promise<void>;
  itemLength: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch cart items from server (cookies handle auth)
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/cart");
      setItems(response.data.cart?.items || []);
    } catch (error) {
      console.log("Failed to fetch cart:", error);
      setItems([]); // Clear cart if fetch fails (user not logged in)
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart whenever user is logged in
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchCart();
      } else {
        setItems([]); // Clear cart for guests
      }
    }
  }, [authLoading, user]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await axiosInstance.post("/cart", { productId, quantity });
      await fetchCart();
    } catch (error) {
      console.log("Failed to add cart:", error);
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      await axiosInstance.patch("/cart", { productId, quantity });
      await fetchCart();
    } catch (error) {
      console.log("Failed to update cart:", error);
    }
  };

  const deleteFromCart = async (productId: string) => {
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      await fetchCart();
    } catch (error) {
      console.log("Failed to delete from cart:", error);
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
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
