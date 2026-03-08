"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const email = localStorage.getItem("email");
      const res = await axios.post("/api/auth/reset-password", {
        email,
        newPassword: password,
        token: "otp-verified",
      });

      if (res.status === 200) {
        toast.success("Password reset successfully");
        router.push("/auth/signin");
      }
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Reset Password</h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Password</label>
            <div className="relative mt-2 group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors">
                <FaLock size={18} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-center">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
              <MdOutlineArrowBack size={16} />
              Back to Sign In
            </Link>
        </div>
      </div>
    </div>
  );
}

