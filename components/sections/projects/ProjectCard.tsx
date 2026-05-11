"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useUIStore } from "@/store/ui.store";
import type { StaticImageData } from "next/image";

interface Project {
  id: number;
  name: string;
  link: string | null;
  type: string[];
  logo: StaticImageData | string;
  description: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const typeColors: Record<string, string> = {
  web: "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30",
  mobile: "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30",
  cli: "bg-aurora-emerald/15 text-aurora-emerald border-aurora-emerald/30",
  desktop: "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      className="group relative glass rounded-2xl p-5 border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden cursor-none"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none aurora-gradient opacity-[0.04] rounded-2xl" />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted/50 border border-border/50 flex-shrink-0 flex items-center justify-center">
            <Image
              src={project.logo}
              alt={project.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-end">
            {project.type.map((t) => (
              <span
                key={t}
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[t] ?? "bg-muted text-muted-foreground border-border"}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-base leading-snug group-hover:text-accent transition-colors duration-300">
          {project.name}
        </h3>

        {/* Tech tags */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-xs text-accent font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            View live <span>↗</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
