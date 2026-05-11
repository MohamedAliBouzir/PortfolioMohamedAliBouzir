"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const AvatarCanvas = lazy(() => import("./AvatarCanvas"));

const skills = [
  "React / Next.js", "TypeScript", "Node.js / Express",
  "System Design", "Performance Optimization", "Team Leadership",
];

function AvatarFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full aurora-gradient opacity-40 animate-pulse" />
    </div>
  );
}

export default function AboutContent() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
    >
      {/* 3D Avatar side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex justify-center"
      >
        <div className="relative w-72 h-80 sm:w-80 sm:h-96">
          {/* Aurora glow ring behind avatar */}
          <div className="absolute inset-[-20%] rounded-full aurora-gradient opacity-15 blur-3xl pointer-events-none" />

          {/* 3D canvas */}
          <div className="relative w-full h-full">
            <Suspense fallback={<AvatarFallback />}>
              <AvatarCanvas />
            </Suspense>
          </div>
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-6"
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">About me</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
            Turning ideas into{" "}
            <span className="aurora-gradient-text">real-world</span> products
          </h2>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Full-Stack JS Engineer with 3+ years building production-grade web applications.
          I specialize in React/Next.js frontends and Node.js backends, with a strong focus
          on performance, code quality, and seamless user experiences.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          From ERP platforms serving European enterprises to mobile apps and data migration
          tools, I bring the same obsession with quality to every project.
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1.5 rounded-full glass border border-border/50 font-mono text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <motion.a
          href="/curriculum-vitae"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all duration-200"
          whileHover={{ x: 4 }}
        >
          View full CV
          <span className="text-lg">→</span>
        </motion.a>
      </motion.div>
    </div>
  );
}
