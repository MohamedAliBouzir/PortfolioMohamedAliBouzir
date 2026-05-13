"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Button whose gradient angle + glare hotspot chase the cursor.
 * CSS custom properties are updated via direct DOM mutation — zero re-renders.
 */

interface SharedProps {
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

type AnchorProps = SharedProps & { as: "a"; href?: string; target?: string; rel?: string };
type ButtonProps = SharedProps & { as?: "button"; type?: "submit" | "reset" | "button"; disabled?: boolean };
type GradientButtonProps = AnchorProps | ButtonProps;

export default function GradientButton(props: GradientButtonProps) {
  const { className = "", children, onMouseEnter, onMouseLeave } = props;
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const deg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI) + 90;
    el.style.setProperty("--btn-angle", `${deg}deg`);
    el.style.setProperty("--btn-glare-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--btn-glare-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--btn-angle", "135deg");
    el.style.setProperty("--btn-glare-x", "50%");
    el.style.setProperty("--btn-glare-y", "50%");
    onMouseLeave?.(e as never);
  }, [onMouseLeave]);

  const shared = {
    className: `gradient-btn ${className}`,
    onMouseMove: handleMouseMove as never,
    onMouseLeave: handleMouseLeave as never,
    onMouseEnter: onMouseEnter as never,
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
  };

  if (props.as === "a") {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  const { type, disabled } = props as ButtonProps;
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      disabled={disabled}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
