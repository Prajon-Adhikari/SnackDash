import React from "react";
import { MdOutlineShoppingBag, MdOutlineFastfood, MdOutlineDeliveryDining, MdOutlineMood } from "react-icons/md";

const steps = [
  {
    icon: <MdOutlineShoppingBag size={40} className="text-red-500" />,
    title: "Choose Your Dish",
    description: "Browse our extensive menu of gourmet dishes and snacks from the best local kitchens.",
    step: "01"
  },
  {
    icon: <MdOutlineFastfood size={40} className="text-yellow-500" />,
    title: "We Prepare It",
    description: "Our master chefs begin preparing your meal with the freshest ingredients immediately.",
    step: "02"
  },
  {
    icon: <MdOutlineDeliveryDining size={40} className="text-red-500" />,
    title: "Fast Delivery",
    description: "Our dedicated delivery team ensures your food arrives hot and fresh at your doorstep.",
    step: "03"
  },
  {
    icon: <MdOutlineMood size={40} className="text-yellow-500" />,
    title: "Enjoy Your Meal",
    description: "Sit back, relax and enjoy the premium taste experience of Snack Dash meals.",
    step: "04"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-red-500 font-black uppercase tracking-[0.3em] text-sm">Process</span>
          <h2 className="text-5xl font-black text-gray-900 mt-4 mb-6">How It Works</h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              <div className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center group-hover:-translate-y-2">
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-red-50 transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-50">
                    <span className="text-gray-200 font-black text-lg">{item.step}</span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                 <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                    <div className="w-12 h-0.5 border-t-2 border-dashed border-gray-200"></div>
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
