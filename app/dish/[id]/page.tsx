import Image from "next/image";
import { Dishes } from "@/interfaces/interface";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AddToCartButton from "@/app/Components/AddToCartButton";
import Link from "next/link";
import { MdOutlineStar, MdOutlineTimer, MdKeyboardBackspace, MdVerified, MdLocalFireDepartment } from "react-icons/md";

// Fetch the dish server-side
async function fetchDish(id: string): Promise<Dishes | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dish/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
}

// Fetch recommended dishes
async function fetchRecommended(currentId: string): Promise<Dishes[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dish`, {
       cache: "no-cache"
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter((d: Dishes) => d._id !== currentId)
      .slice(0, 4);
  } catch (error) {
    return [];
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params: rawParams,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const params = await rawParams;
  const dish = await fetchDish(params.id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be find.",
    };
  }

  return {
    title: `${dish.name} | SnackDash`,
    description: dish.description,
  };
}

// Page component (SSR)
export default async function DishPage({
  params: rawParams,
}: {
  params: { id: string };
}) {
  const params = await rawParams;
  const dish = await fetchDish(params.id);
  const recommended = await fetchRecommended(params.id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link href="/dishes" className="inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
           <MdKeyboardBackspace size={18} />
           Back to Menu
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 bg-white rounded-xl shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden">
          {/* Left: Image */}
          <div className="lg:col-span-7 relative bg-gray-50 h-[400px] lg:h-auto group overflow-hidden">
            <Image
              src={dish.image || "/placeholder.png"}
              alt={dish.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
               <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <MdLocalFireDepartment size={14} />
                  Top Choice
               </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col">
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg text-amber-600">
                     <MdOutlineStar size={16} />
                     <span className="text-xs font-black">{dish.rating || 4.5}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg text-green-600">
                     <MdVerified size={16} />
                     <span className="text-xs font-black uppercase tracking-widest">Available</span>
                  </div>
               </div>
               
               <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                 {dish.name}
               </h1>
               
               <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
                 {dish.description || "Indulge in our freshly prepared masterpiece with premium ingredients. Experience flavors crafted to perfection for an unforgettable snack."}
               </p>

               <div className="flex items-end gap-2 mb-10">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1.5">Price:</span>
                  <span className="text-4xl font-black text-gray-900">₹{dish.price}</span>
               </div>

               {/* Variations */}
               {dish.variation && dish.variation.length > 0 && (
                 <div className="mb-10">
                   <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Customize</h2>
                   <div className="flex flex-wrap gap-2">
                     {dish.variation.map((v, i) => (
                       <button
                         key={v}
                         className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg border-2 transition-all ${
                            i === 0 ? "border-red-500 bg-red-50 text-red-500" : "border-gray-100 text-gray-400 hover:border-gray-200"
                         }`}
                       >
                         {v}
                       </button>
                     ))}
                   </div>
                 </div>
               )}

               <div className="space-y-4">
                  <AddToCartButton productId={dish._id} />
                  <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                     Free delivery on orders above ₹499
                  </p>
               </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 border-t border-gray-50 pt-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <MdOutlineTimer size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black uppercase text-gray-400">Est. Time</p>
                     <p className="text-xs font-bold text-gray-700">25-30 Mins</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <MdLocalFireDepartment size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black uppercase text-gray-400">Heat Level</p>
                     <p className="text-xs font-bold text-gray-700">Mild Spicy</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommended.length > 0 && (
          <div className="mt-20">
             <div className="flex items-center justify-between mb-10">
                <div>
                   <h2 className="text-3xl font-black text-gray-900 tracking-tight">Recommended Dishes</h2>
                   <p className="text-gray-400 text-sm font-medium mt-1">Based on what you're looking at right now.</p>
                </div>
                <Link href="/dishes" className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-600">
                   See Full Menu &rarr;
                </Link>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommended.map((item) => (
                  <Link key={item._id} href={`/dish/${item._id}`} className="group">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-3 flex flex-col h-full group-hover:-translate-y-1">
                      <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                         <Image
                           src={item.image}
                           alt={item.name}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                         <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur rounded-md shadow-sm">
                            <span className="text-[10px] font-black text-gray-900 leading-none">₹{item.price}</span>
                         </div>
                      </div>
                      <div className="px-1 flex flex-col flex-grow">
                         <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-500 transition-colors line-clamp-1">{item.name}</h3>
                         <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                               <MdOutlineStar className="text-amber-400" size={12} />
                               <span className="text-[10px] font-bold text-gray-500">{item.rating || 4.5}</span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-red-500">View &rarr;</span>
                         </div>
                      </div>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

