"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";
import { useUIStore } from "@/store/ui.store";

interface TechCardProps {
  tech: ITechnologiesInterface;
  index: number;
  delay: number;
}

export default function TechCard({ tech, index, delay }: TechCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 20 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const iconZ   = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const iconZY  = useTransform(springY, [-0.5, 0.5], [4, -4]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setCursorVariant("default");
  }, [rawX, rawY, setCursorVariant]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: delay + index * 0.045, ease: [0.25, 0.46, 0.45, 0.94] }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setCursorVariant("hover")}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        transformPerspective: 600,
      }}
      className="relative w-[88px] h-[88px] sm:w-24 sm:h-24 group cursor-none"
    >
      {/* Card body */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 glass border border-border/50 group-hover:border-accent/50 transition-colors duration-300"
        style={{
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)",
        }}
        whileHover={{
          boxShadow: "0 0 28px -4px var(--color-accent), 0 8px 32px -8px rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Depth bg glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon — floats in Z on tilt */}
        <motion.div
          className="relative w-8 h-8 flex-shrink-0"
          style={{ x: iconZ, y: iconZY, translateZ: "20px" }}
        >
          <Image
            src={tech.Icon}
            alt={tech.Title}
            fill
            className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            sizes="32px"
          />
        </motion.div>

        {/* Label */}
        <span
          className="text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors duration-200 text-center leading-tight px-1 truncate w-full text-center"
        >
          {tech.Title}
        </span>

        {/* Glare highlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${Math.round((x + 0.5) * 100)}% ${Math.round((y + 0.5) * 100)}%, rgba(255,255,255,0.15) 0%, transparent 55%)`
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
