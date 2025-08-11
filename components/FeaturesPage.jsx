"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Link from "next/link";


export default function FeaturesPage() {
  const features = [
    { title: "Flyer", image: "/images/image1.jpg", desc: "Beautiful flyer templates" },
    { title: "Poster", image: "/images/image2.jpg", desc: "Bold poster designs" },
    { title: "Social Media Post", image: "/images/image3.jpg", desc: "Ready-to-share posts" },
    { title: "Festive Greetings", image: "/images/image4.jpg", desc: "Warm greeting templates" },
    { title: "Christmas Post", image: "/images/image5.jpg", desc: "Festive holiday posts" },
    { title: "Event Post", image: "/images/image6.jpg", desc: "Event promo templates" },
  ];

  return (
    <div className="relative min-h-screen px-6 py-12 overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d7d2cc]" />

  {/* Blurred abstract circles */}
  <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
  <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-300 rounded-full blur-[150px] opacity-40 animate-pulse"></div>

  {/* Optional subtle pattern overlay */}
  <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

  {/* Page content */}
  <div className="relative max-w-7xl mx-auto z-10">
    <motion.h2
      className="text-4xl font-extrabold text-center mb-10"
      style={{ color: "var(--primary-color)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Top Features
    </motion.h2>

    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 },
      }}
      className="!pb-10"
    >
      {features.map((feature, index) => (
        <SwiperSlide key={index}>
          <Link href="/register" aria-label={`Open ${feature.title} templates`}>
            <motion.article
              className="group relative rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 will-change-transform"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-full aspect-[4/3] bg-center bg-cover relative"
                style={{
                  backgroundImage: `url(${feature.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent transition-opacity duration-400 group-hover:from-black/55" />
                <div className="absolute top-4 left-4 bg-white/80 text-xs font-medium text-gray-800 px-3 py-1 rounded-full backdrop-blur-sm">
                  {feature.title}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[85%]">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 flex items-center justify-between shadow-md">
                    <div className="flex-1 pr-3">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </motion.article>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  <section className="relative w-full bg-[#FC6C87] overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center lg:items-start">
    
    {/* Left content */}
    <div className="flex-1 text-white">
      <h2 className="text-3xl font-bold mb-6">More Design Templates</h2>
      <div className="flex flex-wrap gap-4">
        {[
          "Instagram Post Maker",
          "Facebook Post Maker",
          "Pinterest Post Maker",
          "LinkedIn Post Maker",
          "Instagram Ad Maker",
          "LinkedIn Banner Maker",
          "Social Media Content Calendar",
        ].map((label, i) => (
          <button
            key={i}
            className="bg-white text-gray-800 px-4 py-2 rounded-md shadow hover:shadow-lg hover:scale-[1.02] transition"
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    {/* Right images */}
    <div className="flex-1 mt-10 lg:mt-0 relative flex justify-center">
      <div className="grid grid-cols-2 gap-4 transform rotate-6 scale-105">
        {[
          "/images/image1.jpg",
          "/images/image2.jpg",
          "/images/image3.jpg",
          "/images/image4.jpg",
          "/images/image5.jpg",
          "/images/image6.jpg",
           
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Template ${i + 1}`}
            className="rounded-lg shadow-lg border border-gray-200 w-40 hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  </div>
</section>

</div>

  );
}
