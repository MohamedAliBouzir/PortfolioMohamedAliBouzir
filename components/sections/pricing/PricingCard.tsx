"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { TPricingPlan } from "@/types/pricings-types";
import { useUIStore } from "@/store/ui.store";

interface PricingCardProps {
  plan: TPricingPlan;
  index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setCursorVariant("hover")}
      onMouseLeave={() => setCursorVariant("default")}
      className={`relative flex flex-col gap-6 rounded-2xl p-7 border transition-all duration-300 cursor-none overflow-hidden ${
        plan.popular
          ? "border-accent/60 glow-accent"
          : "glass border-border/50 hover:border-accent/30"
      }`}
      style={plan.popular ? { background: "oklch(16% 0.02 310 / 60%)", backdropFilter: "blur(20px)" } : undefined}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 right-6 -translate-y-1/2">
          <span className="aurora-gradient text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Type */}
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {plan.type}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-1">
        <span className="text-muted-foreground text-xl font-mono">{plan.currency}</span>
        <span className={`text-5xl font-bold leading-none tabular-nums ${plan.popular ? "aurora-gradient-text" : ""}`}>
          {plan.price.toLocaleString()}
        </span>
        <span className="text-muted-foreground text-sm mb-1">/ {plan.period}</span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f.name} className="flex items-center gap-3 text-sm">
            {f.available ? (
              <Check className="w-4 h-4 text-aurora-emerald flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
            )}
            <span className={f.available ? "text-foreground" : "text-muted-foreground/50"}>
              {f.name}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`mt-auto w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          plan.popular
            ? "aurora-gradient text-white hover:opacity-90"
            : "glass border border-border/50 hover:border-accent/40 hover:text-accent"
        }`}
      >
        Get started
      </a>
    </motion.div>
  );
}
