import React from "react";
import Image from "next/image";

export default function Bento() {
  return (
    <div className="mx-4 lg:mx-24 flex gap-3 md:gap-5">
      <div className="flex flex-col gap-3 md:gap-5">
        <div className="relative w-30 md:w-62.5 h-35 md:h-47.5">
          <Image
            src="/bentoImg1.jpg"
            alt="Bento Image"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-30 md:w-62.5 h-35 md:h-47.5">
          <Image
            src="/bentoImg3.jpg"
            alt="Bento Image"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="relative hidden md:block w-full h-100 rounded-md">
        <Image
          src="/bentoImg4.jpg"
          alt="Bento Image"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="relative w-50 md:w-100 h-73 md:h-100">
        <Image
          src="/bentoImg2.jpg"
          alt="Bento Image"
          fill
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
}
