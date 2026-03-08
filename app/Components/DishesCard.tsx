import { Dishes } from "@/interfaces/interface";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStar, MdOutlineTimer, MdAdd } from "react-icons/md";

interface Props {
  dish: Dishes;
}

export default function DishesCard({ dish }: Props) {
  return (
    <div className="group relative bg-white rounded-xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-4">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
           <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm">
             <MdOutlineStar className="text-yellow-500" /> {dish.rating || 4.5}
           </div>
        </div>

        <div className="absolute top-2 right-2">
           <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
              <MdAdd size={20} />
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 pb-2 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors line-clamp-1">
                {dish.name}
            </h3>
        </div>
        
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
          {dish.description || "Indulge in our freshly prepared masterpiece with premium ingredients."}
        </p>

        <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</span>
                <span className="text-lg font-black text-gray-900">
                    Rs. {dish.price}
                </span>
            </div>
            
            <Link href={`/dish/${dish._id}`}>
                <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-red-500 transition-colors">
                    Details
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

