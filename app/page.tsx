'use client';

import { motion } from 'framer-motion';
import './globals.css';

const HomePage = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-12 text-white shadow-inner"
      style={{
        background: "var(--primary-gradient)",
        color: "var(--text-color)",
      }}
    >
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            style={{ color: "var(--heading-color)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Celebrate Every Festival with Stunning Designs
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-6 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Create personalized festival creatives effortlessly with modern templates. Make every occasion stand out!
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-semibold px-6 py-3 rounded-full shadow transition-all"
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
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          <img
            src="https://www.picmaker.com/assets/images/festivaltemplates/Hero%20Graphic.png"
            alt="Festival Hero"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
