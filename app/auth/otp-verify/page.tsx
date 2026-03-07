"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OtpVerify() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = val;
      }
    });
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return toast.error("Enter complete OTP");

    try {
      setLoading(true);
      const email = localStorage.getItem("email");
      const res = await axios.post("/api/auth/otp-verify", {
        email,
        otp: otpValue,
      });

      if (res.status === 200) {
        router.push("/auth/reset-password");
      }
    } catch (error) {
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl shadow-black/5 w-full max-w-md text-center border border-gray-100">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl font-black">S</div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">Snack<span className="text-red-500">Dash</span></span>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Verify OTP</h2>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-10">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-center gap-2.5 mb-10">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-xl font-black bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-900"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50 mb-8"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center">
            <Link href="/auth/signin" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
              <MdOutlineArrowBack size={16} />
              Back to Sign In
            </Link>
        </div>
      </div>
    </div>
  );
}

