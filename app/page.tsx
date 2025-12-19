"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Hero from "./Components/Hero";
import DishesCard from "./Components/DishesCard";
import Bento from "./Components/Bento";
import HeroSectionDesign from "./Components/HeroSectionDesign";
import FoodCard from "./Components/FoodCard";
import { Dishes } from "@/interfaces/interface";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

export default function Home() {
  const { user, loading } = useAuth();

  const [dishes, setDishes] = useState<Dishes[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/dish");
        setDishes(response.data.products);
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (loading) return <p>Loading auth...</p>;
  if (!user) return <p>No user logged in</p>;
  if (pageLoading) return <p>Loading dishes...</p>;

  return (
    <>
      {/* ✅ SEO META TAGS */}
      <Head>
        <title>Best Food Delivery App | Order Delicious Dishes Online</title>

        <meta
          name="description"
          content="Order the best-selling dishes online. Fresh, tasty food delivered fast to your doorstep."
        />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:title" content="Best Food Delivery App" />
        <meta
          property="og:description"
          content="Discover our most loved dishes and order food online easily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Food Delivery App" />
        <meta
          name="twitter:description"
          content="Order delicious dishes online with fast delivery."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-image.jpg"
        />

        {/* SEO hygiene */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      {/* PAGE CONTENT */}
      <main>
        <Hero />
        <FoodCard />

        <section className="my-20 mx-30">
          <header className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900">
              Best Selling Dishes
            </h1>
            <p className="text-gray-500 mt-2">
              Our most loved items by customers, carefully picked just for you!
            </p>
          </header>

          <div className="grid grid-cols-4 gap-6">
            {dishes.slice(0, 8).map((dish) => (
              <DishesCard key={dish._id} dish={dish} />
            ))}
          </div>
        </section>

        <HeroSectionDesign />
        <Bento />
      </main>
    </>
  );
}
