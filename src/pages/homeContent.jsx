import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSpa, FaTree, FaSun, FaLeaf } from "react-icons/fa";

const SLOGANS = [
  "Breathe fresh air with our indoor collection.",
  "Eco-friendly care for every leaf and bloom.",
  "Transform your space into a living sanctuary.",
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-primary overflow-x-hidden">
      <section className="relative w-full min-h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/about-banner.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-secondary/90" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full text-center md:text-left space-y-6 md:w-1/2">
            <p className="flex items-center justify-center md:justify-start gap-2 text-3xl font-semibold uppercase tracking-[0.3em] text-green-400">
              <FaLeaf />
              Leaf and Bloom
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-3xl lg:text-6xl">
              Create Your Own <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Green Oasis
              </span>
            </h1>

            <p className="min-h-[2.5rem] text-lg sm:text-2xl font-medium text-green-100/70 animate-pulse italic">
              {SLOGANS[activeIndex]}
            </p>

            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row md:items-start">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-green-700 hover:scale-105"
              >
                Shop Collection{" "}
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-bold text-white backdrop-blur-md transition hover:bg-white/30"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md bg-green-500/10 hover:border-green-400 transition-colors">
              <FaSpa className="text-green-400 text-2xl mb-3" />
              <p className="text-lg font-semibold text-white">Pure Air</p>
              <p className="mt-1 text-sm text-green-100/80">
                Natural air purifiers that remove toxins and boost your mood.
              </p>
            </div>

            <div className="rounded-2xl border bg-green-500/10 hover:border-green-400 p-5 backdrop-blur-md">
              <FaTree className="text-green-400 text-2xl mb-3" />
              <p className="text-lg font-semibold text-white">Hand-Picked</p>
              <p className="mt-1 text-sm text-green-100/80">
                Sourced from organic nurseries for guaranteed freshness.
              </p>
            </div>

            <div className=" hover:border-green-400 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md sm:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <p className="border-green-500/40 text-md uppercase tracking-widest text-green-500 font-bold">
                  Quick Support
                </p>
                <FaSun className="text-yellow-400" />
              </div>
              <p className="text-sm text-green-100/80">
                Join 5,000+ plant parents. Get expert care advice 24/7 for every
                seed you plant.
              </p>
              <div className="mt-4 flex gap-4 text-sm font-semibold text-green-300">
                <Link to="/contacts" className="hover:underline">
                  Contact Expert
                </Link>
                <Link to="/reviews" className="hover:underline">
                  Customer Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-green-700">
            Plants for Every Corner
          </h2>
          <p className="text-secondary/70 text-lg leading-relaxed">
            From low-light indoor survivors to sun-loving balcony beauties, we
            provide plants that fit your specific environment and lifestyle.
          </p>
          <div className="text-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="shadow-sm hover:shadow-xl flex items-center gap-3 p-3 bg-green-50 rounded-lg text-secondary">
              <FaLeaf className="text-green-600" /> Indoor Foliage
            </div>
            <div className="shadow-sm hover:shadow-xl flex items-center gap-3 p-3 bg-green-50 rounded-lg text-secondary">
              <FaTree className="text-green-600" /> Exotic Palms
            </div>
          </div>
          <Link
            to="/products"
            className="text-xl inline-block font-bold text-black hover:underline"
          >
            View full catalog &rarr;
          </Link>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="absolute -inset-4 bg-green-200/50 rounded-full blur-3xl opacity-30"></div>
          <img
            src="/about-plants.png"
            alt="Interior Plants"
            className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] shadow-2xl transition-transform hover:scale-[1.02] duration-500"
          />
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-secondary p-10 md:p-16 rounded-[3rem] text-primary text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to grow?
            </h2>
            <p className="mb-10 text-primary/70 text-lg">
              Start your journey today and get 10% off your first order.
            </p>
            <Link
              to="/products"
              className="px-10 py-4 bg-green-500 text-secondary font-bold rounded-full hover:bg-green-600 transition-all shadow-xl"
            >
              Get Started Now
            </Link>
          </div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-800/20 rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-800/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
