// app/dish/[id]/page.tsx
import Image from "next/image";
import { Dishes } from "@/interfaces/interface";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Fetch the dish server-side
async function fetchDish(id: string): Promise<Dishes | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dish/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    console.log(data);
    return data.product || null;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
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
      description: "The requested dish could not be found.",
    };
  }

  return {
    title: `${dish.name} | SnackDash`,
    description: dish.description,
    openGraph: {
      title: dish.name,
      description: dish.description,
      url: `https://yourdomain.com/dish/${dish._id}`,
      siteName: "SnackDash",
      images: [
        {
          url: dish.image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dish.name,
      description: dish.description,
      images: [dish.image],
    },
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

  if (!dish) {
    notFound();
  }

  return (
    <div className="min-h-screen mt-14 flex justify-center py-10">
      <div className="w-full max-w-7xl p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Dish Image */}
          <div className="w-full h-80 lg:h-105 relative rounded-2xl overflow-hidden shadow-md">
            <Image
              src={dish.image || "/placeholder.png"}
              alt={dish.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Dish Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{dish.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {dish.description}
              </p>
              <p className="text-3xl font-bold text-green-600 mt-6">
                Rs. {dish.price}
              </p>
            </div>
            {/* Variations */}
            {dish.variation.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Choose Variation</h2>
                <div className="grid grid-cols-3 gap-4">
                  {dish.variation.map((v) => (
                    <button
                      key={v}
                      className="border rounded-xl py-3 cursor-pointer text-center hover:bg-gray-100 transition"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
