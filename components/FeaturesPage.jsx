'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // only Autoplay

export default function FeaturesPage() {
  const features = [
    { title: "Flyer", image: "/images/image1.jpg" },
    { title: "Poster", image: "/images/image2.jpg" },
    { title: "Social Media Post", image: "/images/image3.jpg" },
    { title: "FestivesGreetings", image: "/images/image4.jpg" },
    { title: "Christmas Post", image: "/images/image5.jpg" },
    { title: "Event Post", image: "/images/image6.jpg" },
    { title: "Motivational Quotes", image: "/images/image7.jpg" },
    { title: "Birthday Post", image: "/images/image8.jpg" },
  ];

  return (
    <div
      className="min-h-screen px-6 py-12 relative"
      style={{
        background: "var(--heading-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: "var(--primary-color)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Top Features
        </motion.h2>

        {/* Swiper Slider */}
        <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  }}
  className="pb-10"
>
  {features.map((feature, index) => (
    <SwiperSlide key={index}>
        
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer min-h-[350px] flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Image container with fixed height */}
       <div className="w-full aspect-[4/3] flex items-center justify-center bg-white rounded-lg overflow-hidden">
  <img
    src={feature.image}
    alt={feature.title}
    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
  />
</div>




        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center flex-grow">
          {feature.description}
        </p>
      </motion.div>

    </SwiperSlide>
  ))}
</Swiper>

      </div>
    </div>
  );
}
