"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/ui.store";
import type { StaticImageData } from "next/image";

interface Project {
  id: number;
  name: string;
  link: string | null;
  type: string[];
  logo: StaticImageData | string | null;
  description: string;
  technologies: string[];
  restricted?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
  layoutId: string;
}

const typeColors: Record<string, string> = {
  web: "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30",
  mobile: "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30",
  cli: "bg-aurora-emerald/15 text-aurora-emerald border-aurora-emerald/30",
  desktop: "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
};

/* ── Palettes ───────────────────────────────────────────────────────────── */
/* dark: vivid matrix neons  |  light: muted forest greens */
const PALETTE_DARK  = ["#00FF41", "#00e039", "#00c231", "#39ff14", "#00FF7F", "#7fff7f"];
const PALETTE_LIGHT = ["#059669", "#047857", "#065f46", "#10b981", "#34d399", "#6ee7b7"];

/* restricted palettes */
const PALETTE_RED_DARK  = ["#ff3333", "#ff5555", "#cc2222", "#ff0000", "#ff7777", "#ff9999"];
const PALETTE_RED_LIGHT = ["#cc2222", "#dd3333", "#aa1111", "#ff5555", "#ff6666", "#ff8888"];

/* trail-fade fill: black for dark, card bg for light */
const TRAIL_FILL_DARK  = "rgba(0,0,0,0.18)";
const TRAIL_FILL_LIGHT = "rgba(238,242,235,0.22)";

/* border glow color per theme */
const GLOW_DARK  = "#00FF41";
const GLOW_LIGHT = "#059669";

/* ── Types ──────────────────────────────────────────────────────────────── */
const STAR_COUNT   = 55;
const NEBULA_COUNT = 4;

interface Star {
  x: number; y: number; z: number;
  px: number; py: number;
  size: number;
  colorIdx: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface Nebula {
  x: number; y: number;
  r: number;
  colorIdx: number;
  phase: number;
  speed: number;
}

function initStars(w: number, h: number, paletteLen: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * w,
    px: 0, py: 0,
    size: Math.random() * 1.4 + 0.3,
    colorIdx: Math.floor(Math.random() * paletteLen),
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.02 + Math.random() * 0.04,
  }));
}

function initNebulae(w: number, h: number, paletteLen: number): Nebula[] {
  return Array.from({ length: NEBULA_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 60 + Math.random() * 80,
    colorIdx: Math.floor(Math.random() * paletteLen),
    phase: Math.random() * Math.PI * 2,
    speed: 0.003 + Math.random() * 0.005,
  }));
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function ProjectCard({ project, index, onOpen, layoutId }: ProjectCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const isDarkRef = useRef(resolvedTheme === "dark");

  useEffect(() => {
    setMounted(true);
    isDarkRef.current = resolvedTheme === "dark";
  }, [resolvedTheme]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const starsRef  = useRef<Star[]>([]);
  const nebulaRef = useRef<Nebula[]>([]);

  const opacityMV = useMotionValue(0);
  const opacity   = useSpring(opacityMV, { stiffness: 36, damping: 20 });
  const opacityRef = useRef(opacity);

  const startCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w  = canvas.width;
    const h  = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxD = Math.sqrt(cx * cx + cy * cy);

    const palette = PALETTE_DARK; // initialise with any palette — tick picks the live one
    if (!starsRef.current.length)  starsRef.current  = initStars(w, h, palette.length);
    if (!nebulaRef.current.length) nebulaRef.current = initNebulae(w, h, palette.length);

    const tick = () => {
      const isDark = isDarkRef.current;
      const isRestricted = project.restricted === true;
      const pal = isRestricted
        ? (isDark ? PALETTE_RED_DARK : PALETTE_RED_LIGHT)
        : (isDark ? PALETTE_DARK : PALETTE_LIGHT);
      const currentOpacity = opacityRef.current.get();

      /* clear every frame so the canvas never drifts toward black.
         blend in the card base colour proportional to hover opacity so
         the glass shows through at rest and the space bg fades in cleanly. */
      ctx.clearRect(0, 0, w, h);
      if (currentOpacity > 0.01) {
        const baseAlpha = isDark ? 0.92 : 0.88;
        ctx.fillStyle = isDark
          ? `rgba(10,10,10,${baseAlpha * currentOpacity})`
          : `rgba(238,242,235,${baseAlpha * currentOpacity})`;
        ctx.fillRect(0, 0, w, h);
        /* trail ghost — shorter persistence on light so greens stay vibrant */
        ctx.fillStyle = isDark ? TRAIL_FILL_DARK : TRAIL_FILL_LIGHT;
        ctx.fillRect(0, 0, w, h);
      }

      /* nebulae */
      nebulaRef.current.forEach((n) => {
        n.phase += n.speed;
        const pulse = 0.06 + 0.04 * Math.sin(n.phase);
        const grad  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        const alpha = Math.round(pulse * currentOpacity * 255).toString(16).padStart(2, "0");
        grad.addColorStop(0, `${pal[n.colorIdx]}${alpha}`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* stars — warp towards viewer */
      starsRef.current.forEach((s) => {
        s.z -= 2.2;
        if (s.z <= 0) {
          s.x = Math.random() * w;
          s.y = Math.random() * h;
          s.z = w;
          s.px = s.x;
          s.py = s.y;
        }

        const sx = (s.x - cx) * (w / s.z) + cx;
        const sy = (s.y - cy) * (w / s.z) + cy;

        /* comet trail */
        const dist       = Math.sqrt((sx - cx) ** 2 + (sy - cy) ** 2);
        const trailAlpha = Math.min(1, dist / maxD) * 0.55 * currentOpacity;
        ctx.beginPath();
        ctx.moveTo(s.px, s.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `${pal[s.colorIdx]}${Math.round(trailAlpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth   = s.size * (1 - s.z / w) * 1.5;
        ctx.stroke();

        /* star dot */
        s.twinkle += s.twinkleSpeed;
        const dotR   = Math.max(0.1, s.size * (1 - s.z / w) * (0.8 + 0.2 * Math.sin(s.twinkle)));
        const dotAlpha = (0.7 + 0.3 * Math.sin(s.twinkle)) * currentOpacity;
        ctx.beginPath();
        ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `${pal[s.colorIdx]}${Math.round(dotAlpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();

        s.px = sx;
        s.py = sy;
      });

      /* scanlines */
      const scanR = isRestricted
        ? "255,51,51"
        : (isDark ? "0,255,65" : "5,150,105");
      ctx.fillStyle = `rgba(${scanR},${0.012 * currentOpacity})`;
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [opacityMV]);

  const stopCanvas = useCallback(() => cancelAnimationFrame(rafRef.current), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width  = rect.width  || 320;
    canvas.height = rect.height || 200;
    startCanvas();
    return () => stopCanvas();
  }, [startCanvas, stopCanvas]);

  const handleEnter = useCallback(() => {
    opacityMV.set(1);
    setCursorVariant("hover");
  }, [opacityMV, setCursorVariant]);

  const handleLeave = useCallback(() => {
    opacityMV.set(0);
    setCursorVariant("default");
  }, [opacityMV, setCursorVariant]);

  /* live glow colour tracks theme via CSS variables */

  const R = "#ff3333";
  const isRestricted = project.restricted === true;

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, zIndex: 10 }}
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative glass rounded-2xl overflow-hidden cursor-none h-full"
      style={isRestricted ? {
        borderColor: "rgba(255,51,51,0.25)",
      } : undefined}
    >
      {/* Space canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isRestricted
            ? "inset 0 0 0 1px rgba(255,51,51,0.4)"
            : "inset 0 0 0 1px var(--glow-color)",
          opacity: mounted ? opacity : 0
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 h-full p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          {/* Logo / icon */}
          <div
            className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative"
            style={isRestricted ? {
              background: "rgba(255,51,51,0.08)",
              border: "1px solid rgba(255,51,51,0.4)",
            } : undefined}
          >
            {isRestricted ? (
              <motion.span
                className="text-xl"
                style={{ color: R }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                ⛔
              </motion.span>
            ) : project.logo ? (
              <Image src={project.logo} alt={project.name} fill sizes="48px" className="object-contain p-1" />
            ) : (
              <span className="text-lg font-bold font-mono text-muted-foreground">
                {project.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Type badges */}
          <div className="flex flex-wrap gap-1.5 justify-end">
            {project.type.map((t) => (
              isRestricted ? (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{ background: "rgba(255,51,51,0.1)", color: R, borderColor: "rgba(255,51,51,0.35)" }}
                >
                  {t}
                </span>
              ) : (
                <span
                  key={t}
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[t] ?? "bg-muted text-muted-foreground border-border"}`}
                >
                  {t}
                </span>
              )
            ))}
          </div>
        </div>



        {/* Name */}
        <h3
          className="font-semibold text-base leading-snug transition-colors duration-300"
          style={isRestricted ? { color: R } : undefined}
        >
          {!isRestricted && <span className="group-hover:text-accent transition-colors duration-300">{project.name}</span>}
          {isRestricted && project.name}
        </h3>

        {/* Tech tags */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${!isRestricted ? "bg-muted/60 text-muted-foreground" : ""}`}
                style={isRestricted ? {
                  background: "rgba(255,51,51,0.08)",
                  color: "rgba(255,100,100,0.9)",
                  border: "1px solid rgba(255,51,51,0.2)",
                } : undefined}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${!isRestricted ? "bg-muted/60 text-muted-foreground" : ""}`}
                style={isRestricted ? {
                  background: "rgba(255,51,51,0.08)",
                  color: "rgba(255,100,100,0.9)",
                  border: "1px solid rgba(255,51,51,0.2)",
                } : undefined}
              >
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Link — non-restricted only */}
        {!isRestricted && project.link && (
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
