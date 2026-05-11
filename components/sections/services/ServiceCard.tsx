"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { IServicesInterface } from "@/interfaces/services-interface";
import { useUIStore } from "@/store/ui.store";

interface ServiceCardProps {
  service: IServicesInterface;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      className="group relative glass rounded-2xl p-6 border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden cursor-none"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 aurora-gradient opacity-5 rounded-2xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center overflow-hidden">
          <Image
            src={service.Icon}
            alt={service.Title}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2 group-hover:text-accent transition-colors duration-300">
            {service.Title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.Description}
          </p>
        </div>

        <div className="flex items-center gap-1 text-accent text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mb-1">
          Learn more <span className="text-sm">→</span>
        </div>
      </div>
    </motion.div>
  );
}
