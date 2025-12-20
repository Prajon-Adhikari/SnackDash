"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dishes } from "@/interfaces/interface";
import axiosInstance from "@/lib/axiosInstance";

// Dummy Dish Data

const categories = ["All", "Veg", "Non-Veg", "Drinks"];

export default function DishPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState<Dishes[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axiosInstance.get("/dish");
        setDishes(response.data.products);
      } catch (error) {
        console.log("Failed to fetched products", error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6">Menu</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl mb-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Category Filter */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-xl border 
                ${selectedCategory === cat ? "bg-black text-white" : "bg-white"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish: Dishes) => (
            <Link key={dish._id} href={`/dish/${dish._id}`}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 cursor-pointer">
                <div className="w-full h-48 relative rounded-xl overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>

                <h2 className="text-xl font-semibold mt-4">{dish.name}</h2>
                {/* <p className="text-gray-500">{dish.category}</p> */}
                <p className="text-green-600 font-bold mt-1">${dish.price}</p>

                <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-xl text-sm hover:bg-gray-800">
                  See Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {dishes.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No dishes found 😕
          </p>
        )}
      </div>
    </div>
  );
}
