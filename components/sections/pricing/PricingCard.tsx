"use client";

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, Zap } from "lucide-react";
import type { TPricingPlan } from "@/types/pricings-types";
import { useUIStore } from "@/store/ui.store";
import { useTheme } from "next-themes";
import GradientButton from "@/components/ui/GradientButton";
import ShineText from "@/components/common/ShineText";

interface PricingCardProps {
  plan: TPricingPlan;
  index: number;
}

const SHADOW_REST_DARK  = "0 0 48px -8px rgba(0,255,65,0.45)";
const SHADOW_HOVER_DARK = "0 0 64px -4px rgba(0,255,65,0.75)";
const SHADOW_REST_LIGHT  = "0 0 48px -8px rgba(5,150,105,0.35)";
const SHADOW_HOVER_LIGHT = "0 0 64px -4px rgba(5,150,105,0.55)";
const SHADOW_NONE        = "0 0 0px 0px rgba(0,255,65,0)";

export default function PricingCard({ plan, index }: PricingCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [hovered, setHovered] = useState(false);

  const shadowRest  = isDark ? SHADOW_REST_DARK  : SHADOW_REST_LIGHT;
  const shadowHover = isDark ? SHADOW_HOVER_DARK : SHADOW_HOVER_LIGHT;

  const shadow = hovered
    ? shadowHover
    : plan.popular
    ? shadowRest
    : SHADOW_NONE;

  /* side card background — opaque on hover so the card behind never bleeds through */
  const sideCardStyle = !plan.popular ? {
    background: hovered
      ? isDark
        ? "rgba(10,10,10,0.97)"
        : "rgba(238,242,235,0.97)"
      : undefined,
    backdropFilter: "blur(12px) saturate(1.4)",
    WebkitBackdropFilter: "blur(12px) saturate(1.4)",
    transition: "background 0.4s ease",
  } : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      animate={{ boxShadow: shadow }}
      whileHover={{ y: plan.popular ? -6 : -4 }}
      onMouseEnter={() => { setHovered(true);  setCursorVariant("hover"); }}
      onMouseLeave={() => { setHovered(false); setCursorVariant("default"); }}
      transition={{
        opacity:   { duration: 0.65, delay: index * 0.13, ease: [0.25, 0.46, 0.45, 0.94] },
        y:         { duration: 0.3,  ease: "easeOut" },
        boxShadow: { duration: 0.5,  ease: "easeInOut" },
      }}
      className={`relative flex flex-col gap-7 rounded-2xl p-8 border transition-colors duration-300 cursor-none overflow-hidden w-full h-full ${
        plan.popular
          ? "border-accent/50 scale-[1.03] lg:scale-[1.06]"
          : `glass border-border/50 ${hovered ? "border-accent/40" : ""}`
      }`}
      style={
        plan.popular
          ? isDark
            ? {
                background: "linear-gradient(145deg, rgba(0,255,65,0.06) 0%, rgba(0,0,0,0.80) 50%, rgba(0,194,49,0.05) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }
            : {
                background: "linear-gradient(145deg, rgba(5,150,105,0.18) 0%, rgba(220,240,230,0.97) 35%, rgba(238,242,235,0.97) 65%, rgba(4,120,87,0.15) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }
          : sideCardStyle
      }
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-b-xl">
            <Zap className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      {/* Subtle corner glow for popular */}
      {plan.popular && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-accent/10 blur-[60px]" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent/8 blur-[60px]" />
        </div>
      )}

      {/* Plan type */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          {plan.type}
        </span>
        {plan.popular && (
          <span className="text-[10px] font-mono text-accent/70 border border-accent/20 px-2 py-0.5 rounded-full">
            Best Value
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-end gap-1.5">
        <span className="text-muted-foreground text-lg font-mono self-start mt-2">
          {plan.currency}
        </span>
        <span className={`text-6xl font-bold leading-none tabular-nums tracking-tight ${plan.popular ? "" : "text-foreground"}`}>
          {plan.popular
            ? <ShineText>{plan.price.toLocaleString()}</ShineText>
            : plan.price.toLocaleString()
          }
        </span>
        <span className="text-muted-foreground text-sm mb-1.5 font-mono">
          / {plan.period}
        </span>
      </div>

      {/* Divider */}
      <div className={`h-px w-full ${plan.popular ? "bg-accent/20" : "bg-border/50"}`} />

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {plan.description}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f.name} className="flex items-center gap-3 text-sm">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                f.available
                  ? "bg-accent/15 text-accent"
                  : "bg-muted/40 text-muted-foreground/30"
              }`}
            >
              {f.available
                ? <Check className="w-3 h-3" />
                : <X className="w-3 h-3" />
              }
            </span>
            <span className={f.available ? "text-foreground" : "text-muted-foreground/40 line-through decoration-muted-foreground/20"}>
              {f.name}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-2">
        {plan.popular ? (
          <GradientButton
            as="a"
            href="#contact"
            className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Get started →
          </GradientButton>
        ) : (
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm glass border border-border/50 hover:border-accent/40 hover:text-accent transition-all duration-300"
          >
            Get started
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
