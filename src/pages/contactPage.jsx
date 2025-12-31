import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary overflow-x-hidden">
      <div className="w-full h-[350px] md:h-[450px] relative flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img
          src="/about-banner.png"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-secondary/80"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Get In Touch <span className="text-green-400">📬</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            We're here to answer your questions and help you find the perfect
            plant for your sanctuary.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-50">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Send us a Message
            </h2>
            <p className="text-secondary/60">
              We usually respond within 24 hours.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-secondary/70 ml-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="px-6 py-2 border border-gray-400 rounded-full outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-secondary/70 ml-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="px-6 py-2 border border-gray-400 rounded-full outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-secondary/70 ml-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Plant Care Advice"
                className="px-6 py-2 border border-gray-400 rounded-full outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50/50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-secondary/70 ml-2">
                Your Message
              </label>
              <textarea
                placeholder="How can we help you today?"
                className="px-6 py-3 border border-gray-400 rounded-3xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50/50 resize-none h-30"
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-2 px-10 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all hover:scale-[1.02] shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
            >
              Send Message <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="group bg-white p-8 rounded-3xl transition-all hover:bg-green-200/75 flex items-center gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <FaPhoneAlt className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-xl">Phone</h3>
                <p className="text-secondary/70 font-medium">+94 123 456 789</p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl transition-all hover:bg-green-200/75 flex items-center gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <FaEnvelope className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-xl">Email</h3>
                <p className="text-secondary/70 font-medium">
                  info@plantshop.com
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl transition-all hover:bg-green-200/75 flex items-center gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-xl">Address</h3>
                <p className="text-secondary/70 font-medium leading-tight">
                  123 Green Street, <br /> Colombo, Sri Lanka
                </p>
              </div>
            </div>

            <div className="group bg-emerald-950 hover:bg-emerald-900 p-8 rounded-3xl transition-all flex items-center gap-6 text-white shadow-xl shadow-gray-200">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <FiClock className="text-green-400 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Opening Hours</h3>
                <p className="text-white/70 font-medium">
                  Mon - Sat: 9AM - 6PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
