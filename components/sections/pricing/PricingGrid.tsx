"use client";

import { usePortfolioStore } from "@/store/portfolio.store";
import PricingCard from "./PricingCard";

export default function PricingGrid() {
  const pricing = usePortfolioStore((s) => s.pricing);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">
      {pricing.map((plan, i) => (
        <PricingCard key={plan.id} plan={plan} index={i} />
      ))}
    </div>
  );
}
