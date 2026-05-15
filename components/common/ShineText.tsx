"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface ShineTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "div";
}

/* dark: matrix green body, white hot-spot */
const DARK  = { base: "#00FF41", dim: "#00a329", shine: "#ffffff" };
/* light: forest green body, dark-gray hot-spot */
const LIGHT = { base: "#059669", dim: "#047857", shine: "#1a2e1a" };

export default function ShineText({ children, className = "", as: Tag = "span" }: ShineTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef(resolvedTheme === "dark");

  useEffect(() => {
    isDarkRef.current = resolvedTheme === "dark";
    apply(null); // re-paint on theme switch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme]);

  const apply = useCallback((e: MouseEvent | null) => {
    const el = ref.current;
    if (!el) return;

    const pal = isDarkRef.current ? DARK : LIGHT;
    const rect = el.getBoundingClientRect();

    if (!e) {
      /* no cursor — flat base colour */
      el.style.backgroundImage = `linear-gradient(135deg, ${pal.dim} 0%, ${pal.base} 50%, ${pal.dim} 100%)`;
      el.style.webkitBackgroundClip = "text";
      el.style.backgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
      el.style.color = "transparent";
      return;
    }

    /* cursor position as fraction of the element (0–1), clamped with margin */
    const margin = Math.max(rect.width, rect.height) * 1.8;
    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top)  / rect.height;

    /* proximity — 1 when cursor is inside, fades to 0 at `margin` px away */
    const nearestX = Math.max(rect.left, Math.min(rect.right,  e.clientX));
    const nearestY = Math.max(rect.top,  Math.min(rect.bottom, e.clientY));
    const dist = Math.sqrt((e.clientX - nearestX) ** 2 + (e.clientY - nearestY) ** 2);
    const proximity = Math.max(0, 1 - dist / margin);

    if (proximity === 0) {
      apply(null);
      return;
    }

    /* hot-spot percentage position inside the gradient */
    const px = Math.round(Math.max(5, Math.min(95, rawX * 100)));
    const py = Math.round(Math.max(5, Math.min(95, rawY * 100)));

    /* shine intensity — full when over the text, softer when nearby */
    const intensity = proximity;
    /* spot size — tighter when cursor is close, wider when far */
    const spot = 18 + (1 - proximity) * 30;

    /* alpha for the shine colour */
    const shineAlpha = Math.round(intensity * 255).toString(16).padStart(2, "0");

    /* radial highlight centred at cursor position, rest stays base green */
    el.style.backgroundImage = `
      radial-gradient(
        ellipse ${spot}% ${spot * 1.6}% at ${px}% ${py}%,
        ${pal.shine}${shineAlpha} 0%,
        ${pal.base}00           55%,
        transparent             100%
      ),
      linear-gradient(
        135deg,
        ${pal.dim}  0%,
        ${pal.base} 40%,
        ${pal.base} 60%,
        ${pal.dim}  100%
      )
    `;
    el.style.webkitBackgroundClip = "text";
    el.style.backgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
    el.style.color = "transparent";
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => apply(e);
    const onLeave = () => apply(null);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    apply(null);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [apply]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ display: "inline" }}>
      {children}
    </Tag>
  );
}
