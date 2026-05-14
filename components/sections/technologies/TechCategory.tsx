"use client";

import { motion } from "framer-motion";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";
import TechCard from "./TechCard";

interface TechCategoryProps {
  label: string;
  items: ITechnologiesInterface[];
  delay?: number;
}

export default function TechCategory({ label, items, delay = 0 }: TechCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col gap-5"
    >
      {/* Category label with accent line */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
          {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
      </div>

      {/* 3D cards */}
      <div className="flex flex-wrap gap-3">
        {items.map((tech, i) => (
          <TechCard key={tech.index} tech={tech} index={i} delay={delay} />
        ))}
      </div>
    </motion.div>
  );
}
