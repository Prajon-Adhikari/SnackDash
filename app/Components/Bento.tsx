import React from "react";
import Image from "next/image";

export default function Bento() {
  return (
    <section className="max-w-8xl mx-auto px-6 md:px-12 pb-24 p-12">
      <div className="flex flex-col md:flex-row gap-4 h-[600px]">
        {/* Left Column - Stacked */}
        <div className="flex flex-col gap-4 md:w-1/4 h-full">
          <div className="relative flex-1 overflow-hidden rounded-[1rem] group">
            <Image
              src="/bentoImg1.jpg"
              alt="Delicious food gallery"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold">Gourmet Selection</p>
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-[1rem] group">
            <Image
              src="/bentoImg3.jpg"
              alt="Fresh ingredients"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold">Organic Ingredients</p>
            </div>
          </div>
        </div>

        {/* Middle Column - Large */}
        <div className="relative flex-[1.5] hidden md:block overflow-hidden rounded-[1rem] group h-full">
          <Image
            src="/bentoImg4.jpg"
            alt="Chef preparing food"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-10 flex flex-col justify-end items-start">
             <span className="px-4 py-2 bg-red-500 text-white text-xs font-black uppercase tracking-widest rounded-full mb-4">Featured</span>
             <h2 className="text-4xl font-black text-white leading-tight max-w-sm">
                Crafted by master chefs with passion.
             </h2>
          </div>
        </div>

        {/* Right Column - Tall */}
        <div className="relative flex-1 overflow-hidden rounded-[1rem] group h-full">
          <Image
            src="/bentoImg2.jpg"
            alt="Signature dish"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold">Signature Dishes</p>
            </div>
        </div>
      </div>
    </section>
  );
}

