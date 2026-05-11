"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useUIStore } from "@/store/ui.store";

export default function AuroraCursor() {
  const cursorVariant = useUIStore((s) => s.cursorVariant);
  const mounted = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 28 });

  useEffect(() => {
    mounted.current = true;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const dotSize = cursorVariant === "hover" ? 10 : cursorVariant === "click" ? 6 : 8;
  const ringSize = cursorVariant === "hover" ? 52 : cursorVariant === "text" ? 64 : 36;

  return (
    <>
      {/* Trailing aurora ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          background:
            "conic-gradient(from 0deg, oklch(72% 0.18 195), oklch(65% 0.28 310), oklch(72% 0.19 155), oklch(75% 0.22 320), oklch(72% 0.18 195))",
          opacity: cursorVariant === "click" ? 0.9 : 0.6,
          filter: "blur(1px)",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* inner transparent hole */}
        <div
          className="absolute inset-[2px] rounded-full bg-background"
          style={{ opacity: 0.85 }}
        />
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          boxShadow: "0 0 10px oklch(75% 0.22 320 / 80%)",
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 600, damping: 40 }}
      />
    </>
  );
}
