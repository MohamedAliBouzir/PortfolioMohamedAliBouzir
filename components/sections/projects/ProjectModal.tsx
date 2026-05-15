"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { StaticImageData } from "next/image";

/* ── types ─────────────────────────────────────────────────────── */
interface Project {
  id: number;
  name: string;
  link: string | null;
  type: string[];
  logo: StaticImageData | string;
  description: string;
  technologies: string[];
}
interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  layoutId: string;
}

/* ── design tokens ──────────────────────────────────────────────── */
const GREEN = "#00FF41";
const DIM   = "#00a329";
const ROOT  = "#ff6b6b";
const PATH  = "#61afef";
const MUTED = "#666";

type Stage = "desktop" | "boot" | "split-general" | "split-details" | "split-technologies";

const typeColors: Record<string, string> = {
  web:     "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30",
  mobile:  "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30",
  cli:     "bg-aurora-emerald/15 text-aurora-emerald border-aurora-emerald/30",
  desktop: "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
};

/* ── typewriter hook ────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 14, active = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setOut(""); setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i++; setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);
  return { out, done };
}

/* ── sequential line printer ────────────────────────────────────── */
type TLine = { text: string; color: string };

function LineStream({ lines, onFinished }: { lines: TLine[]; onFinished?: () => void }) {
  const [done, setDone]     = useState<TLine[]>([]);
  const [cursor, setCursor] = useState(0);
  const [finished, setFinished] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* reset when lines change */
  useEffect(() => { setDone([]); setCursor(0); setFinished(false); }, [lines]);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [done, cursor]);

  const advance = useCallback(() => {
    setDone((prev) => [...prev, lines[cursor]]);
    if (cursor + 1 >= lines.length) { setFinished(true); onFinished?.(); return; }
    setCursor((c) => c + 1);
  }, [cursor, lines, onFinished]);

  const current = !finished && cursor < lines.length ? lines[cursor] : null;

  return (
    <div ref={ref} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {done.map((l, i) => (
        <div key={i} style={{ color: l.color, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, minHeight: "1.6em", whiteSpace: "pre-wrap" }}>
          {l.text}
        </div>
      ))}
      {current && <TypeLine key={cursor} text={current.text} color={current.color} onDone={advance} />}
    </div>
  );
}

function TypeLine({ text, color, onDone }: { text: string; color: string; onDone: () => void }) {
  const { out, done } = useTypewriter(text);
  useEffect(() => { if (done) onDone(); }, [done, onDone]);
  return (
    <div style={{ color, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, minHeight: "1.6em", whiteSpace: "pre-wrap" }}>
      {out}
      {!done && <span className="inline-block w-[7px] h-[13px] ml-0.5 align-middle animate-pulse" style={{ background: GREEN }} />}
    </div>
  );
}

/* ── terminal window chrome ─────────────────────────────────────── */
function TermWindow({
  title, children, onClose, className = "", style = {}
}: {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg ${className}`}
      style={{
        background: "rgba(0,0,0,0.96)",
        border: `1px solid ${GREEN}30`,
        boxShadow: `0 0 40px -8px ${GREEN}33`,
        ...style,
      }}
    >
      {/* Title bar */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-[7px] border-b" style={{ borderColor: `${GREEN}18`, background: "rgba(0,0,0,0.99)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] cursor-none" onClick={onClose} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center font-mono text-[11px]" style={{ color: MUTED }}>
          {title}
        </span>
        <span style={{ color: "#333", fontSize: 10, fontFamily: "monospace" }}>⚙</span>
      </div>
      {children}
    </div>
  );
}

/* ── browser chrome ─────────────────────────────────────────────── */
function BrowserWindow({ project, stage }: { project: Project; stage: Stage }) {
  const screenMap: Record<Stage, string> = {
    desktop: "general", boot: "general",
    "split-general": "general",
    "split-details": "details",
    "split-technologies": "technologies",
  };
  const screen = screenMap[stage];

  const titles: Record<string, string> = {
    general:      project.name,
    details:      `${project.name} — Details`,
    technologies: `${project.name} — Stack`,
  };

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden" style={{ border: "1px solid #333", background: "#111" }}>
      {/* Browser chrome */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-[7px] border-b" style={{ background: "#1a1a1a", borderColor: "#2a2a2a" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center gap-1.5 rounded-md px-3 py-0.5 text-[11px] font-mono" style={{ background: "#111", border: "1px solid #333", color: "#888" }}>
          <span style={{ color: GREEN }}>https://</span>
          <span style={{ color: "#ccc" }}>localhost:3000/</span>
          <span style={{ color: PATH }}>{project.name.toLowerCase().replace(/\s+/g, "-")}</span>
        </div>
        <span style={{ color: "#444", fontSize: 11 }}>↻</span>
      </div>

      {/* Page */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="flex-1 flex flex-col items-center justify-center gap-5 p-6"
          style={{ background: "rgba(4,4,4,0.99)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="rounded-2xl flex items-center justify-center"
            style={{ width: 120, height: 120, background: "rgba(0,255,65,0.04)", border: "1px solid rgba(0,255,65,0.12)" }}
            animate={{ boxShadow: ["0 0 30px -8px rgba(0,255,65,0.15)", "0 0 50px -4px rgba(0,255,65,0.3)", "0 0 30px -8px rgba(0,255,65,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image src={project.logo} alt={project.name} width={80} height={80} className="object-contain" />
          </motion.div>

          <div className="text-center">
            <h2 className="font-bold text-base text-white">{titles[screen]}</h2>
            <div className="flex flex-wrap gap-1 justify-center mt-1.5">
              {project.type.map((t) => (
                <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[t] ?? "bg-muted text-muted-foreground border-border"}`}>{t}</span>
              ))}
            </div>
          </div>

          {screen === "technologies" && (
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[220px]">
              {project.technologies.map((t, i) => (
                <motion.span key={t} className="text-[11px] px-2 py-0.5 rounded font-mono"
                  style={{ background: "rgba(0,255,65,0.07)", color: GREEN, border: "1px solid rgba(0,255,65,0.18)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}>
                  {t}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── line scripts ───────────────────────────────────────────────── */
function g(t: string): TLine { return { text: t, color: GREEN }; }
function d(t: string): TLine { return { text: t, color: DIM }; }
function p(t: string): TLine { return { text: t, color: PATH }; }
function r(t: string): TLine { return { text: t, color: ROOT }; }
function e(): TLine          { return { text: "", color: GREEN }; }

function bootLines(project: Project, ip: string): TLine[] {
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  return [
    g(`ItsNotYourIP@${ip}:~$ xdg-open http://localhost:3000/${slug}`),
    d("Opening browser..."),
    e(),
    { text: "▶  Press Enter to launch", color: GREEN },
  ];
}

function generalLines(project: Project): TLine[] {
  const slug = project.name.toLowerCase().replace(/\s+/g, "_");
  return [
    p(`┌─[ GENERAL ]─────────────────────────────`),
    g(`ItsNotYourIP@portfolio:~$ cat ${slug}/README.md`),
    e(),
    p(`# ${project.name}`),
    e(),
    g(`  type     : ${project.type.join(", ")}`),
    project.link ? g(`  live     : ${project.link}`) : d(`  live     : [private / NDA]`),
    e(),
    d(`└──────────────────────────────────────────`),
  ];
}

function detailsLines(project: Project): TLine[] {
  const slug = project.name.toLowerCase().replace(/\s+/g, "_");
  const wrapped = project.description.match(/.{1,56}(\s|$)/g) ?? [project.description];
  return [
    p(`┌─[ DETAILS ]─────────────────────────────`),
    g(`ItsNotYourIP@portfolio:~$ cat ${slug}/DETAILS.md`),
    e(),
    p(`# Overview`),
    e(),
    ...wrapped.map((l) => d(`  ${l.trim()}`)),
    e(),
    d(`└──────────────────────────────────────────`),
  ];
}

function techLines(project: Project): TLine[] {
  const slug = project.name.toLowerCase().replace(/\s+/g, "_");
  return [
    p(`┌─[ TECHNOLOGIES ]────────────────────────`),
    g(`ItsNotYourIP@portfolio:~$ cat ${slug}/STACK.md`),
    e(),
    p(`# Tech Stack`),
    e(),
    ...project.technologies.map((t, i) => ({
      text: `  ${i === project.technologies.length - 1 ? "└─" : "├─"} ${t}`,
      color: i % 2 === 0 ? GREEN : DIM,
    })),
    e(),
    r(`ItsNotYourIP@portfolio:~$ exit  # All done`),
    d(`└──────────────────────────────────────────`),
  ];
}

/* ── next action button ─────────────────────────────────────────── */
function NextBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      className="mt-3 inline-flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-lg"
      style={{ color: GREEN, background: "rgba(0,255,65,0.07)", border: `1px solid ${GREEN}44`, cursor: "none" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ background: "rgba(0,255,65,0.15)", scale: 1.03, boxShadow: `0 0 18px -4px ${GREEN}55` }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>▶</motion.span>
      {label}
    </motion.button>
  );
}

/* ── tab definitions ────────────────────────────────────────────── */
const TABS: { key: Stage; label: string }[] = [
  { key: "split-general",      label: "general"      },
  { key: "split-details",      label: "details"      },
  { key: "split-technologies", label: "technologies" },
];

/* ── single terminal with multi-tab title bar ───────────────────── */
function TabbedTerminal({
  project, stage, generalDone, detailsDone,
  onGeneralDone, onDetailsDone, onTabSwitch,
}: {
  project: Project;
  stage: Stage;
  generalDone: boolean;
  detailsDone: boolean;
  onGeneralDone: () => void;
  onDetailsDone: () => void;
  onTabSwitch: (s: Stage) => void;
}) {
  /* which tabs are unlocked */
  const unlocked: Stage[] = [
    "split-general",
    ...(generalDone  ? ["split-details"      as Stage] : []),
    ...(detailsDone  ? ["split-technologies"  as Stage] : []),
  ];

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{ background: "rgba(0,0,0,0.97)", border: `1px solid ${GREEN}25`, boxShadow: `0 0 40px -8px ${GREEN}33` }}
    >
      {/* Tab bar — same style as the screenshot */}
      <div className="flex-shrink-0 flex items-stretch border-b"
        style={{ background: "rgba(0,0,0,0.99)", borderColor: `${GREEN}18` }}
      >
        {TABS.map(({ key, label }) => {
          const active   = stage === key;
          const visible  = unlocked.includes(key);
          if (!visible) return null;
          return (
            <motion.button
              key={key}
              onClick={() => onTabSwitch(key)}
              className="flex items-center gap-2 px-4 py-[7px] font-mono text-[11px] flex-shrink-0 relative"
              style={{
                background: active ? "rgba(0,255,65,0.06)" : "transparent",
                color: active ? GREEN : "#555",
                borderRight: `1px solid ${GREEN}15`,
                borderBottom: active ? `2px solid ${GREEN}` : "2px solid transparent",
                cursor: "none",
                transition: "color 0.2s, background 0.2s",
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* dot */}
              <span style={{
                width: 6, height: 6, borderRadius: "50%", display: "inline-block", flexShrink: 0,
                background: active ? GREEN : "#333",
                boxShadow: active ? `0 0 6px ${GREEN}` : "none",
                transition: "all 0.2s",
              }} />
              {/* username@hostname like the screenshot */}
              <span style={{ color: active ? ROOT : "#444" }}>ItsNotYourIP</span>
              <span style={{ color: active ? DIM : "#333" }}>@bonne-annee-enta…</span>
              {/* × per tab — visual */}
              <span className="ml-2" style={{ color: active ? "#555" : "#333", fontSize: 10 }}>×</span>
            </motion.button>
          );
        })}
        {/* trailing chevron */}
        <div className="ml-auto flex items-center px-2" style={{ color: "#333", fontSize: 11 }}>❯</div>
      </div>

      {/* Active tab content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Prompt header */}
        <div className="px-4 pt-3 pb-1 font-mono text-[13px] flex-shrink-0">
          <span style={{ color: ROOT }}>ItsNotYourIP</span>
          <span style={{ color: DIM }}>@bonne-annee-enta</span>
          <span style={{ color: DIM }}>:~$</span>
          <span className="inline-block w-[7px] h-[13px] ml-1 align-middle animate-pulse" style={{ background: GREEN }} />
        </div>

        <div className="flex-1 px-4 pb-4 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {stage === "split-general" && (
              <motion.div key="g" className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <LineStream lines={generalLines(project)} onFinished={onGeneralDone} />
                {generalDone && (
                  <NextBtn label="[Detailed]" onClick={() => onTabSwitch("split-details")} />
                )}
              </motion.div>
            )}
            {stage === "split-details" && (
              <motion.div key="d" className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <LineStream lines={detailsLines(project)} onFinished={onDetailsDone} />
                {detailsDone && (
                  <NextBtn label="[Technologies]" onClick={() => onTabSwitch("split-technologies")} />
                )}
              </motion.div>
            )}
            {stage === "split-technologies" && (
              <motion.div key="t" className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <LineStream lines={techLines(project)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── modal inner ────────────────────────────────────────────────── */
function ModalInner({ project, onClose, layoutId }: { project: Project; onClose: () => void; layoutId: string }) {
  const [stage, setStage] = useState<Stage>("desktop");
  const [ip] = useState("127.0.0.1");
  const [bootDone, setBootDone]     = useState(false);
  const [generalDone, setGeneralDone] = useState(false);
  const [detailsDone, setDetailsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  /* fetch IP */
  useEffect(() => {
    /* skip — use placeholder so we don't block render */
  }, []);

  const showSplit   = stage !== "desktop" && stage !== "boot";
  const termTitle   = stage === "desktop" ? "bash" : stage === "boot" ? `bash — ${project.name}` : `bash — ${stage.replace("split-", "")}`;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: "rgba(0,0,0,0.7)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Close — outside the modal */}
      <motion.button
        className="fixed top-5 right-5 z-[210] w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono"
        style={{ background: "rgba(255,95,87,0.12)", color: "#ff5f57", border: "1px solid rgba(255,95,87,0.35)", cursor: "none" }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        whileHover={{ scale: 1.12, background: "rgba(255,95,87,0.28)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >✕</motion.button>

      <motion.div
        layoutId={layoutId}
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden flex"
        style={{
          width: "min(98vw, 1100px)",
          height: "min(78vh, 700px)",
          borderRadius: 14,
          border: "1px solid rgba(0,255,65,0.18)",
          boxShadow: `0 0 100px -20px ${GREEN}44`,
        }}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* ── Stage: DESKTOP ── */}
        {stage === "desktop" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            style={{ background: "#0a0a0a" }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            {/* Wallpaper logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
              <Image src={project.logo} alt="" width={320} height={320} className="object-contain" />
            </div>
            {/* Terminal icon to double-click */}
            <motion.div
              className="relative flex flex-col items-center gap-3 cursor-none"
              whileHover={{ scale: 1.06 }}
              onDoubleClick={() => setStage("boot")}
              onClick={() => setStage("boot")}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono text-3xl"
                style={{ background: "rgba(0,255,65,0.08)", border: `1px solid ${GREEN}33`, boxShadow: `0 0 30px -8px ${GREEN}44` }}
                animate={{ boxShadow: [`0 0 30px -8px ${GREEN}33`, `0 0 50px -4px ${GREEN}55`, `0 0 30px -8px ${GREEN}33`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span style={{ color: GREEN }}>$_</span>
              </motion.div>
              <span className="font-mono text-xs" style={{ color: GREEN }}>Terminal</span>
              <span className="font-mono text-[10px]" style={{ color: MUTED }}>double-click to open</span>
            </motion.div>
          </motion.div>
        )}

        {/* ── Stage: BOOT terminal ── */}
        {stage === "boot" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
          >
            <TermWindow title={termTitle} className="h-full rounded-none" style={{ border: "none", borderRadius: 0 }}>
              <div className="flex-1 flex flex-col p-5 gap-0 overflow-hidden">
                <LineStream
                  lines={bootLines(project, ip)}
                  onFinished={() => setBootDone(true)}
                />
                {bootDone && (
                  <NextBtn
                    label="↵ Enter — launch browser"
                    onClick={() => setStage("split-general")}
                  />
                )}
              </div>
            </TermWindow>
          </motion.div>
        )}

        {/* ── Stage: SPLIT ── single terminal with tabs + browser ── */}
        {showSplit && (
          <motion.div
            className="absolute inset-0 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {/* Browser — slides in from right */}
            <motion.div
              className="h-full p-2"
              style={{ width: "50%" }}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <BrowserWindow project={project} stage={stage} />
            </motion.div>

            {/* Single terminal with tabs — slides in from left */}
            <motion.div
              className="h-full p-2"
              style={{ width: "50%" }}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TabbedTerminal
                project={project}
                stage={stage}
                generalDone={generalDone}
                detailsDone={detailsDone}
                onGeneralDone={() => setGeneralDone(true)}
                onDetailsDone={() => setDetailsDone(true)}
                onTabSwitch={setStage}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Shared border overlay */}
        <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ border: "1px solid rgba(0,255,65,0.12)" }} />
      </motion.div>
    </motion.div>
  );
}

/* ── export ─────────────────────────────────────────────────────── */
export default function ProjectModal({ project, open, onClose, layoutId }: ProjectModalProps) {
  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence mode="wait">
      {open && project && (
        <ModalInner key={project.id} project={project} onClose={onClose} layoutId={layoutId} />
      )}
    </AnimatePresence>,
    document.body
  );
}
