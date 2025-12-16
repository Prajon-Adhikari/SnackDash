"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { itemLength } = useCart();

  const links = [
    { name: "Home", href: "/" },
    { name: "Dishes", href: "/dishes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  // Scroll listener to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-18 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-bold transition-colors duration-300 ${
            scrolled ? "text-black" : "text-black"
          }`}
        >
          MySite
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded transition-colors duration-300 ${
                isActive(link.href)
                  ? scrolled
                    ? "bg-black text-white"
                    : "bg-white/20 text-black"
                  : scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-black hover:bg-white/20"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href={"/cart"} className="relative">
            <MdOutlineShoppingBag className="text-xl" />
            <span className="bg-red-500 text-white absolute text-xs -top-2 -right-1 w-4 h-4 flex justify-center items-center rounded-full">
              {Number(itemLength)}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-3xl transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden px-6 py-4 flex flex-col gap-3 font-medium transition-colors duration-300 ${
            scrolled ? "bg-white" : "bg-black/80 text-white"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-2 py-1 rounded ${
                isActive(link.href)
                  ? scrolled
                    ? "bg-black text-white"
                    : "bg-white/30 text-white"
                  : scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
