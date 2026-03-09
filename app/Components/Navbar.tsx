"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineShoppingBag, MdOutlineAccountCircle } from "react-icons/md";
import { FiLogOut, FiUser } from "react-icons/fi";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { itemLength } = useCart();

  const links = [
    { name: "Home", href: "/" },
    { name: "Dishes", href: "/dishes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Orders", href: "/order" },
  ];

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const logout = async () => {
    if (!setUser) return;
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      router.push("/auth/signin");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "py-3 bg-white/50 backdrop-blur-sm shadow-none"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-black tracking-tighter transition-colors duration-300 text-gray-900"
        >
          <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white text-lg">
            S
          </span>
          <span className="group-hover:text-red-500 transition-colors">
            Snack<span className="text-red-500 group-hover:text-inherit">Dash</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg ${
                  isActive(link.href)
                    ? "text-red-500 bg-red-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-gray-200 pl-4 ml-2">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100"
            >
              <MdOutlineShoppingBag className="text-2xl" />
              {itemLength > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                  {itemLength}
                </span>
              )}
            </Link>

            {/* Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 p-1 pl-3 border border-gray-200 bg-gray-50 rounded-full text-gray-700 hover:border-gray-300 transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {user.fullName.split(" ")[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    {user.fullName[0]}
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-3 w-48 py-2 bg-white rounded-xl shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser className="text-gray-400" /> My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold transition-all duration-300 hover:bg-gray-800 shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
             <MdOutlineShoppingBag className="text-2xl" />
             {itemLength > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[8px] font-bold rounded-full">
                  {itemLength}
                </span>
              )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 py-6 px-6 flex flex-col gap-2 animate-in slide-in-from-top duration-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive(link.href) ? "bg-red-50 text-red-500" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          {user ? (
            <>
              <Link href="/profile" className="px-4 py-3 text-gray-600 font-bold">Profile</Link>
              <button
                onClick={logout}
                className="px-4 py-3 text-red-500 font-bold text-left"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              onClick={() => setOpen(false)}
              className="mt-2 bg-gray-900 text-white py-4 rounded-xl font-bold text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>

  );
}

