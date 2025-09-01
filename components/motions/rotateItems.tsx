"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState } from "react";

export default function RotateItem({ items }: { items: React.ReactNode[] }) {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const animationSpeed = 0.75;

  const itemWidth = 200;
  const gap = 20;
  const itemTotalWidth = itemWidth + gap;

  const repeatedItems = [...items, ...items]; // Duplicate full list
  const totalScrollWidth = repeatedItems.length * itemTotalWidth;
  const resetPoint = -1 * items.length * itemTotalWidth; // Reset after original items

  useAnimationFrame(() => {
    if (!isPaused) {
      const current = x.get();
      if (current <= resetPoint) {
        x.set(0); // Reset invisibly
      } else {
        x.set(current - animationSpeed);
      }
    }
  });

  return (
    <div
      className="w-[100vw] max-w-[850px] relative mask-gradient-x overflow-hidden mx-auto group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.ul className="flex list-none gap-5 h-full" style={{ x }}>
        {repeatedItems.map((item, index) => (
          <li
            key={`item-${index}`}
            className="flex-[0_0_200px] h-[180px] rounded-lg overflow-hidden"
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
