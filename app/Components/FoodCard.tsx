import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FoodCard() {
  return (
    <div className="mx-4 lg:mx-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
      <Link href={"dishes"}>
        <div
          className={`h-46 relative rounded-2xl text-white p-4`}
          style={{ background: "linear-gradient(135deg,#ff4d9d,#c51679)" }}
        >
          <Image
            src={"/burger2.png"}
            alt="Food Image"
            width={180}
            height={200}
            sizes="100%"
            className="object-contain absolute top-10 -right-4"
          />
          <div className="flex flex-col z-10 justify-between w-60 h-full items-start relative">
            <p className="font-bold text-2xl ">Tasty Yummy Cheesy Pizza</p>
            <button>Order Now &rarr;</button>
          </div>
        </div>
      </Link>
      <Link href={"dishes"}>
        <div
          className={`h-46 relative rounded-2xl text-white p-4`}
          style={{ background: "linear-gradient(135deg,#ffb300,#ff6a00)" }}
        >
          <Image
            src={"/pizza.png"}
            alt="Food Image"
            width={180}
            height={180}
            sizes="100%"
            className="object-contain absolute -top-3 -right-2"
          />
          <div className="flex flex-col justify-between w-60 h-full items-start relative z-10">
            <p className="font-bold text-2xl">Tasty Yummy Cheesy Pizza</p>
            <button>Order Now &rarr;</button>
          </div>
        </div>
      </Link>
      <Link href={"dishes"}>
        <div
          className={`h-46 relative rounded-2xl text-white p-4`}
          style={{ background: "linear-gradient(135deg,#ff1e3c,#b50019)" }}
        >
          <Image
            src={"/donuts.png"}
            alt="Food Image"
            width={120}
            height={120}
            sizes="100%"
            className="object-contain absolute -top-2 right-3"
          />
          <div className="flex flex-col justify-between w-60 h-full items-start relative z-10">
            <p className="font-bold text-2xl">New Menu Galaxy Donuts Time!</p>
            <button>Order Now &rarr;</button>
          </div>
        </div>
      </Link>
      <Link href={"dishes"}>
        <div
          className={`h-46 relative rounded-2xl text-white p-4`}
          style={{ background: "linear-gradient(135deg,#8ddc55,#4caf50)" }}
        >
          <Image
            src={"/pizza.png"}
            alt="Food Image"
            width={180}
            height={180}
            sizes="100%"
            className="object-contain absolute -top-3 -right-2"
          />
          <div className="flex flex-col justify-between w-60 h-full items-start relative z-10">
            <p className="font-bold text-2xl">Fresh Delicious Veg Sandwich</p>
            <button>Order Now &rarr;</button>
          </div>
        </div>
      </Link>
    </div>
  );
}
