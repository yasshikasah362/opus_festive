"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FeaturesPage() {
  const router = useRouter();
  const features = [
    { title: "Flyer", image: "/images/image1.jpg", desc: "Beautiful flyer templates" },
    { title: "Poster", image: "/images/image2.jpg", desc: "Bold poster designs" },
    { title: "Social Media Post", image: "/images/image3.jpg", desc: "Ready-to-share posts" },
    { title: "Festive Greetings", image: "/images/image4.jpg", desc: "Warm greeting templates" },
    { title: "Christmas Post", image: "/images/image5.jpg", desc: "Festive holiday posts" },
    { title: "Event Post", image: "/images/image6.jpg", desc: "Event promo templates" },
  ];

  return (
    <>
    
    <div
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 text-white shadow-inner"
            style={{
              background: "var(--primary-gradient)",
              color: "var(--text-color)",
            }}
          >
            {/* Background Pattern Overlay */}
            <div
              className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-20 mix-blend-overlay"
              aria-hidden="true"
            />
    
            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10">
              {/* Text Section */}
              <motion.div
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
                  style={{ color: "var(--heading-color)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Celebrate Every Festival with Stunning Designs
                </motion.h1>
    
                <motion.p
                  className="text-base sm:text-lg md:text-xl mb-6 drop-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Create personalized festival creatives effortlessly with modern templates. 
                  Make every occasion stand out!
                </motion.p>
    
               <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow transition-all text-sm sm:text-base"
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
          }}
        >
          Get Started for Free
        </motion.button>
    
              </motion.div>
    
              {/* Image Section */}
              <motion.div
                className="flex-1 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
              >
                <img
                  src="https://www.picmaker.com/assets/images/festivaltemplates/Hero%20Graphic.png"
                  alt="Festival Hero"
                  className="w-3/4 sm:w-2/3 md:w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>

    <div className="relative min-h-screen px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d7d2cc]" />

      {/* Blurred abstract circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-300 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-300 rounded-full blur-[120px] opacity-40 animate-pulse"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

      {/* Page content */}
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10"
          style={{ color: "var(--primary-color)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Top Features
        </motion.h2>

        {/* Swiper Responsive */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1400: { slidesPerView: 4, spaceBetween: 28 },
          }}
          className="!pb-10"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <Link href="/register" aria-label={`Open ${feature.title} templates`}>
                <motion.article
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 will-change-transform"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="w-full aspect-[4/3] bg-center bg-cover relative"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent transition-opacity duration-400 group-hover:from-black/55" />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/80 text-[10px] sm:text-xs font-medium text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                      {feature.title}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 w-[90%] sm:w-[85%]">
                      <div className="bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-between shadow-md">
                        <div className="flex-1 pr-2 sm:pr-3">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                            {feature.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 line-clamp-1">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-black/5" />
                </motion.article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* More Design Templates Section */}
      <section className="relative w-full bg-[#FC6C87] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          
          {/* Left content */}
          <div className="flex-1 text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">More Design Templates</h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
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
                  className="bg-white text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow hover:shadow-lg hover:scale-[1.02] transition text-sm sm:text-base"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Right images */}
          <div className="flex-1 mt-6 lg:mt-0 relative flex justify-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 transform rotate-3 sm:rotate-6 scale-100 sm:scale-105">
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
                  className="rounded-lg shadow-lg border border-gray-200 w-28 sm:w-36 md:w-40 hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
