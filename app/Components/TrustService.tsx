import React from "react";
import { MdOutlineLocalOffer, MdOutlineStarBorder, MdOutlineSupportAgent, MdOutlineSecurity } from "react-icons/md";

const features = [
  {
    icon: <MdOutlineLocalOffer size={32} />,
    title: "Best Offers",
    description: "Get weekly discounts and exclusive loyalty rewards automatically.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: <MdOutlineStarBorder size={32} />,
    title: "Premium Quality",
    description: "We partner only with top-rated kitchens that pass our quality audit.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: <MdOutlineSupportAgent size={32} />,
    title: "24/7 Support",
    description: "Our dedicated support team is always available to help with your orders.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: <MdOutlineSecurity size={32} />,
    title: "Secure Payment",
    description: "Fully encrypted and safe payment processing via Stripe gateway.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  }
];

export default function TrustService() {
  return (
    <section className="py-24 bg-white px-6 md:px-20">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/3">
            <span className="text-red-500 font-black uppercase tracking-[0.3em] text-xs">Why SnackDash?</span>
            <h2 className="text-5xl font-black text-gray-900 mt-4 leading-tight">
              Service that handles your <span className="text-red-500">Hunger</span> with care.
            </h2>
            <p className="text-gray-500 mt-8 text-lg leading-relaxed">
              We go beyond just delivery. We ensure every step of your food journey is handled with the highest standards of safety and care.
            </p>
            <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div>
                   <p className="text-gray-900 font-black text-xl leading-none">50k+</p>
                   <p className="text-gray-400 text-sm font-bold tracking-tight">Active Users Weekly</p>
                </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="p-10 border border-gray-100 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group">
                <div className={`${feature.bgColor} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
