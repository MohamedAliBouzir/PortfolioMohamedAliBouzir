"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/ui.store";
import TechTerminalModal from "./TechTerminalModal";

interface Props { items: ITechnologiesInterface[]; }

const GREEN = "#00FF41";
const ROOT  = "#ff6b6b";
const PATH  = "#61afef";
const DIM   = "#00a329";

const DARK_LOGOS = new Set([
  "Express.js", "Next.js", "Socket.io",
  "GitHub", "GitLab", "Postman", "Confluence", "Slack",
]);

/* inject keyframes once */
const KEYFRAME_ID = "carousel-scroll-kf";
function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAME_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAME_ID;
  style.textContent = `
    @keyframes carousel-scroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-33.333%); }
    }
  `;
  document.head.appendChild(style);
}

export default function TechCarousel({ items }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  const [paused,  setPaused]   = useState(false);
  const [ready,   setReady]    = useState(false);   // false until keyframes injected
  const [hovered, setHovered]  = useState<number | null>(null);
  const [selected, setSelected] = useState<ITechnologiesInterface | null>(null);
  const [ip, setIp]             = useState("192.168.1.1");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    ensureKeyframes();
    /* one rAF delay ensures the <style> is parsed before animation starts */
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIp(d.ip ?? "127.0.0.1"))
      .catch(() => setIp("127.0.0.1"));
  }, []);

  const track = [...items, ...items, ...items];

  const onEnter = (i: number, e: React.MouseEvent) => {
    setHovered(i);
    setTooltipPos({ x: e.clientX, y: e.clientY });
    setCursorVariant("hover");
    setPaused(true);
  };
  const onMove  = (e: React.MouseEvent) => setTooltipPos({ x: e.clientX, y: e.clientY });
  const onLeave = () => {
    setHovered(null);
    setCursorVariant("default");
    setPaused(false);
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%)" }}
      >
        {/* Pure CSS animation — individual longhand props avoid React shorthand-conflict warning */}
        <div
          style={{
            display: "flex",
            gap: 16,
            width: "max-content",
            animationName: ready ? "carousel-scroll" : "none",
            animationDuration: "40s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {track.map((tech, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={`${tech.Title}-${i}`}
                className="relative flex-shrink-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
                style={{
                  width: 110, height: 110,
                  background: isDark
                    ? isHov ? "rgba(0,255,65,0.06)" : "#18181b"
                    : isHov ? "#ffffff"              : "#ffffff",
                  border: `1px solid ${isDark
                    ? (isHov ? GREEN           : "#27272a")
                    : (isHov ? "#059669"       : "#e2e8f0")}`,
                  boxShadow: isHov
                    ? `0 0 24px -4px ${isDark ? GREEN : "#059669"}44`
                    : isDark ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => onEnter(i, e)}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                onClick={() => setSelected(tech)}
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={tech.Icon}
                    alt={tech.Title}
                    fill
                    className="object-contain"
                    style={{
                      /* dark mode: dim invisible logos to green, others grayscale at rest → color on hover */
                      ...(isDark && DARK_LOGOS.has(tech.Title)
                        ? { filter: "brightness(0) saturate(100%) invert(52%) sepia(98%) saturate(420%) hue-rotate(90deg) brightness(1.1)" }
                        : isDark && !isHov
                        ? { filter: "grayscale(60%) opacity(0.6)" }
                        : isDark && isHov
                        ? { filter: "none", transition: "filter 0.2s" }
                        : undefined),
                      transition: "filter 0.25s",
                    }}
                  />
                </div>

                <span
                  className="text-[11px] font-mono text-center leading-tight px-2 w-full truncate"
                  style={{
                    color: isHov ? (isDark ? GREEN : "#059669") : (isDark ? "#71717a" : "#64748b"),
                    transition: "color 0.2s",
                  }}
                >
                  {tech.Title}
                </span>

                {isHov && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ boxShadow: `inset 0 0 0 1px ${isDark ? GREEN : "#059669"}` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hacker console tooltip */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="fixed z-[250] pointer-events-none"
            style={{ left: tooltipPos.x + 18, top: tooltipPos.y - 10 }}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-lg px-3 py-2 font-mono text-xs"
              style={{
                background: "rgba(0,0,0,0.92)",
                border: `1px solid ${GREEN}44`,
                boxShadow: `0 0 20px -4px ${GREEN}44`,
                backdropFilter: "blur(8px)",
                minWidth: 220,
              }}
            >
              <div className="flex items-center gap-1">
                <span style={{ color: ROOT }}>ThisIsNotYourIP</span>
                <span style={{ color: "#555" }}>@</span>
                <span style={{ color: PATH }}>{ip}</span>
                <span style={{ color: "#555" }}>:~#</span>
              </div>
              <div style={{ color: DIM }} className="mt-0.5">
                sudo apt <span style={{ color: GREEN }}>click</span> me
              </div>
              <div className="mt-1 flex items-center gap-1.5" style={{ color: "#555", fontSize: 10 }}>
                <span style={{ color: GREEN }}>▶</span>
                {track[hovered]?.years}yr · {track[hovered]?.projects?.length ?? 0} projects
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TechTerminalModal tech={selected} ip={ip} onClose={() => setSelected(null)} />
    </>
  );
}
