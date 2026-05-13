"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { IExperiencesInterface } from "@/interfaces/experiences-interface";
import { useUIStore } from "@/store/ui.store";
import dynamic from "next/dynamic";

const LogoPlaceholder3D = dynamic(() => import("@/components/common/LogoPlaceholder3D"), {
  ssr: false,
  loading: () => <span className="text-lg font-bold text-muted-foreground font-mono" />,
});

interface ExperienceCardProps {
  experience: IExperiencesInterface;
  index: number;
  isLeft: boolean;
}

export default function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  const typeColor =
    experience.type === "Full-time"
      ? "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30"
      : experience.type === "Freelance"
      ? "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30"
      : experience.type === "Part-time"
      ? "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30"
      : "bg-muted text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex ${isLeft ? "lg:justify-end lg:pr-12" : "lg:justify-start lg:pl-12"} w-full lg:w-1/2 ${isLeft ? "lg:ml-0" : "lg:ml-auto"}`}
    >
      {/* Timeline dot (desktop) */}
      <div
        className={`hidden lg:flex absolute top-6 ${isLeft ? "right-[-9px]" : "left-[-9px]"} w-4 h-4 rounded-full bg-accent glow-accent z-10`}
      />

      <motion.div
        whileHover={{ y: -3 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
        className="glass rounded-2xl border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden cursor-none w-full max-w-lg"
      >
        {/* Card header */}
        <button
          className="w-full text-left p-5 flex items-start gap-4"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted/50 border border-border/50 flex-shrink-0 flex items-center justify-center">
            {experience.logo ? (
              <Image
                src={experience.logo}
                alt={experience.societeName}
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            ) : (
              <LogoPlaceholder3D initials={experience.societeName} size={44} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-semibold text-sm leading-snug">{experience.position}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{experience.societeName}</p>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border flex-shrink-0 ${typeColor}`}>
                {experience.type}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground font-mono">
              <span>{experience.startDate} — {experience.endDate}</span>
              <span>·</span>
              <span>{experience.presence}</span>
            </div>
          </div>

          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-muted-foreground flex-shrink-0 mt-1 text-sm"
          >
            ▾
          </motion.span>
        </button>

        {/* Technologies */}
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div
                className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: experience.description }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
