"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneInTalk, MdOutlineLocationOn } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

   if (
    [
      "/auth/signin",
      "/auth/signup",
      "/auth/forget-password",
      "/auth/otp-verify",
      "/auth/reset-password",
    ].includes(pathname)
  )
    return null;
  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-red-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-500 to-orange-400 flex items-center justify-center text-white text-lg">
              S
            </span>
            Snack<span className="text-red-500">Dash</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs transition-colors hover:text-gray-300">
            Bringing the finest snacks and meals directly to your doorstep. 
            Quality, speed, and taste in every delivery.
          </p>
          <div className="flex items-center gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all hover:-translate-y-1 shadow-lg"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold text-lg">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {["Home", "Dishes", "About Us", "Contact Us", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold text-lg">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                <MdOutlineLocationOn size={20} />
              </div>
              <span>123 Foodie Street, <br />Gourmet District, NY 10001</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                <MdOutlinePhoneInTalk size={18} />
              </div>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                <MdOutlineEmail size={18} />
              </div>
              <span>hello@snackdash.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold text-lg">Newsletter</h4>
          <p className="text-sm">Subscribe to get latest updates and offers.</p>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-red-500 transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-red-500 rounded-xl text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg active:scale-95">
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-gray-500">
        <p>&copy; 2024 SnackDash. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
