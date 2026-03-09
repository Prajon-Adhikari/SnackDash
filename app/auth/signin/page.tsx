"use client";

import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin", formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setUser(response.data.user);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl shadow-black/5 overflow-hidden grid md:grid-cols-2 border border-gray-100">
        {/* Left Side - Visual */}
        <div className="relative hidden md:block">
          <Image
            src="/aboutheroImage3.jpg"
            alt="Delicious food"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                Freshly Prepared <br />Just For You.
              </h2>
              <p className="text-gray-300 text-sm font-medium leading-relaxed max-w-xs">
                Log in and discover the world's best snacks delivered at your doorstep within minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 sm:p-16 flex flex-col justify-center">
          {/* Logo & Brand */}
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl font-black">S</div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">Snack<span className="text-red-500">Dash</span></span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome Back!</h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-none">Continue your flavor journey</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative mt-2 group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                <Link href="/auth/forget-password" className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-2 group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-xl shadow-black/10 active:scale-95 mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs font-bold text-gray-400 mt-10">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-red-500 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

