"use client";

import React from "react";
import { 
  MdOutlineEmail, 
  MdOutlinePhoneInTalk, 
  MdOutlineLocationOn, 
  MdOutlineAccessTime,
  MdSend
} from "react-icons/md";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Centered Header Section */}
      <div className="max-w-8xl mx-auto px-6 md:px-20 lg:px-32 text-center mb-16">
          <span className="text-red-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            We're here to <span className="text-red-500 underline decoration-yellow-400 decoration-4 underline-offset-8">Help You</span>.
          </h1>
          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto font-medium">
             Have a question about our menu, delivery, or a specific order? 
             Reach out and our team will get back to you faster than our delivery bikes!
          </p>
      </div>

      {/* Info Cards Section */}
      <section className="px-6 md:px-20 lg:px-32 max-w-8xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MdOutlinePhoneInTalk size={32} />,
              title: "Call Us",
              lines: ["+1 (555) 000-1234", "+1 (555) 000-5678"],
              color: "text-red-500",
              bgColor: "bg-red-50"
            },
            {
              icon: <MdOutlineEmail size={32} />,
              title: "Email Us",
              lines: ["support@snackdash.com", "info@snackdash.com"],
              color: "text-yellow-500",
              bgColor: "bg-yellow-50"
            },
            {
              icon: <MdOutlineLocationOn size={32} />,
              title: "Visit Us",
              lines: ["123 Foodie Avenue", "New York, NY 10001"],
              color: "text-red-500",
              bgColor: "bg-red-50"
            },
            {
              icon: <MdOutlineAccessTime size={32} />,
              title: "Open Hours",
              lines: ["Mon - Fri: 10am - 10pm", "Sat - Sun: 09am - 11pm"],
              color: "text-yellow-500",
              bgColor: "bg-yellow-50"
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col items-center text-center">
              <div className={`${card.bgColor} ${card.color} p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              {card.lines.map((line, i) => (
                <p key={i} className="text-gray-500 text-sm font-medium">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="px-6 md:px-20 lg:px-32 max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          
          {/* Contact Form */}
          <div className="flex-1">
            <div className="mb-12">
              <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Send Message</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">Have questions? <br/>Drop us a line.</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-medium text-gray-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-medium text-gray-900" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry about delivery" 
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-medium text-gray-900" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">Your Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us what you're thinking..." 
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-medium text-gray-900 resize-none" 
                ></textarea>
              </div>

              <button className="bg-gray-900 text-white flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 rounded-2xl font-bold hover:bg-red-500 transition-all shadow-xl hover:-translate-y-1 active:scale-95 group">
                SUBMIT MESSAGE
                <MdSend className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>

          {/* Interactive Map Design */}
          <div className="flex-1 min-h-[500px] relative rounded-[3rem] overflow-hidden group shadow-2xl border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1709971200282!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>

            <div className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl max-w-[240px] z-10 hidden md:block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Live Status</span>
              </div>
              <h4 className="text-sm font-black text-gray-900 mb-1">Our HQ is open!</h4>
              <p className="text-[11px] text-gray-400 font-medium">Wait time for pickup is currently <span className="text-red-500 font-bold">5-10 mins</span>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Support Widget */}
      <div className="fixed bottom-10 right-10 z-[50] hidden md:block">
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white flex items-center gap-4 group cursor-pointer animate-float">
          <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:rotate-12 transition-transform">
            <MdOutlinePhoneInTalk size={24} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Need help fast?</p>
            <p className="text-sm font-black text-gray-900 leading-none">Chat with Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
