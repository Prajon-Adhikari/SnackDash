import Image from "next/image";
import Link from "next/link";
import { Dishes } from "@/interfaces/interface";
import { MdSearch, MdOutlineRestaurantMenu } from "react-icons/md";

async function fetchDishes(): Promise<Dishes[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dish`, {
      cache: "no-cache",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.log("Failed to fetch dishes", error);
    return [];
  }
}

export default async function DishPage() {
  const dishes = await fetchDishes();

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
              <MdOutlineRestaurantMenu size={20} />
              <span>Explore Menu</span>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Our Delicious Dishes</h1>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for snacks, pizza..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish: Dishes) => (
            <Link key={dish._id} href={`/dish/${dish._id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-3 flex flex-col h-full group-hover:-translate-y-1">
                <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-50 mb-4">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-white/90 backdrop-blur rounded-md shadow-sm">
                    <p className="text-xs font-black text-gray-900 leading-none">₹{dish.price}</p>
                  </div>
                </div>

                <div className="px-1 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors line-clamp-1">{dish.name}</h2>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {dish.description || "Indulge in our freshly prepared masterpiece with premium ingredients."}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm font-bold">★</span>
                      <span className="text-xs font-bold text-gray-700">{dish.rating || 4.5}</span>
                    </div>
                    <button className="text-xs font-black uppercase tracking-wider text-red-500 group-hover:text-red-600">
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {dishes.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdOutlineRestaurantMenu size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

