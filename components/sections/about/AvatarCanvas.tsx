"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

/* ── Matrix rain canvas ─────────────────────────────────────── */
const CHARS = "アWイMエOカJクZケコGシスセソタHツテNトQナニヌネノ0123456789ABCDEF∆∇∑∏∞≈ΩΨΦ";
const FONT_SIZE = 13;

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  colorIdx: number;
  opacity: number;
}

/* dark: vivid matrix greens   |   light: muted forest greens */
const PALETTE_DARK  = ["#00FF41", "#00e039", "#00c231", "#39ff14", "#7fff7f", "#00FF7F"];
const PALETTE_LIGHT = ["#059669", "#047857", "#065f46", "#10b981", "#34d399", "#6ee7b7"];

function initColumns(w: number, h: number, paletteLen: number): Column[] {
  const cols = Math.floor(w / FONT_SIZE);
  return Array.from({ length: cols }, (_, i) => ({
    x: i * FONT_SIZE,
    y: Math.random() * -h,
    speed: 0.8 + Math.random() * 1.6,
    chars: Array.from({ length: 32 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
    length: 8 + Math.floor(Math.random() * 18),
    colorIdx: Math.floor(Math.random() * paletteLen),
    opacity: 0.3 + Math.random() * 0.7,
  }));
}

function MatrixCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colsRef   = useRef<Column[]>([]);
  const rafRef    = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      colsRef.current = initColumns(canvas.width, canvas.height, PALETTE_DARK.length);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tick = () => {
      const dark = isDarkRef.current;
      const pal  = dark ? PALETTE_DARK : PALETTE_LIGHT;
      const w = canvas.width;
      const h = canvas.height;

      /* fade trail */
      ctx.fillStyle = dark ? "rgba(0,0,0,0.18)" : "rgba(238,242,235,0.22)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px monospace`;

      colsRef.current.forEach((col) => {
        col.y += col.speed;

        /* randomise a char occasionally */
        if (Math.random() < 0.04) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        for (let j = 0; j < col.length; j++) {
          const cy = col.y - j * FONT_SIZE;
          if (cy < 0 || cy > h) continue;

          /* head char — bright white/light spike */
          if (j === 0) {
            ctx.fillStyle = dark ? `rgba(255,255,255,${col.opacity})` : `rgba(26,46,26,${col.opacity})`;
          } else {
            /* tail fades out */
            const fade = (1 - j / col.length) * col.opacity;
            const hex  = Math.round(fade * 255).toString(16).padStart(2, "0");
            ctx.fillStyle = `${pal[col.colorIdx]}${hex}`;
          }

          ctx.fillText(col.chars[j % col.chars.length], col.x, cy);
        }

        /* reset column when it scrolls past */
        if (col.y - col.length * FONT_SIZE > h) {
          col.y      = -FONT_SIZE * 4;
          col.speed  = 0.8 + Math.random() * 1.6;
          col.length = 8 + Math.floor(Math.random() * 18);
          col.colorIdx = Math.floor(Math.random() * pal.length);
          col.opacity  = 0.3 + Math.random() * 0.7;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
    />
  );
}

/* ── Floating orb ───────────────────────────────────────────── */
function Orb({ style, color, size, delay }: {
  style: React.CSSProperties;
  color: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, boxShadow: `0 0 ${size * 1.5}px ${color}`, ...style }}
      animate={{ y: [0, -12, 0], x: [0, 5, 0], scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function AvatarCanvas() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  /* mouse tracking */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const glareX  = useTransform(springX, [-0.5, 0.5], ["-30%", "130%"]);
  const glareY  = useTransform(springY, [-0.5, 0.5], ["-30%", "130%"]);
  const orb1X   = useTransform(springX, [-0.5, 0.5], ["-8px", "8px"]);
  const orb1Y   = useTransform(springY, [-0.5, 0.5], ["-6px", "6px"]);
  const orb2X   = useTransform(springX, [-0.5, 0.5], ["10px", "-10px"]);
  const orb2Y   = useTransform(springY, [-0.5, 0.5], ["8px", "-8px"]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  /* ring colours — matrix green */
  const ringA = isDark ? "#00FF41" : "#059669";
  const ringB = isDark ? "#00c231" : "#047857";
  const ringC = isDark ? "#39ff14" : "#10b981";

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Floating orbs behind card */}
      <motion.div className="absolute pointer-events-none" style={{ x: orb1X, y: orb1Y }}>
        <Orb style={{ top: "8%",  left: "0%"   }} color={isDark ? "#00FF41" : "#059669"} size={18} delay={0}   />
        <Orb style={{ top: "70%", left: "5%"   }} color={isDark ? "#00c231" : "#047857"} size={13} delay={0.8} />
        <Orb style={{ top: "20%", right: "2%"  }} color={isDark ? "#39ff14" : "#10b981"} size={15} delay={1.2} />
        <Orb style={{ top: "80%", right: "6%"  }} color={isDark ? "#7fff7f" : "#34d399"} size={11} delay={0.4} />
      </motion.div>
      <motion.div className="absolute pointer-events-none" style={{ x: orb2X, y: orb2Y }}>
        <Orb style={{ top: "45%", left:  "-2%" }} color={isDark ? "#00FF41" : "#059669"} size={10} delay={1.6} />
        <Orb style={{ top: "10%", right:  "1%" }} color={isDark ? "#00e039" : "#065f46"} size={9}  delay={2.1} />
      </motion.div>

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d", transformPerspective: 900 }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 cursor-none select-none"
      >
        {/* Spinning matrix-green aurora ring */}
        <motion.div
          className="absolute inset-[-18%] rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, ${ringA}, ${ringB}, ${ringC}, ${ringA}88, ${ringB}, ${ringA})`,
            opacity: 0.4,
            filter: "blur(18px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Thin spinning border ring */}
        <motion.div
          className="absolute inset-[-6px] rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, ${ringA}88, ${ringB}55, ${ringC}88, ${ringA}33, ${ringA}88)`,
            padding: "2px",
            borderRadius: "9999px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* Circle container: matrix rain bg + avatar on top */}
        <div className="relative w-full h-full rounded-full overflow-hidden">
          {/* Matrix rain background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: isDark ? "#000000" : "#eef2eb" }}
          />
          <MatrixCanvas isDark={isDark} />

          {/* Avatar — object-position pushes face to center */}
          <Image
            src="/MyAvatar.png"
            alt="Mohamed Ali Bouzir"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="relative z-10 object-cover object-[center_8%]"
            priority
          />

          {/* Matrix green glare that follows the cursor shine */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            style={{
              background: useTransform(
                [springX, springY],
                ([x, y]: number[]) => {
                  const px = Math.round((x + 0.5) * 100);
                  const py = Math.round((y + 0.5) * 100);
                  const shine = isDark ? "rgba(0,255,65,0.22)" : "rgba(5,150,105,0.18)";
                  return `radial-gradient(circle at ${px}% ${py}%, ${shine} 0%, transparent 65%)`;
                }
              ),
            }}
          />
        </div>

        {/* White/dark glare highlight on the card surface */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.13) 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
