"use client";
import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  const router = useRouter();

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin", formData);
      localStorage.setItem("login_token", response.data.token);
      router.push("/");
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Image / Welcome Section */}
        <div className="relative hidden md:block">
          <Image
            src="/aboutheroImage3.jpg"
            alt="Welcome"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center px-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-200 text-lg">
                Log in to enjoy freshly prepared meals delivered straight to
                your door.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 mt-2">
              Continue ordering your favorite dishes 🍽️
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-2">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={hanldeChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-2">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={hanldeChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
