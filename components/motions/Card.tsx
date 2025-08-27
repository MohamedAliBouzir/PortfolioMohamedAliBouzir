/* eslint-disable react/jsx-key */
"use client";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { JSX, useRef } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiPython,
} from "react-icons/si";
export default function ScrollTriggered() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-5xl mx-auto py-12">
      {food.map(([emoji, hueA, hueB], i) => (
        <Carded i={i} emoji={emoji} hueA={hueA} hueB={hueB} />
      ))}
    </div>
  );
}

interface CardProps {
  emoji: JSX.Element;
  hueA: number;
  hueB: number;
  i: number;
}

function Carded({ emoji, hueA, hueB, i }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i} `}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <Card emoji={emoji} hueA={hueA} hueB={hueB} i={i} />
    </motion.div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
  fontSize: "2vw", // Responsive font size
  width: "80%", // Card takes 90% of its container's width
  height: "31vw", // Responsive height, adjust as needed
  maxWidth: 220, // Optional: limit max size for very large screens
  maxHeight: 320,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  zIndex:0,
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
};

/**
 * ==============   Data   ================
 */

const food: [JSX.Element, number, number][] = [
  [<SiTypescript size="3em" color="hsl(210, 100%, 50%)" />, 210, 220],  // TypeScript Blue
  [<SiReact size="3em" color="hsl(193, 90%, 55%)" />, 193, 203],        // React Cyan Blue
  [<SiNextdotjs size="3em" color="hsl(0, 0%, 10%)" />, 0, 0],           // Next.js Dark Grey
  [<SiNodedotjs size="3em" color="hsl(130, 70%, 40%)" />, 130, 140],    // Node.js Green
  [<SiNestjs size="3em" color="hsl(345, 85%, 55%)" />, 345, 355],       // NestJS Reddish Pink
  [<SiPython size="3em" color="hsl(44, 90%, 60%)" />, 44, 54],
];

function Card({ emoji, hueA, hueB, i }: CardProps) {
  const background = hueA === 0 && hueB === 0 ? "var(--foreground)" : `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  // Add refs and motion values for tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Adjust the multiplier for more/less tilt
    const maxTilt = 15;
    const rotateYVal = ((x - centerX) / centerX) * maxTilt;
    const rotateXVal = -((y - centerY) / centerY) * maxTilt;
    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card-container-${i} w-full aspect-[3/4] flex justify-center items-center relative`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ ...splash, background }} />
      <motion.div
        style={{
          ...card,
          rotateX,
          rotateY,
          willChange: "transform",
        }}
        variants={cardVariants}
        className="card"
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}
