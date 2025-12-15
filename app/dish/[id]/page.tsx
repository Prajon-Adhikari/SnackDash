"use client";

import Image from "next/image";
import { Dishes } from "@/interfaces/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Dishes>({
    _id: "",
    name: "",
    price: "",
    description: "",
    variation: [],
    image: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/dish/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen mt-14  flex justify-center py-10">
      <div className="w-full max-w-7xl p-10">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Dish Image */}
          <div className="w-full h-80 lg:h-105 relative rounded-2xl overflow-hidden shadow-md">
            <Image
              src={product.image || "/placeholder.png"} // fallback image
              alt={product.name || "Dish image"}
              fill
              className="object-cover"
            />
          </div>

          {/* Dish Info */}
          <div className="flex flex-col justify-between">
            {/* Title + Description */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              <p className="text-3xl font-bold text-green-600 mt-6">
                ${product.price}
              </p>
            </div>

            {/* Variations */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Choose Variation</h2>

              <div className="grid grid-cols-3 gap-4">
                <button className="border cursor-pointer rounded-xl py-3 text-center hover:bg-gray-100 transition">
                  Steamed
                </button>
                <button className="border rounded-xl py-3 cursor-pointer text-center hover:bg-gray-100 transition">
                  Fried
                </button>
                <button className="border rounded-xl py-3 cursor-pointer text-center  hover:bg-gray-100 transition">
                  Paneer
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Quantity</h2>

              <div className="flex items-center gap-5">
                <button className="w-12 h-12 border rounded-xl text-2xl">
                  -
                </button>
                <p className="text-2xl font-medium">1</p>
                <button className="w-12 h-12 border rounded-xl text-2xl">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="mt-10 w-full bg-black text-white text-lg font-semibold py-4 rounded-xl hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
