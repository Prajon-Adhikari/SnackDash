"use client";

import axios from "axios";
import { useState } from "react";
import { MdEmail, MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/forget-password", {
        email,
      });
      if (res.status === 200) {
        localStorage.setItem("email", email);
        router.push("/auth/otp-verify");
      }
    } catch (error) {
      console.log("Failed to send otp", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-2xl shadow-black/5 border border-gray-100">
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl font-black">S</div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">Snack<span className="text-red-500">Dash</span></span>
            </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Forgot Password?</h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">
            Enter your email to receive a code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative mt-2 group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors">
                <MdEmail size={20} />
              </span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
