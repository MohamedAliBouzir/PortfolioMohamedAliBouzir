"use client";

import { usePortfolioStore } from "@/store/portfolio.store";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceTimeline() {
  const experiences = usePortfolioStore((s) => s.experiences);

  return (
    <div className="relative w-full">
      {/* Center timeline line (desktop) */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2" />

      <div className="flex flex-col gap-8 lg:gap-10">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            index={i}
            isLeft={i % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
