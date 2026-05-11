"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";

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
      className="flex flex-col gap-4"
    >
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground px-1">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((tech, i) => (
          <motion.div
            key={tech.index}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + i * 0.05 }}
            whileHover={{ y: -4, scale: 1.08 }}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass border border-border/50 hover:border-accent/40 transition-all duration-200 cursor-default"
          >
            <div className="w-5 h-5 relative flex-shrink-0">
              <Image
                src={tech.Icon}
                alt={tech.Title}
                fill
                className="object-contain"
                sizes="20px"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
              {tech.Title}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
