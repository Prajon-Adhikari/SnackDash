"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const { itemLength } = useCart();

  const links = [
    { name: "Home", href: "/" },
    { name: "Dishes", href: "/dishes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Orders", href: "/order" },
  ];

  const isActive = (href: string) => pathname === href;

  // Scroll listener only matters on home page
  useEffect(() => {
    if (pathname !== "/") return; // Only enable scroll effect on home

    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Determine navbar classes
  const navClasses =
    pathname === "/"
      ? `fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`
      : "fixed top-0 left-0 w-full z-50 bg-white shadow-md";

  const hideNavbar = ["/auth/signin", "/auth/signup"].includes(pathname);
  if (hideNavbar) return null;

  const handleLogOut = () => {
    localStorage.removeItem("login_token");
    router.push("/auth/signin");
    setShowProfileDropdown(false);
  };

  return (
    <nav className={navClasses}>
      <div className="mx-18 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-bold transition-colors duration-300 ${
            pathname === "/" && !scrolled ? "text-white" : "text-black"
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
                  ? pathname === "/" && !scrolled
                    ? "bg-white/20 text-black"
                    : "bg-black text-white"
                  : pathname === "/" && !scrolled
                  ? "text-white hover:bg-white/20"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={"/cart"}
            className={`relative ${
              isActive("/cart")
                ? pathname === "/" && !scrolled
                  ? "bg-white/20 text-black"
                  : "bg-white/20 text-black"
                : pathname === "/" && !scrolled
                ? "text-white "
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MdOutlineShoppingBag className="text-xl" />
            <span className="bg-red-500 text-white absolute text-xs -top-2 -right-1 w-4 h-4 flex justify-center items-center rounded-full">
              {Number(itemLength)}
            </span>
          </Link>
          <div
            className={`relative ${
              isActive("/cart")
                ? pathname === "/" && !scrolled
                  ? "bg-white/20 text-black"
                  : "bg-white/20 text-black"
                : pathname === "/" && !scrolled
                ? "text-white "
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            {showProfileDropdown && (
              <div className="absolute w-30 border bg-white -left-10 top-7 shadow-xl">
                <p className="border-b py-1.5 text-center hover:bg-gray-200 cursor-pointer">
                  Profile
                </p>
                <p
                  onClick={handleLogOut}
                  className="py-1.5 text-center hover:bg-gray-200 cursor-pointer"
                >
                  Log Out
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-3xl transition-colors duration-300 ${
            pathname === "/" && !scrolled ? "text-white" : "text-black"
          }`}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden px-6 py-4 flex flex-col gap-3 font-medium transition-colors duration-300 ${
            pathname === "/" && !scrolled
              ? "bg-black/80 text-white"
              : "bg-white"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-2 py-1 rounded ${
                isActive(link.href)
                  ? pathname === "/" && !scrolled
                    ? "bg-white/30 text-white"
                    : "bg-black text-white"
                  : pathname === "/" && !scrolled
                  ? "text-white hover:bg-white/20"
                  : "text-gray-700 hover:bg-gray-100"
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
