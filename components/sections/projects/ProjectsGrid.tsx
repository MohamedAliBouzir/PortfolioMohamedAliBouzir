"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/store/portfolio.store";
import ProjectCard from "./ProjectCard";

const ALL = "all";
const filters = [ALL, "web", "mobile", "cli", "desktop"] as const;

export default function ProjectsGrid() {
  const projects = usePortfolioStore((s) => s.projects);
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => p.type.includes(active)),
    [projects, active]
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setActive(f)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              active === f
                ? "text-accent-foreground"
                : "glass border border-border/50 text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {active === f && (
              <motion.div
                layoutId="projects-filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 capitalize">{f}</span>
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
