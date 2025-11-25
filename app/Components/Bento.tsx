import React from "react";
import Image from "next/image";

export default function Bento() {
  return (
    <div className="mx-24 flex gap-5">
      <div className="flex flex-col gap-5">
        <div className="relative w-[250px] h-[190px]">
          <Image
            src="/bentoImg1.jpg"
            alt="Bento Image"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-[250px] h-[190px]">
          <Image
            src="/bentoImg3.jpg"
            alt="Bento Image"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="relative w-full h-[400px] rounded-md">
        <Image
          src="/bentoImg4.jpg"
          alt="Bento Image"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="relative w-[400px] h-[400px]">
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
