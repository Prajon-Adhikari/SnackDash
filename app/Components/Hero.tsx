"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="relative overflow-hidden py-29.5 h-screen flex justify-center "
      style={{
        backgroundImage: `url("/heroImage.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-120 text-center mt-10 ">
        <p className="pt-4 font-semibold text-amber-800">We Offer You</p>
        <h2 className="font-bold text-6xl text-amber-900">
          Freshly Baked, Just For You
        </h2>
        <p className="pt-4 font-semibold text-amber-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          maiores id dignissimos eum voluptate alias nulla, doloremque in quos
          est.
        </p>
        <Link href={"/dishes"}>
          <button className="uppercase cursor-pointer bg-yellow-500 text-white px-4 py-1.5 rounded-2xl mt-4">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
}
