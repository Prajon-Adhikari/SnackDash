import { FaUtensils, FaLeaf, FaTruck, FaHeart } from "react-icons/fa";
import Image from "next/image";
export default function AboutUs() {
  return (
    <section className="w-full bg-white text-gray-800 mt-14">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/aboutheroImage3.jpg"
          alt="Restaurant"
          fill
          className=" object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Our Restaurant
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Serving delicious food made with love, passion, and the freshest
              ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            What started as a small family kitchen has grown into a modern
            restaurant e‑commerce platform. Our mission is simple: bring
            restaurant‑quality meals straight to your doorstep without
            compromising on taste or quality.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Every dish is carefully prepared by our chefs using time‑honored
            recipes and fresh, locally sourced ingredients.
          </p>
          <button className="bg-amber-400 text-white px-7 py-2 rounded-3xl mt-9">
            Exlpre More &rarr;
          </button>
        </div>
        <div className="relative w-full h-90">
          <Image
            src="/cooking.jpg"
            alt="Cooking"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <FaUtensils className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">
                Crafted by professional chefs with attention to every detail.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">
                We use only fresh and responsibly sourced ingredients.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <FaTruck className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Hot, fresh meals delivered quickly to your home.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600">
                Every order is prepared with care and passion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Kitchen</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Image
            src="/burger.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
          <Image
            src="/pasta.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
          <Image
            src="/tacos.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
          <Image
            src="/paella.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
          <Image
            src="/fishandchip.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
          <Image
            src="/boritto.jpg"
            alt="Food"
            width={100}
            height={100}
            className="rounded-2xl object-cover h-64 w-full"
          />
        </div>
      </div>
      {/* Call To Action Section */}
      <div className="relative bg-black text-white py-24 mt-10">
        <div className="absolute inset-0">
          <Image
            src="/heroImage.png"
            alt="Delicious Food"
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="text-gray-200 text-lg mb-8">
            Explore our menu and enjoy freshly prepared meals delivered straight
            to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold transition">
              Order Now
            </button>
            <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
