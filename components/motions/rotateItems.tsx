"use client";

import { motion, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { useRef, useEffect } from "react";

export default function RotateItem({ items }: { items: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  const animationSpeed = 2;

  const itemWidth = 200;
  const gap = 20;
  const itemTotalWidth = itemWidth + gap;
  const repeatedItems = [...items, ...items, ...items, ...items];
  const singleSetWidth = items.length * itemTotalWidth;
  const totalContentWidth = repeatedItems.length * itemTotalWidth;

  // Use a ref for state that persists across renders
  const carouselState = useRef({
    isPaused: false,
  });

  // Main animation loop
  useAnimationFrame(() => {
    // Only auto-scroll when not dragging or paused
    if (!carouselState.current.isPaused) {
      const current = x.get();
      const newPos = current - animationSpeed;
      x.set(newPos);
    }

    if (x.get() <= -singleSetWidth) {
      x.set(x.get() + singleSetWidth);
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      carouselState.current.isPaused = true;
    };

    const handleMouseLeave = () => {
      carouselState.current.isPaused = false;
    };
    
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [velocity, x]);

  return (
    <div
      ref={containerRef}
      className="w-[100vw] max-w-[850px] relative mask-gradient-x overflow-hidden mx-auto group cursor-grab select-none"
    >
      <motion.ul
        className="flex list-none gap-5 h-full"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -totalContentWidth,
          right: 0,
        }}
        onDragStart={() => (carouselState.current.isPaused = true)}
        onDragEnd={() => (carouselState.current.isPaused = false)}
        dragElastic={0}
      >
        {repeatedItems.map((item, index) => (
          <motion.li
            key={`item-${index}`}
            className="flex-[0_0_200px] h-[180px] rounded-lg overflow-hidden"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}