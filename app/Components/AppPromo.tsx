import React from "react";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function AppPromo() {
  return (
    <section className="py-24 px-6 bg-[#0f172a] overflow-hidden rounded-[3rem] mx-6 mb-24 flex flex-col lg:flex-row items-center gap-16 relative">
      <div className="flex-1 z-10 lg:pl-12">
        <span className="text-red-500 font-black uppercase tracking-[0.3em] text-sm">Download Our App</span>
        <h2 className="text-5xl lg:text-6xl font-black text-white mt-6 mb-8 leading-tight">
          Get the <span className="text-yellow-400">Snack Dash</span> experience on your phone.
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-xl leading-relaxed">
          Order your favorite meals, track delivery in real-time, and get exclusive offers available only on our mobile app. Fast, secure, and intuitive.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1">
            <FaApple size={24} />
            <div className="text-left">
              <p className="text-[10px] uppercase font-black leading-none mb-1">Download on the</p>
              <p className="text-lg leading-none">App Store</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 bg-red-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl hover:-translate-y-1">
            <FaGooglePlay size={20} />
            <div className="text-left">
              <p className="text-[10px] uppercase font-black leading-none mb-1">Get it on</p>
              <p className="text-lg leading-none">Google Play</p>
            </div>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative w-full h-[400px] lg:h-[600px] flex items-center justify-center">
        <div className="absolute w-[300px] h-[300px] bg-red-500/20 blur-[100px] rounded-full"></div>
        <div className="relative w-full h-full max-w-md">
           <Image
            src="/app-mockup.png"
            alt="Snack Dash Mobile App"
            fill
            className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:rotate-2 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 blur-[120px] rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>
    </section>
  );
}
