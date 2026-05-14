"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import type { StaticImageData } from "next/image";

interface Props { icons: StaticImageData[]; }

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
  isIcon: boolean;
  imgIdx: number;
}

const ICON_COUNT  = 18;
const DOT_COUNT   = 55;
const REPULSE_R   = 100;
const REPULSE_F   = 2.8;
const RETURN_F    = 0.05;
const DAMPING     = 0.85;

export default function TechStarField({ icons }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const activeRef   = useRef(false);           // paused when off-screen
  const particleRef = useRef<Particle[]>([]);
  const imgsRef     = useRef<HTMLImageElement[]>([]);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const { resolvedTheme } = useTheme();
  const isDarkRef   = useRef(resolvedTheme !== "light");
  useEffect(() => { isDarkRef.current = resolvedTheme !== "light"; }, [resolvedTheme]);

  /* preload once */
  useEffect(() => {
    imgsRef.current = icons.map((ic) => {
      const img = new window.Image();
      img.src = typeof ic === "string" ? ic : ic.src;
      return img;
    });
  }, [icons]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const init = (w: number, h: number) => {
      const list: Particle[] = [];
      for (let i = 0; i < DOT_COUNT + ICON_COUNT; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        list.push({
          x, y, ox: x, oy: y,
          vx: 0, vy: 0,
          size: i < DOT_COUNT ? 0.8 + Math.random() * 2 : 14 + Math.random() * 16,
          alpha: i < DOT_COUNT ? 0.15 + Math.random() * 0.5 : 0.07 + Math.random() * 0.13,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          isIcon: i >= DOT_COUNT,
          imgIdx: i % (imgsRef.current.length || 1),
        });
      }
      particleRef.current = list;
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* pause when section scrolls out of view */
    const io = new IntersectionObserver(
      ([entry]) => { activeRef.current = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    /* throttled mouse — update at most every 2 frames worth */
    let lastMouse = 0;
    const section = canvas.parentElement;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouse < 32) return;
      lastMouse = now;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    section?.addEventListener("mousemove", onMove, { passive: true });
    section?.addEventListener("mouseleave", onLeave);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!activeRef.current) return;          // skip entirely when off-screen

      const w    = canvas.width;
      const h    = canvas.height;
      const dark = isDarkRef.current;
      const mx   = mouseRef.current.x;
      const my   = mouseRef.current.y;
      const imgs = imgsRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particleRef.current.length; i++) {
        const p = particleRef.current[i];

        /* repulsion */
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const d2   = dx * dx + dy * dy;
        if (d2 < REPULSE_R * REPULSE_R && d2 > 0) {
          const d     = Math.sqrt(d2);
          const force = (1 - d / REPULSE_R) * REPULSE_F;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        /* spring back */
        p.vx += (p.ox - p.x) * RETURN_F;
        p.vy += (p.oy - p.y) * RETURN_F;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        if (!p.isIcon) {
          /* dot */
          p.twinkle += p.twinkleSpeed;
          const a = p.alpha * (0.7 + 0.3 * Math.sin(p.twinkle));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dark ? `rgba(255,255,255,${a})` : `rgba(4,120,87,${a * 0.6})`;
          ctx.fill();
        } else {
          /* icon — no save/restore, no rotation, no shadow */
          const img = imgs[p.imgIdx];
          if (!img?.complete) continue;
          ctx.globalAlpha = dark ? p.alpha : p.alpha * 0.55;
          ctx.drawImage(img, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.globalAlpha = 1;
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
