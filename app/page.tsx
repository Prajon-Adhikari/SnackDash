"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import DishesCard from "./Components/DishesCard";
import { Dishes, Food } from "@/interfaces/interface";
import Bento from "./Components/Bento";
import HeroSectionDesign from "./Components/HeroSectionDesign";
import FoodCard from "./Components/FoodCard";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

export default function Home() {
  const { user } = useAuth();
  if (!user) return <p>No user logged in</p>;

  const [dishes, setDishes] = useState<Dishes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/dish");
        setDishes(response.data.products);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Hero />
      <FoodCard />
      <div className=" my-20 mx-30">
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-gray-900">
            Best Selling Dishes
          </h2>
          <p className="text-gray-500 mt-2">
            Our most loved items by customers, carefully picked just for you!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {dishes.map((dish: Dishes) => {
            return <DishesCard key={dish._id} dish={dish} />;
          })}
        </div>
      </div>
      <HeroSectionDesign />
      <Bento />
    </div>
  );
}
