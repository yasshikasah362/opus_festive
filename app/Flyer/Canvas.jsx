"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      const fabric = (await import("fabric")).default;  // ✅ dynamic import
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: "#f3f4f6",
      });

      const circle = new fabric.Circle({
        left: 200,
        top: 150,
        radius: 40,
        fill: "blue",
      });

      canvas.add(circle);
    })();
  }, []);

  return <canvas ref={canvasRef} />;
}
