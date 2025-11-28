import React from "react";
import Image from "next/image";

interface Props {
  params: Promise<{
    dishName: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { dishName } = await params;
  return (
    <div className="min-h-screen mt-14  flex justify-center py-10">
      <div className="w-full max-w-7xl p-10">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Dish Image */}
          <div className="w-full h-80 lg:h-[420px] relative rounded-2xl overflow-hidden shadow-md">
            <Image
              src={`/${dishName.toLowerCase()}.jpg`}
              alt="Dish Image"
              fill
              className="object-cover"
            />
          </div>

          {/* Dish Info */}
          <div className="flex flex-col justify-between">
            {/* Title + Description */}
            <div>
              <h1 className="text-4xl font-bold mb-2">Chicken Mo:Mo</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                A popular Nepali dumpling served with spicy tomato-chili
                chutney. Soft, juicy and flavorful.
              </p>

              <p className="text-3xl font-bold text-green-600 mt-6">$6.99</p>
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
