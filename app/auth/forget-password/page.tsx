"use client"; // remove if using normal React (not Next.js)

import axios from "axios";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdEmail size={20} />
            </span>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
