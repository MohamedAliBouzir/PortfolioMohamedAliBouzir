"use client";

import { usePortfolioStore } from "@/store/portfolio.store";
import TechCarousel from "./TechCarousel";

const ROWS = [
  { keys: ["frontend", "mobile"] as const, label: "Front-End & Mobile" },
  { keys: ["backend"]            as const, label: "Back-End"            },
  { keys: ["database"]           as const, label: "Databases & DevOps"  },
];

export default function TechnologiesGrid() {
  const technologies = usePortfolioStore((s) => s.technologies);

  return (
    <div className="flex flex-col gap-10 w-full">
      {ROWS.map(({ keys, label }) => {
        const items = keys.flatMap((k) => technologies[k]);
        return (
          <div key={label} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
                {label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>
            <TechCarousel items={items} />
          </div>
        );
      })}
    </div>
  );
}
