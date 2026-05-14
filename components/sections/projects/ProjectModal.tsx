"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { StaticImageData } from "next/image";

const typeColors: Record<string, string> = {
  web:     "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30",
  mobile:  "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30",
  cli:     "bg-aurora-emerald/15 text-aurora-emerald border-aurora-emerald/30",
  desktop: "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
};

interface Project {
  id: number;
  name: string;
  link: string | null;
  type: string[];
  logo: StaticImageData | string;
  description: string;
  technologies: string[];
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  layoutId: string;
}

/* ── Scroll progress bar ─────────────────────────────────────── */
function ProgressBar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const width  = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="absolute top-0 left-0 h-[2px] z-50 rounded-full"
      style={{
        width,
        background: "linear-gradient(90deg, #00c231, #00FF41, #39ff14)",
        boxShadow: "0 0 8px #00FF4188",
      }}
    />
  );
}

/* ── Modal inner ─────────────────────────────────────────────── */
function ModalInner({ project, onClose, layoutId }: {
  project: Project;
  onClose: () => void;
  layoutId: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null!);

  /* lock body scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      {/* Modal shell — shared layoutId with card */}
      <motion.div
        layoutId={layoutId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] glass rounded-2xl border border-accent/30 overflow-hidden flex flex-col"
        style={{ boxShadow: "0 0 80px -16px rgba(0,255,65,0.35)" }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Scroll progress bar pinned to top of modal */}
        <ProgressBar containerRef={scrollRef} />

        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors duration-200 cursor-none"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3 }}
        >
          ✕
        </motion.button>

        {/* Body — two-column layout */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 lg:min-h-[400px]">

          {/* ── Left: sticky logo preview ── */}
          <motion.div
            className="lg:w-[42%] flex-shrink-0 lg:sticky lg:top-0 self-stretch p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border/30"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-[260px] h-[260px] rounded-2xl overflow-hidden glass border border-accent/20 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
              <Image
                src={project.logo}
                alt={project.name}
                width={180}
                height={180}
                className="relative z-10 object-contain drop-shadow-[0_0_24px_rgba(0,255,65,0.3)]"
              />
            </div>
          </motion.div>

          {/* ── Right: scrollable description panel ── */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <motion.div
              className="p-8 flex flex-col gap-8"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-tight">{project.name}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.type.map((t) => (
                      <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[t] ?? "bg-muted text-muted-foreground border-border"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/50" />

              {/* Description */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
              </div>

              {/* Technologies */}
              {project.technologies.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-[11px] px-3 py-1 rounded-lg bg-muted/60 text-muted-foreground font-mono border border-border/40 hover:border-accent/30 hover:text-accent transition-colors duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Live link */}
              {project.link && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">Live</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent font-mono hover:underline underline-offset-4"
                  >
                    {project.link} <span>↗</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Exported modal with portal + AnimatePresence ────────────── */
export default function ProjectModal({ project, open, onClose, layoutId }: ProjectModalProps) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && project && (
        <ModalInner key={project.id} project={project} onClose={onClose} layoutId={layoutId} />
      )}
    </AnimatePresence>,
    document.body
  );
}
