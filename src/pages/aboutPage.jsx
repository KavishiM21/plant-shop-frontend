import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary overflow-x-hidden">
      <div className="w-full h-[400px] md:h-[500px] relative flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img
          src="/about-banner.png"
          alt="Plant Shop Banner"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-secondary/80"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            About <span>Us</span> 🌱
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Bringing nature closer to your home with healthy, hand-picked plants
            and eco-friendly care.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider mb-2">
            Our Story
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">
            Who We Are
          </h2>
          <p className="text-secondary/80 text-lg leading-relaxed">
            We are a passionate team of plant lovers dedicated to providing
            high-quality indoor and outdoor plants for every lifestyle. Whether
            you're a beginner or a plant expert, we have something green for
            you.
          </p>
          <p className="text-secondary/80 text-lg leading-relaxed border-l-4 border-green-500 pl-4 italic">
            "Our plants are grown with care, ensuring freshness, sustainability,
            and long-lasting beauty."
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-4 px-10 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-800 transition-all hover:scale-105 shadow-lg shadow-green-900/20"
          >
            Explore Our Plants
          </Link>
        </div>

        <div className="order-1 md:order-2 relative group">
          <div className="absolute -inset-4 bg-green-200/50 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="w-full h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <img
              src="/about-plants.png"
              alt="Plant Shop"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
              Why Choose Us
            </h2>
            <div className="h-1.5 w-24 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-2 transition-transform">
                <FaLeaf className="text-green-600 text-4xl" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-3">
                Fresh & Healthy Plants
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                Carefully selected plants that thrive in your environment and
                stay vibrant.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-2 transition-transform">
                <FiTruck className="text-green-600 text-4xl" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-3">
                Fast & Safe Delivery
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                Secure, custom-built packaging ensures your plants arrive in
                perfect condition.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-center group sm:col-span-2 md:col-span-1">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-2 transition-transform">
                <FiHeart className="text-green-600 text-4xl" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-3">
                Plant Lover Support
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                Free botanical guidance to help your green friends grow happily
                in your home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
