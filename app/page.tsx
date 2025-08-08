import React from 'react';
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
  {/* Flower Background Overlay */}
  <div
    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] opacity-120 mix-blend-overlay"
    aria-hidden="true"
  />

  <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
    {/* Text Section */}
    <div className="flex-1 text-center md:text-left">
      <h1
        className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
        style={{ color: "var(--heading-color)" }}
      >
        Celebrate Every Festival with Stunning Designs
      </h1>
      <p className="text-lg md:text-xl mb-6 drop-shadow">
        Create personalized festival creatives effortlessly with modern templates. Make every occasion stand out!
      </p>
      <button
        className="font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all"
        style={{
          backgroundColor: "var(--button-bg)",
          color: "var(--button-text)",
        }}
      >
        Get Started for Free
      </button>
    </div>

    {/* Image Section */}
    <div className="flex-1">
      <img
        src="https://www.picmaker.com/assets/images/festivaltemplates/Hero%20Graphic.png"
        alt="Festival Hero"
        className="w-full max-w-md mx-auto drop-shadow-2xl animate-fade-in"
      />
    </div>
  </div>
</div>

  );
};

export default HomePage;
