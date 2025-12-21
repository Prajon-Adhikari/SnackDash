import React from "react";
import Image from "next/image";

export default function HeroSectionDesign() {
  return (
    <div className="flex md:flex-row mx-6 lg:mx-34 my-10 md:my-20 lg:my-30 gap-16 items-center">
      <div className="lg:w-280 flex flex-col items-center md:items-start">
        <div className="text-yellow-400 font-bold">ALWAYS FRESH</div>
        <h2 className="font-bold text-5xl text-center md:text-left">
          From Texas with{" "}
        </h2>
        <h2 className="font-bold text-5xl text-center md:text-left">
          American Love
        </h2>
        <p className="mt-6 text-lg text-center md:text-left">
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
      <div className="h-40 lg:h-96 w-60 lg:w-190 relative hidden md:block">
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
