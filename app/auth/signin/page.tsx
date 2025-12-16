"use client";
import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signin", formData);
      console.log(response.data);
      localStorage.setItem("login_token", response.data.token);
      router.push("/");
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In to your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={hanldeChange}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={hanldeChange}
              className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-indigo-600 hover:underline">
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
