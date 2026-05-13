"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/portfolio.store";
import PricingCard from "./PricingCard";

export default function PricingGrid() {
  const pricing = usePortfolioStore((s) => s.pricing);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-center gap-5 lg:gap-0">
      {pricing.map((plan, i) => {
        const isHovered = hoveredId === plan.id;
        const zIndex = isHovered ? 20 : plan.popular ? 10 : 0;

        return (
          <div
            key={plan.id}
            className={`w-full lg:w-1/3 flex transition-[z-index] ${plan.popular ? "lg:-mx-2" : ""}`}
            style={{ zIndex }}
            onMouseEnter={() => setHoveredId(plan.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <PricingCard plan={plan} index={i} />
          </div>
        );
      })}
    </div>
  );
}
