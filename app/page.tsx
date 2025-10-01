'use client';

import { motion } from 'framer-motion';
import './globals.css';
import FeaturesPage from '../components/FeaturesPage';
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
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

      <FeaturesPage />
    </>
  );
};

export default HomePage;
