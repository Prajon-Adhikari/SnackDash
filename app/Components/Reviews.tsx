import React from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Food Enthusiast",
    content: "The delivery was incredibly fast, and the food arrived steaming hot! The Gourmet Selection is a must-try. Snack Dash is now my go-to app for every weekend treat.",
    rating: 5,
    avatar: "/review1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Busy Professional",
    content: "I love how easy it is to track my order. The interface is clean and the selection of local kitchens is impressive. Premium quality service that actually saves me time.",
    rating: 5,
    avatar: "/review2.jpg"
  },
  {
    name: "Elena Rodriguez",
    role: "Home Chef",
    content: "As someone who is picky about ingredients, I was pleasantly surprised by the freshness. You can tell they care about the quality of the food they deliver. Highly recommended!",
    rating: 4,
    avatar: "/review3.jpg"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-yellow-500 font-black uppercase tracking-[0.3em] text-sm">Testimonials</span>
            <h2 className="text-5xl font-black text-gray-900 mt-4 leading-tight">
              Hear from our <span className="text-red-500">Happy Customers</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="p-4 rounded-full bg-gray-50 border border-gray-100 text-gray-400 cursor-pointer hover:bg-gray-900 hover:text-white transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <div className="p-4 rounded-full bg-gray-50 border border-gray-100 text-gray-400 cursor-pointer hover:bg-gray-900 hover:text-white transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-10 rounded-[2.5rem] relative group border border-transparent hover:border-red-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <FaQuoteLeft className="text-red-500/10 text-6xl absolute top-8 right-10 group-hover:text-red-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} size={14} />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative">
                   <div className="w-full h-full bg-gradient-to-br from-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xl">
                      {review.name.charAt(0)}
                   </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-gray-400 text-xs tracking-widest uppercase font-bold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
