"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "@/hooks/useInView";
import { usePortfolioStore } from "@/store/portfolio.store";

export default function AboutStats() {
  const stats = usePortfolioStore((s) => s.stats);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass rounded-2xl p-6 flex flex-col items-center gap-2 border border-border/50 hover:border-accent/30 transition-colors duration-300 group"
        >
          <span className="text-4xl sm:text-5xl font-bold aurora-gradient-text tabular-nums">
            {inView ? (
              <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.value >= 100 ? "+" : "+"} />
            ) : (
              "0"
            )}
          </span>
          <span className="text-muted-foreground text-xs sm:text-sm text-center font-mono uppercase tracking-wider">
            {stat.event}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
