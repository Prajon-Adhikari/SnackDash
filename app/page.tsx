import React from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import DishesCard from "./Components/DishesCard";
import { Dishes, Food } from "@/interfaces/interface";
import Bento from "./Components/Bento";
import HeroSectionDesign from "./Components/HeroSectionDesign";
import FoodCard from "./Components/FoodCard";

const dishes: Dishes[] = [
  { id: 1, name: "Pizza", image: "/pizza.jpg", price: 300 },
  { id: 2, name: "Burger", image: "/burger.jpg", price: 400 },
  { id: 3, name: "Boritto", image: "/boritto.jpg", price: 500 },
  { id: 4, name: "MoMo", image: "/momo.jpg", price: 200 },
  { id: 5, name: "Chaumin", image: "/chaumin.jpg", price: 200 },
  { id: 6, name: "Paella", image: "/paella.jpg", price: 700 },
  { id: 7, name: "Fish & chips", image: "/fishandchip.jpg", price: 500 },
  { id: 8, name: "Pasta", image: "/pasta.jpg", price: 250 },
];

const foodItems: Food[] = [
  {
    id: 1,
    title: "Grilled Double Cheese Burger",
    image: "/burger2.png",
    bg: "linear-gradient(135deg,#ff4d9d,#c51679)",
  },
  {
    id: 2,
    title: "Tasty Yummy Cheesy Pizza",
    image: "/burger2.png",
    bg: "linear-gradient(135deg,#ffb300,#ff6a00)",
  },
  {
    id: 3,
    title: "New Menu Galaxy Donuts Time!",
    image: "/burger2.png",
    bg: "linear-gradient(135deg,#ff1e3c,#b50019)",
  },
  {
    id: 4,
    title: "Fresh Delicious Veg Sandwich",
    image: "/burger2.png",
    bg: "linear-gradient(135deg,#8ddc55,#4caf50)",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
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
            return <DishesCard key={dish.id} dish={dish} />;
          })}
        </div>
      </div>
      <Bento />
      <HeroSectionDesign />
      <div className="grid grid-cols-4 mx-20 gap-5">
        {foodItems.map((item: Food) => {
          return <FoodCard key={item.id} food={item} />;
        })}
      </div>
    </div>
  );
}
