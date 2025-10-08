"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const colors = ["#FC6C87", "#FFD700", "#FFA500", "#FACC15", "#22C55E"]; // festive colors

export default function FestiveCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const [cursorColor, setCursorColor] = useState("#9b2c2c"); // default dark color

  // Move the cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  // Hover effect over interactive elements
  useEffect(() => {
    const addHover = (el: Element) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    };
    document.querySelectorAll("button, input, a, svg").forEach(addHover);
  }, []);

  // Optional: change color based on background (simple example)
  useEffect(() => {
    const checkBg = () => {
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      if (bgColor === "rgb(255, 255, 255)") setCursorColor("#9b2c2c"); // dark on white
      else setCursorColor("#FC6C87"); // bright on pink
    };
    window.addEventListener("scroll", checkBg);
    checkBg();
    return () => window.removeEventListener("scroll", checkBg);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] shadow-lg"
        style={{
          translateX: springX,
          translateY: springY,
          background: cursorColor,
          boxShadow: `0 0 8px ${cursorColor}, 0 0 15px ${cursorColor}55`,
        }}
      />

      {/* Sparkle trail */}
      {colors.map((color, idx) => (
        <motion.div
          key={idx}
          className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
          style={{
            translateX: useSpring(mouseX, { stiffness: 200 - idx * 30, damping: 20 }),
            translateY: useSpring(mouseY, { stiffness: 200 - idx * 30, damping: 20 }),
            backgroundColor: color,
          }}
        />
      ))}

      {/* Hover effect */}
      <style jsx global>{`
        body.cursor-hover .fixed:first-child {
          transform: scale(1.8) !important;
          background: #ffd700;
          box-shadow: 0 0 12px #ffd700, 0 0 20px #ffd70055;
        }
      `}</style>
    </>
  );
}
