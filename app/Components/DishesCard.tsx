import { Dishes } from "@/interfaces/interface";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  dish: Dishes;
}

export default function DishesCard({ dish }: Props) {
  return (
    <div className="max-w-sm bg-white rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative w-full h-62.5 overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="100%"
          className=" object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 text-sm font-semibold rounded-full shadow">
          Rs. {dish.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
        <p className="text-gray-500 text-sm mt-1">
          Loaded with mozzarella cheese & fresh herbs.
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-gray-300 text-sm">⭐</span>
          <span className="text-gray-600 text-sm ml-1">(4.0)</span>
        </div>

        {/* Button */}
        <Link href={`/dish/${dish._id}`}>
          <button className="w-full mt-4 bg-gray-900 cursor-pointer text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
}
