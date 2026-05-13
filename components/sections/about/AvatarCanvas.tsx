"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import AvatarSvg from "@/assets/images/svg/avatar-moha.svg";

/* ─────────────────────────────────────────────────────────────
   Floating orb — pure CSS animated dot
───────────────────────────────────────────────────────────── */
function Orb({
  style,
  color,
  size,
  delay,
}: {
  style: React.CSSProperties;
  color: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 1.5}px ${color}`,
        ...style,
      }}
      animate={{
        y: [0, -12, 0],
        x: [0, 5, 0],
        scale: [1, 1.08, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Main tilt card — mouse-reactive 3D parallax
───────────────────────────────────────────────────────────── */
export default function AvatarCanvas() {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Raw mouse position relative to card center (-0.5 → 0.5) */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Spring-smoothed values */
  const springX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 });

  /* Map to rotation and depth transforms */
  const rotateY  = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX  = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const glareX   = useTransform(springX, [-0.5, 0.5], ["-30%", "130%"]);
  const glareY   = useTransform(springY, [-0.5, 0.5], ["-30%", "130%"]);

  /* Orb parallax — move opposite direction for depth */
  const orb1X = useTransform(springX, [-0.5, 0.5], ["-8px", "8px"]);
  const orb1Y = useTransform(springY, [-0.5, 0.5], ["-6px", "6px"]);
  const orb2X = useTransform(springX, [-0.5, 0.5], ["10px", "-10px"]);
  const orb2Y = useTransform(springY, [-0.5, 0.5], ["8px", "-8px"]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Floating orbs — behind the card with parallax ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: orb1X, y: orb1Y }}
      >
        <Orb style={{ top: "8%",  left: "0%"  }} color="#c084fc" size={18} delay={0}   />
        <Orb style={{ top: "70%", left: "5%"  }} color="#f472b6" size={13} delay={0.8} />
        <Orb style={{ top: "20%", right: "2%" }} color="#38bdf8" size={15} delay={1.2} />
        <Orb style={{ top: "80%", right: "6%" }} color="#34d399" size={11} delay={0.4} />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none"
        style={{ x: orb2X, y: orb2Y }}
      >
        <Orb style={{ top: "45%", left:  "-2%" }} color="#a78bfa" size={10} delay={1.6} />
        <Orb style={{ top: "10%", right:  "1%" }} color="#facc15" size={9}  delay={2.1} />
      </motion.div>

      {/* ── 3D tilt card ── */}
      <motion.div
        ref={cardRef}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
          transformPerspective: 900,
        }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 cursor-none select-none"
      >
        {/* Aurora glow ring — rotates on hover via CSS */}
        <motion.div
          className="absolute inset-[-18%] rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, #c084fc, #38bdf8, #34d399, #f472b6, #c084fc)",
            opacity: 0.35,
            filter: "blur(18px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Thin spinning border ring */}
        <motion.div
          className="absolute inset-[-6px] rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, #c084fc88, #38bdf888, #34d39988, #f472b688, #c084fc88)",
            padding: "2px",
            borderRadius: "9999px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* Avatar image — transparent bg, no black corners */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-transparent">
          <Image
            src={AvatarSvg}
            alt="Mohamed Ali Bouzir"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Glare highlight — moves with mouse */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
