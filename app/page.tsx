// app/page.tsx
import { Metadata } from "next";
import Hero from "./Components/Hero";
import DishesCard from "./Components/DishesCard";
import FoodCard from "./Components/FoodCard";
import HeroSectionDesign from "./Components/HeroSectionDesign";
import Bento from "./Components/Bento";
import { Dishes } from "@/interfaces/interface";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Add metadata at the top level
export const metadata: Metadata = {
  title: "Best Food Delivery App | Order Delicious Dishes Online",
  description:
    "Order the best-selling dishes online. Fresh, tasty food delivered fast to your doorstep.",
  openGraph: {
    title: "Best Food Delivery App",
    description: "Discover our most loved dishes and order food online easily.",
    url: "https://yourdomain.com",
    siteName: "SnackDash",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Food Delivery App",
    description: "Order delicious dishes online with fast delivery.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

async function fetchDishes(): Promise<Dishes[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dish`, {
      cache: "force-cache",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.error("Failed to fetch dishes:", err);
    return [];
  }
}

// Page component
export default async function Home() {
  const dishes = await fetchDishes();

  return (
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
  );
}
