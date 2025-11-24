"use client";

export default function Hero() {
  return (
    <div
      className="relative overflow-hidden py-[118px]"
      style={{
        background: "linear-gradient(135deg, #1f1e1e, #e4302f)",
      }}
    >
      {/* Animated Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(233, 30, 99, 0.12), transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 60%)
          `,
          animation: "bgMove 10s ease-in-out infinite alternate",
        }}
      />

      {/* Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 ml-25 mr-10 h-[66vh]">
        
        {/* Content */}
        <div className="flex flex-col justify-center">
          <h1
            className="opacity-0 translate-y-5 animation-fadeUp text-[3.8rem] font-extrabold leading-tight text-white mb-6"
          >
            Fastest{" "}
            <span
              className="bg-linear-to-br from-[#e4302f] to-[#f16868] bg-clip-text text-transparent"
            >
              Delivery
            </span>{" "}
            In The Town
          </h1>

          <p
            className="opacity-0 translate-y-5 animation-fadeUpDelay text-gray-200 text-[1rem] leading-7 max-w-[540px] mb-8"
          >
            Transform your organization with a centralized, intelligent
            attendance solution. Track, manage, and analyze attendance with
            powerful QR technology and real-time insights.
          </p>

          <div className="flex gap-4 flex-wrap opacity-0 translate-y-5 animation-fadeUpDelay2">
            <a
              href="#trial"
              className="px-6 py-3 text-sm font-semibold text-white bg-[#e4302f] shadow-lg shadow-pink-500/40 hover:bg-red-700 hover:shadow-pink-500/50 rounded-md transition"
            >
              Start 14-Day Free Trial
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-sm text-white border border-white/20 bg-white/10 backdrop-blur-md hover:border-[#e4302f] hover:bg-[#e4302f]/10 rounded-md transition"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Hero Images */}
        <div className="relative">
          <img
            src="/mobileImageTransparent.png"
            className="absolute top-0 right-0 z-10 w-[500px] rotate-6 animate-float"
          />
          <img
            src="/mobileImageTransparent3.png"
            className="absolute -bottom-20 right-60 w-[450px] animate-bounceSlow"
          />
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes bgMove {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.1) translate(5%, 5%);
          }
        }

        .animation-fadeUp {
          animation: fadeUp 1s ease forwards;
        }
        .animation-fadeUpDelay {
          animation: fadeUp 1s ease forwards;
          animation-delay: 0.3s;
        }
        .animation-fadeUpDelay2 {
          animation: fadeUp 1s ease forwards;
          animation-delay: 0.6s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounceSlow {
          animation: bounceSlow 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
