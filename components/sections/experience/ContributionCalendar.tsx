"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface ContributionDay {
  date: string;
  count: number;
}

export default function ContributionCalendar() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    rect: DOMRect;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Range of years to show
  const availableYears = [2026, 2025, 2024, 2023, 2022, 2021];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/contributions?year=${year}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.contributions || []);
          
          // Calculate total contributions
          const total = (json.contributions || []).reduce(
            (sum: number, day: any) => sum + day.count,
            0
          );
          setTotalContributions(total);
        }
      } catch (err) {
        console.error("Failed to fetch contribution data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [year]);

  // Generate calendar days grid (Sunday to Saturday weeks)
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  const calendarStart = new Date(startOfYear);
  const startDay = calendarStart.getDay(); // 0 is Sunday
  calendarStart.setDate(calendarStart.getDate() - startDay);

  const calendarEnd = new Date(endOfYear);
  const endDay = calendarEnd.getDay();
  calendarEnd.setDate(calendarEnd.getDate() + (6 - endDay));

  const days: Date[] = [];
  const current = new Date(calendarStart);
  while (current <= calendarEnd) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Generate month label positions
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const firstDay = week[0];
    const currentMonth = firstDay.getMonth();
    if (currentMonth !== lastMonth) {
      monthLabels.push({
        label: firstDay.toLocaleString("en-US", { month: "short" }),
        weekIndex: index,
      });
      lastMonth = currentMonth;
    }
  });

  // Helper to query contribution count for a date string (YYYY-MM-DD)
  const getContribution = (dateObj: Date) => {
    const offset = dateObj.getTimezoneOffset();
    const localDate = new Date(dateObj.getTime() - offset * 60 * 1000);
    const dateStr = localDate.toISOString().split("T")[0];
    const found = data.find((d) => d.date === dateStr);
    return {
      count: found ? found.count : 0,
      dateStr,
    };
  };

  // Helper to determine the color cell class
  const getCellColor = (count: number, isCurrentYear: boolean) => {
    if (!isCurrentYear) return "bg-transparent";
    if (count === 0) return isDark ? "bg-[#161b22]" : "bg-[#ebedf0]";
    
    // Matrix Green palette
    if (count <= 2) return isDark ? "bg-[#0e4429]" : "bg-[#9be9a8]";
    if (count <= 4) return isDark ? "bg-[#006d32]" : "bg-[#40c463]";
    if (count <= 7) return isDark ? "bg-[#26a641]" : "bg-[#30a14e]";
    return isDark ? "bg-[#39d353]" : "bg-[#216e39]"; // 8+ commits
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative glass rounded-2xl p-6 border border-emerald-500/10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] flex flex-col gap-6"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg font-mono text-foreground flex items-center gap-2">
            <span className="text-emerald-500">$_</span> Contributions & Activity
          </h3>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {loading ? "Fetching activity logs..." : `${totalContributions} contributions in the year ${year}`}
          </p>
        </div>

        {/* Year Selectors */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-center">
          {availableYears.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-200 cursor-none ${
                year === y
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  : "bg-muted/10 border-border hover:bg-muted/20 text-muted-foreground hover:text-foreground"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Main Heatmap Container */}
      <div className="w-full overflow-hidden relative">
        <div className="overflow-x-auto pb-4 pt-6 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          <div className="min-w-[670px] w-fit mx-auto relative flex">
            
            {/* Weekday labels on the left */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-muted-foreground w-8 h-[88px] pr-2 pt-[2px] select-none flex-shrink-0">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex flex-1 gap-[3px] relative h-[88px]">
              
              {/* Floating Month Labels absolute placement */}
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="absolute -top-5 text-[9px] font-mono text-muted-foreground select-none"
                  style={{ left: `${m.weekIndex * 13}px` }}
                >
                  {m.label}
                </span>
              ))}

              {/* Columns representing weeks */}
              {loading
                ? Array.from({ length: 53 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, dayIdx) => (
                        <div
                          key={dayIdx}
                          className={`w-[10px] h-[10px] rounded-[1.5px] animate-pulse ${
                            isDark ? "bg-muted/10" : "bg-muted/20"
                          }`}
                        />
                      ))}
                    </div>
                  ))
                : weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIdx) => {
                        const isCurrentYear = day.getFullYear() === year;
                        const { count, dateStr } = getContribution(day);
                        const cellColorClass = getCellColor(count, isCurrentYear);

                        return (
                          <div
                            key={dayIdx}
                            onMouseEnter={(e) => {
                              if (!isCurrentYear) return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({ date: dateStr, count, rect });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[10px] h-[10px] rounded-[1.5px] transition-all duration-150 ${cellColorClass} ${
                              isCurrentYear ? "hover:scale-[1.25] hover:shadow-[0_0_8px_rgba(16,185,129,0.5)]" : ""
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Absolute Hover Tooltip */}
        <AnimatePresence>
          {hoveredDay && containerRef.current && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 pointer-events-none bg-popover/95 border border-border shadow-xl rounded-lg px-2.5 py-1 text-[10px] font-mono text-popover-foreground whitespace-nowrap"
              style={{
                left: `${
                  hoveredDay.rect.left -
                  containerRef.current.getBoundingClientRect().left -
                  40
                }px`,
                top: `${
                  hoveredDay.rect.top -
                  containerRef.current.getBoundingClientRect().top -
                  32
                }px`,
              }}
            >
              <span className="font-semibold text-emerald-400">{hoveredDay.count} commits</span> on{" "}
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/40 pt-4 mt-1 select-none">
        <a
          href="https://github.com/MohamedAliBouzir"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-400 transition-colors duration-200 cursor-none flex items-center gap-1"
        >
          Learn how we aggregate activity <span>↗</span>
        </a>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className={`w-[10px] h-[10px] rounded-[1.5px] ${isDark ? "bg-[#161b22]" : "bg-[#ebedf0]"}`} />
          <div className={`w-[10px] h-[10px] rounded-[1.5px] ${isDark ? "bg-[#0e4429]" : "bg-[#9be9a8]"}`} />
          <div className={`w-[10px] h-[10px] rounded-[1.5px] ${isDark ? "bg-[#006d32]" : "bg-[#40c463]"}`} />
          <div className={`w-[10px] h-[10px] rounded-[1.5px] ${isDark ? "bg-[#26a641]" : "bg-[#30a14e]"}`} />
          <div className={`w-[10px] h-[10px] rounded-[1.5px] ${isDark ? "bg-[#39d353]" : "bg-[#216e39]"}`} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
