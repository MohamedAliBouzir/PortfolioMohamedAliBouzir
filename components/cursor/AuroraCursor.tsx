"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useUIStore } from "@/store/ui.store";
import { useTheme } from "next-themes";

/* ── Canvas-drawn Sun / Moon cursor ──────────────────────────── */

/* glowR is pre-eased by the caller — no snapping here */
function drawSun(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  glowR: number,
  glowAlpha: number
) {
  const coreR = 11;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  /* outer glow — warm amber/orange sun halo */
  const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
  outerGlow.addColorStop(0,   `rgba(255,200,40,${glowAlpha * 0.9})`);
  outerGlow.addColorStop(0.4, `rgba(255,140,0,${glowAlpha * 0.5})`);
  outerGlow.addColorStop(0.75,`rgba(255,80,0,${glowAlpha * 0.18})`);
  outerGlow.addColorStop(1,   "rgba(255,80,0,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  /* core — white-hot centre → golden → deep orange */
  const coreGrad = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, coreR);
  coreGrad.addColorStop(0,    "#ffffff");
  coreGrad.addColorStop(0.25, "#fff176");
  coreGrad.addColorStop(0.6,  "#ffb300");
  coreGrad.addColorStop(1,    "#ff6f00");
  ctx.beginPath();
  ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad;
  ctx.shadowColor = "#ffb300";
  ctx.shadowBlur  = 18 + glowAlpha * 18;
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* glowR and glowAlpha are pre-eased by the caller */
function drawMoon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  t: number,
  glowR: number,
  glowAlpha: number
) {
  const R = 12;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  /* outer glow — cool blue-white, eased */
  const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
  outerGlow.addColorStop(0,   `rgba(180,210,255,${glowAlpha * 0.9})`);
  outerGlow.addColorStop(0.5, `rgba(140,180,255,${glowAlpha * 0.35})`);
  outerGlow.addColorStop(1,   "rgba(140,180,255,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  /* stars — fade in/out with glowAlpha */
  const STARS = 6;
  for (let i = 0; i < STARS; i++) {
    const angle = (i / STARS) * Math.PI * 2 + t * 0.5;
    const r     = R + 14 + Math.sin(t * 1.5 + i) * 4;
    const sx    = cx + Math.cos(angle) * r;
    const sy    = cy + Math.sin(angle) * r;
    const sr    = 1.2 + Math.sin(t * 2 + i) * 0.6;
    const sa    = (0.6 + Math.sin(t * 3 + i) * 0.3) * glowAlpha;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${sa})`;
    ctx.shadowColor = "#a0c0ff";
    ctx.shadowBlur  = 6 * glowAlpha;
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  /* crescent body — clip a circle then subtract offset */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.clip();

  /* fill the full circle */
  const moonGrad = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, R);
  moonGrad.addColorStop(0,    "#ffffff");
  moonGrad.addColorStop(0.4,  "#d0e8ff");
  moonGrad.addColorStop(1,    "#7aaeff");
  ctx.fillStyle = moonGrad;
  ctx.shadowColor = "#a0c0ff";
  ctx.shadowBlur  = 12 + glowAlpha * 12;
  ctx.fillRect(cx - R - 2, cy - R - 2, R * 2 + 4, R * 2 + 4);

  /* bite out the crescent using destination-out */
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(cx + R * 0.42, cy - R * 0.12, R * 0.88, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();

  /* crater details */
  [[cx - 3, cy + 3, 2], [cx + 4, cy - 1, 1.3], [cx - 1, cy - 5, 1]].forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100,140,200,0.35)";
    ctx.fill();
  });

  /* specular glint */
  const spec = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx - 5, cy - 5, 5);
  spec.addColorStop(0, "rgba(255,255,255,0.7)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(cx - 5, cy - 5, 5, 0, Math.PI * 2);
  ctx.fillStyle = spec;
  ctx.fill();
}

/* ── Component ───────────────────────────────────────────────── */
export default function AuroraCursor() {
  const cursorVariant = useUIStore((s) => s.cursorVariant);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);

  /* fast spring for the canvas position */
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 520, damping: 38 });
  const springY = useSpring(mouseY, { stiffness: 520, damping: 38 });

  /* refs so the RAF closure always reads current values */
  const posRef     = useRef({ x: -200, y: -200 });
  const hoveredRef = useRef(false);
  const isDarkRef  = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);
  useEffect(() => { hoveredRef.current = cursorVariant === "hover" || cursorVariant === "click"; }, [cursorVariant]);

  /* sync spring output into posRef */
  useEffect(() => {
    const unsubX = springX.on("change", (v) => { posRef.current.x = v; });
    const unsubY = springY.on("change", (v) => { posRef.current.y = v; });
    return () => { unsubX(); unsubY(); };
  }, [springX, springY]);

  /* mouse tracking */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  /* animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 140;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const C = SIZE / 2;

    /* eased glow values — shared lerp for both sun and moon */
    let glowR     = 32;
    let glowAlpha = 0.18;

    const tick = () => {
      tRef.current += 0.016;
      const { x, y } = posRef.current;

      /* lerp toward target each frame — same ease for sun and moon */
      const targetR     = hoveredRef.current ? 58 : 32;
      const targetAlpha = hoveredRef.current ? 0.9 : 0.18;
      glowR     += (targetR     - glowR)     * 0.07;
      glowAlpha += (targetAlpha - glowAlpha) * 0.07;

      canvas.style.left = `${x - C}px`;
      canvas.style.top  = `${y - C}px`;

      if (isDarkRef.current) {
        drawSun(ctx, C, C, glowR, glowAlpha);
      } else {
        drawMoon(ctx, C, C, tRef.current, glowR, glowAlpha);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hidden lg:block"
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99999,
        width: 140,
        height: 140,
        top: -200,
        left: -200,
        borderRadius: "50%",
        background: "transparent",
      }}
    />
  );
}
