"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const colors = ["#FC6C87", "#FFD700", "#FFA500", "#FACC15", "#22C55E"];

export default function FestiveCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const [cursorColor, setCursorColor] = useState("#9b2c2c"); // default dark color

  // 🔹 Individual springs for the sparkle trail (top-level hooks)
  const trail1X = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const trail1Y = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const trail2X = useSpring(mouseX, { stiffness: 170, damping: 20 });
  const trail2Y = useSpring(mouseY, { stiffness: 170, damping: 20 });

  const trail3X = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const trail3Y = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const trail4X = useSpring(mouseX, { stiffness: 110, damping: 20 });
  const trail4Y = useSpring(mouseY, { stiffness: 110, damping: 20 });

  const trail5X = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const trail5Y = useSpring(mouseY, { stiffness: 80, damping: 20 });

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
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover")
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover")
      );
    };
    document.querySelectorAll("button, input, a, svg").forEach(addHover);
  }, []);

  // Optional: change color based on background
  useEffect(() => {
    const checkBg = () => {
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      if (bgColor === "rgb(255, 255, 255)") setCursorColor("#9b2c2c");
      else setCursorColor("#FC6C87");
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
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
        style={{ translateX: trail1X, translateY: trail1Y, backgroundColor: colors[0] }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
        style={{ translateX: trail2X, translateY: trail2Y, backgroundColor: colors[1] }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
        style={{ translateX: trail3X, translateY: trail3Y, backgroundColor: colors[2] }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
        style={{ translateX: trail4X, translateY: trail4Y, backgroundColor: colors[3] }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998] opacity-70"
        style={{ translateX: trail5X, translateY: trail5Y, backgroundColor: colors[4] }}
      />

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
