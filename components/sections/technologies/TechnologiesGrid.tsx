"use client";

import { usePortfolioStore } from "@/store/portfolio.store";
import TechCategory from "./TechCategory";

const categories = [
  { key: "frontend" as const, label: "Front-End" },
  { key: "backend" as const, label: "Back-End" },
  { key: "mobile" as const, label: "Mobile" },
  { key: "database" as const, label: "Databases & DevOps" },
];

export default function TechnologiesGrid() {
  const technologies = usePortfolioStore((s) => s.technologies);

  return (
    <div className="flex flex-col gap-10 w-full">
      {categories.map(({ key, label }, i) => (
        <TechCategory
          key={key}
          label={label}
          items={technologies[key]}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}
