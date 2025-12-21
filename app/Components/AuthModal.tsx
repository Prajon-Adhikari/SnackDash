"use client";

import { useAuthModal } from "@/context/AuthModalContext";
import Link from "next/link";
export default function AuthModal() {
  const { isOpen, close } = useAuthModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Logo / loader */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full border border-gray-200 animate-spin"></div>
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2">
          Yoo, welcome back!
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          First time here?{" "}
          <Link href={"/auth/signup"}>
            <span className="text-black font-semibold">Sign up for free</span>
          </Link>
        </p>

        {/* Email input */}
        <input
          type="email"
          placeholder="Your email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <Link href="/auth/signin">
          <button className="w-full bg-black text-white rounded-lg py-3 mb-3 font-medium hover:bg-gray-900 transition">
            Sign In To Your Account
          </button>
        </Link>

        <button className="w-full border border-gray-300 rounded-lg py-3 mb-4 font-medium hover:bg-gray-50 transition">
          Sign In Using Google
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={close}
          className="w-full border cursor-pointer border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-50 transition"
        >
          Stayed Logged Out
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You acknowledge that you read, and agree, to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
