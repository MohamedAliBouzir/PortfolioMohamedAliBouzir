"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useUIStore } from "@/store/ui.store";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroContent() {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex flex-col items-center text-center gap-6 px-4 max-w-4xl mx-auto"
    >
      <motion.span
        variants={item}
        className="text-xs font-mono uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20"
      >
        Full-Stack JS Engineer
      </motion.span>

      <motion.h1
        variants={item}
        className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-none tracking-tight"
        onMouseEnter={() => setCursorVariant("text")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <span className="block text-foreground">Mohamed Ali</span>
        <span className="block aurora-gradient-text">Bouzir</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed"
      >
        Crafting high-performance web experiences with modern tech.
        React, Next.js, Node.js — from pixel-perfect UIs to scalable APIs.
      </motion.p>

      <motion.div variants={item} className="flex items-center gap-4 mt-2">
        <motion.a
          href="#contact"
          className="relative px-7 py-3 rounded-full font-semibold text-sm bg-accent text-accent-foreground overflow-hidden group"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <span className="relative z-10">Get in touch</span>
          <motion.div
            className="absolute inset-0 aurora-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.a>

        <motion.a
          href="#projects"
          className="px-7 py-3 rounded-full font-semibold text-sm glass border border-border hover:border-accent/40 transition-colors duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          View Work
        </motion.a>
      </motion.div>

      <motion.div
        variants={item}
        className="flex items-center gap-6 mt-4 text-muted-foreground"
      >
        {[
          { label: "Tunisia", icon: "🌍" },
          { label: "Open to remote", icon: "💼" },
          { label: "Available", icon: "🟢" },
        ].map(({ label, icon }) => (
          <span key={label} className="text-sm flex items-center gap-1.5">
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
