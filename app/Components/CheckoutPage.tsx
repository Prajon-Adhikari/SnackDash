"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axiosInstance";
import { MdOutlineSecurity, MdOutlinePayment } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`,
          {
            amount,
          },
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("Error while fetching payment intent", error);
        setErrorMessage("Could not initialize payment. Please try again later.");
      }
    };
    fetchPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_API_URL2}/protected/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-gray-100 shadow-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <MdOutlinePayment size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Secure Payment</h2>
        </div>
        <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Amount</p>
            <p className="text-xl font-black text-gray-900">Rs. {amount}</p>
        </div>
      </div>

      <div className="space-y-6">
        {clientSecret ? (
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <PaymentElement options={{ layout: "tabs" }} />
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400 gap-2">
            <BiLoaderAlt className="animate-spin" size={20} />
            <span className="text-sm font-medium">Initializing payment...</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-shake">
            {errorMessage}
          </div>
        )}

        <button
          disabled={!stripe || loading || !clientSecret}
          className="w-full relative overflow-hidden group py-4 bg-gray-900 disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? (
            <BiLoaderAlt className="animate-spin" size={20} />
          ) : (
            <>
              <MdOutlineSecurity size={20} />
              <span>Pay Rs. {amount}</span>
            </>
          )}
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        
        <p className="text-center text-[10px] text-gray-400 font-medium">
          Your payment is processed securely by Stripe.
        </p>
      </div>
    </form>
  );
}

