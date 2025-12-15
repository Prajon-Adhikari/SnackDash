import React from "react";
import Image from "next/image";

export default function HeroSectionDesign() {
  return (
    <div className="flex mx-34 my-30 gap-16 items-center">
      <div className="w-280">
        <div className="text-yellow-400 font-bold">ALWAYS FRESH</div>
        <h2 className="font-bold text-5xl">From Texas with </h2>
        <h2 className="font-bold text-5xl">American Love</h2>
        <p className="mt-6 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quidem
          vero libero, illum fugiat deserunt dicta saepe ratione esse unde
          molestias in eum magnam delectus provident dignissimos, qui minus
          culpa laudantium dolorem! Aperiam ex quidem numquam a magnam saepe
          dignissimos.
        </p>
        <button className="mt-10 bg-yellow-500 text-white px-5 py-2 rounded-3xl">
          ORDER NOW
        </button>
      </div>
      <div className="h-96 w-190 relative">
        <Image
          src={"/burger2.png"}
          alt="Burger Image"
          sizes="100%"
          fill
          className=""
        />
      </div>
    </div>
  );
}
