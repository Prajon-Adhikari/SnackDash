import { Food } from "@/interfaces/interface";
import React from "react";
import Image from "next/image";

interface Props {
  food: Food;
}

export default function FoodCard({ food }: Props) {
  return (
    <div
      className={`h-46 rounded-2xl text-white p-4 flex flex-row-reverse items-start`}
      style={{ background: food.bg }}
    >
      <div className="relative w-[200px] h-[200px]">
        <Image
          src={food.image}
          alt="Food Image"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-between h-full items-start w-64">
        <p className="font-bold text-2xl">{food.title}</p>
        <button>Order Now &rarr;</button>
      </div>
    </div>
  );
}
