"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dishes } from "@/interfaces/interface";

// Dummy Dish Data
const dishes: Dishes[] = [
  { id: 1, name: "Pizza", category: "Veg", image: "/pizza.jpg", price: 300 },
  { id: 2, name: "Burger", category: "Veg", image: "/burger.jpg", price: 400 },
  {
    id: 3,
    name: "Boritto",
    category: "Non-Veg",
    image: "/boritto.jpg",
    price: 500,
  },
  { id: 4, name: "MoMo", category: "Veg", image: "/momo.jpg", price: 200 },
  {
    id: 5,
    name: "Chaumin",
    category: "Veg",
    image: "/chaumin.jpg",
    price: 200,
  },
  {
    id: 6,
    name: "Paella",
    category: "Non-Veg",
    image: "/paella.jpg",
    price: 700,
  },
  {
    id: 7,
    name: "Fish & chips",
    category: "Non-Veg",
    image: "/fishandchip.jpg",
    price: 500,
  },
  { id: 8, name: "Pasta", category: "Veg", image: "/pasta.jpg", price: 250 },
];

const categories = ["All", "Veg", "Non-Veg", "Drinks"];

export default function DishPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === "All" || dish.category === selectedCategory;

    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
          {filteredDishes.map((dish) => (
            <Link key={dish.id} href={`/dish/${dish.name.toLowerCase()}`}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 cursor-pointer">
                <div className="w-full h-48 relative rounded-xl overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-xl font-semibold mt-4">{dish.name}</h2>
                <p className="text-gray-500">{dish.category}</p>
                <p className="text-green-600 font-bold mt-1">
                  ${dish.price.toFixed(2)}
                </p>

                <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-xl text-sm hover:bg-gray-800">
                  See Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No dishes found 😕
          </p>
        )}
      </div>
    </div>
  );
}
