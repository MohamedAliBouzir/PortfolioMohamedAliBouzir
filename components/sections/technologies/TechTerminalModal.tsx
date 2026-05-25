"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ITechnologiesInterface } from "@/interfaces/technologies-interface";

interface Props {
  tech: ITechnologiesInterface | null;
  ip: string;
  onClose: () => void;
}

const GREEN = "#00FF41";
const DIM   = "#00a329";
const ROOT  = "#ff6b6b";
const PATH  = "#61afef";
const MUTED = "#4a4a4a";

type Line = { text: string; color: string };

/* build the full script for a tech upfront */
function buildLines(tech: ITechnologiesInterface): Line[] {
  const projects    = tech.projects    ?? [];
  const experiences = tech.experiences ?? [];
  const facts       = tech.facts       ?? [];
  const years       = tech.years       ?? 1;

  const lines: Line[] = [];

  const g  = (t: string) => ({ text: t, color: GREEN });
  const d  = (t: string) => ({ text: t, color: DIM   });
  const p  = (t: string) => ({ text: t, color: PATH  });
  const r  = (t: string) => ({ text: t, color: ROOT  });
  const e  = ()           => ({ text: "",  color: GREEN });

  lines.push(g(`> ${tech.Title} — ${years} year${years > 1 ? "s" : ""} of production usage`));
  lines.push(e());

  if (projects.length) {
    lines.push(p("[PROJECTS]"));
    projects.forEach((pr) => lines.push(d(`  ├─ ${pr}`)));
    lines.push(e());
  }

  if (experiences.length) {
    lines.push(p("[EXPERIENCE]"));
    experiences.forEach((ex) => lines.push(d(`  ├─ ${ex}`)));
    lines.push(e());
  }

  if (facts.length) {
    lines.push(p("[KNOWLEDGE]"));
    facts.forEach((f) => lines.push(g(`  ├─ ${f}`)));
    lines.push(e());
  }

  lines.push(r(`> sudo apt-get install --reinstall ${tech.Title.toLowerCase().replace(/\s+/g, "-")}`));
  lines.push(d("  Already at latest version. Nothing to upgrade."));

  return lines;
}

/* types one line character by character, calls onDone when finished */
function TypeLine({ text, color, speed = 16, onDone }: {
  text: string; color: string; speed?: number; onDone: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (text === "") { onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); onDone(); }
    }, speed);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ color, fontFamily: "monospace", fontSize: 13, lineHeight: "1.75", minHeight: "1.75em" }}>
      {displayed}
      {displayed.length < text.length && text !== "" && (
        <span className="inline-block w-[7px] h-[13px] ml-0.5 align-middle animate-pulse" style={{ background: GREEN }} />
      )}
    </div>
  );
}

function ModalInner({ tech, ip, onClose }: { tech: ITechnologiesInterface; ip: string; onClose: () => void }) {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const allLines   = useRef(buildLines(tech));
  const [done, setDone]   = useState<Line[]>([]);   // fully typed lines
  const [cursor, setCursor] = useState(0);           // which line is typing

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Escape to close */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  /* auto-scroll as lines appear */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [done, cursor]);

  const handleLineDone = () => {
    const next = cursor + 1;
    setDone((prev) => [...prev, allLines.current[cursor]]);
    setCursor(next);
  };

  const currentLine = cursor < allLines.current.length ? allLines.current[cursor] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(0,0,0,0.72)" }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl overflow-hidden"
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.92, opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: "rgba(0,0,0,0.95)",
          border: `1px solid ${GREEN}33`,
          boxShadow: `0 0 60px -12px ${GREEN}55`,
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: `${GREEN}22` }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" onClick={onClose} style={{ cursor: "none" }} />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-xs font-mono" style={{ color: MUTED }}>
            terminal — ssh ThisIsNotYourIP@{ip}
          </span>
          <Image
            src={tech.Icon} alt={tech.Title}
            width={16} height={16}
            style={{ width: 16, height: 16, filter: "brightness(0) saturate(100%) invert(52%) sepia(98%) saturate(420%) hue-rotate(90deg) brightness(1.1)", opacity: 0.7 }}
          />
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="p-5 flex flex-col max-h-[68vh] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Static prompt */}
          <div className="flex gap-1 font-mono text-[13px] mb-1">
            <span style={{ color: ROOT }}>ThisIsNotYourIP</span>
            <span style={{ color: DIM }}>@</span>
            <span style={{ color: PATH }}>{ip}</span>
            <span style={{ color: DIM }}>:~#</span>
            <span style={{ color: GREEN }}>&nbsp;info {tech.Title.toLowerCase().replace(/\s+/g, "-")}</span>
          </div>

          {/* Fully typed lines */}
          {done.map((l, i) => (
            <div key={i} style={{ color: l.color, fontFamily: "monospace", fontSize: 13, lineHeight: "1.75", minHeight: "1.75em" }}>
              {l.text}
            </div>
          ))}

          {/* Currently typing line */}
          {currentLine && (
            <TypeLine
              key={cursor}
              text={currentLine.text}
              color={currentLine.color}
              onDone={handleLineDone}
            />
          )}

          {/* Final blinking cursor after all lines done */}
          {!currentLine && (
            <div className="flex gap-1 font-mono text-[13px] mt-2">
              <span style={{ color: ROOT }}>ThisIsNotYourIP</span>
              <span style={{ color: DIM }}>@</span>
              <span style={{ color: PATH }}>{ip}</span>
              <span style={{ color: DIM }}>:~#</span>
              <span className="inline-block w-[7px] h-[13px] ml-1 align-middle animate-pulse" style={{ background: GREEN }} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechTerminalModal({ tech, ip, onClose }: Props) {
  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence mode="wait">
      {tech && <ModalInner key={tech.Title} tech={tech} ip={ip} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
