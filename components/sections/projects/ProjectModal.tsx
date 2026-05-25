"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import type { StaticImageData } from "next/image";

/* ── types ─────────────────────────────────────────────────────── */
interface Project {
  id: number; name: string; link: string | null;
  type: string[]; logo: StaticImageData | string | null;
  description: string; technologies: string[];
  restricted?: boolean;
}
interface ProjectModalProps {
  project: Project | null; open: boolean;
  onClose: () => void; layoutId: string;
}

/* ── tokens ─────────────────────────────────────────────────────── */
const GREEN = "#00FF41";
const DIM   = "#00a329";
const ROOT  = "#ff6b6b";
const PATH  = "#61afef";
const MUTED = "#666";

/* restricted palette */
const RED      = "#ff3333";
const RED_DIM  = "#992222";
const RED_MID  = "#cc2222";

type TabKey = "general" | "details" | "technologies";
type Stage  = "desktop" | "boot" | TabKey;

const typeColors: Record<string, string> = {
  web:     "bg-aurora-teal/15 text-aurora-teal border-aurora-teal/30",
  mobile:  "bg-aurora-violet/15 text-aurora-violet border-aurora-violet/30",
  cli:     "bg-aurora-emerald/15 text-aurora-emerald border-aurora-emerald/30",
  desktop: "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
  pwa:     "bg-aurora-pink/15 text-aurora-pink border-aurora-pink/30",
};

/* ── line type ───────────────────────────────────────────────────── */
type TLine = { text: string; color: string };

function makeTokens(restricted: boolean) {
  const G  = restricted ? RED     : GREEN;
  const D  = restricted ? RED_DIM : DIM;
  const P  = restricted ? RED_MID : PATH;
  const R  = restricted ? RED     : ROOT;
  const g = (t: string): TLine => ({ text: t, color: G });
  const d = (t: string): TLine => ({ text: t, color: D });
  const p = (t: string): TLine => ({ text: t, color: P });
  const r = (t: string): TLine => ({ text: t, color: R });
  const e = ():          TLine => ({ text: "",  color: G });
  return { g, d, p, r, e, G, D, P, R };
}

/* ── scripts ────────────────────────────────────────────────────── */
function bootScript(project: Project, ip: string): TLine[] {
  const { g, d, e } = makeTokens(!!project.restricted);
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  return project.restricted
    ? [
        { text: `ROOT@${ip}:~# ACCESS LEVEL: TOP SECRET`, color: RED },
        e(),
        { text: "  ██████╗ ███████╗███████╗████████╗██████╗ ", color: RED_DIM },
        { text: "  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗", color: RED_DIM },
        { text: "  ██████╔╝█████╗  ███████╗   ██║   ██████╔╝", color: RED_MID },
        { text: "  ██╔══██╗██╔══╝  ╚════██║   ██║   ██╔══██╗", color: RED_MID },
        { text: "  ██║  ██║███████╗███████║   ██║   ██║  ██║", color: RED },
        { text: "  ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝", color: RED },
        e(),
        { text: "  [!] CLASSIFIED — NATIONAL CONFIDENTIALITY DIRECTIVE", color: RED },
        { text: "  [!] Unauthorized access is a criminal offense.", color: RED_DIM },
        e(),
        { text: `ROOT@${ip}:~# sudo open --restricted ${slug}/`, color: RED_MID },
        e(),
        { text: "  WARNING: Content subject to national security protocols.", color: RED_DIM },
      ]
    : [
        g(`ThisIsNotYourIP@${ip}:~$ xdg-open http://localhost:3000/${slug}`),
        e(),
        d("Opening browser..."),
      ];
}
function generalScript(project: Project, ip: string): TLine[] {
  const { g, d, p, e } = makeTokens(!!project.restricted);
  const slug = project.name.toLowerCase().replace(/\s+/g, "_");
  const cmd  = project.restricted ? "ROOT" : "ThisIsNotYourIP";
  return [
    p("┌─[ GENERAL ]─────────────────────────────"),
    g(`${cmd}@${ip}:~$ cat ${slug}/README.md`),
    e(),
    p(`# ${project.name}`),
    e(),
    g(`  type     : ${project.type.join(", ")}`),
    project.restricted
      ? { text: "  clearance : CLASSIFIED / NDA", color: RED }
      : project.link ? g(`  live     : ${project.link}`) : d("  live     : [private / NDA]"),
    e(),
    d("└──────────────────────────────────────────"),
  ];
}
function detailsScript(project: Project, ip: string): TLine[] {
  const { g, d, p, e } = makeTokens(!!project.restricted);
  const slug    = project.name.toLowerCase().replace(/\s+/g, "_");
  const cmd     = project.restricted ? "ROOT" : "ThisIsNotYourIP";
  const wrapped = project.description.match(/.{1,56}(\s|$)/g) ?? [project.description];
  return [
    p("┌─[ DETAILS ]─────────────────────────────"),
    g(`${cmd}@${ip}:~$ cat ${slug}/DETAILS.md`),
    e(), p("# Overview"), e(),
    ...(project.restricted
      ? [
          { text: "  [REDACTED — Engineering overview only]", color: RED_DIM },
          e(),
          ...wrapped.map((l): TLine => ({ text: `  ${l.trim()}`, color: RED_DIM })),
        ]
      : wrapped.map((l) => d(`  ${l.trim()}`))),
    e(), d("└──────────────────────────────────────────"),
  ];
}
function techScript(project: Project, ip: string): TLine[] {
  const { g, d, p, r, e } = makeTokens(!!project.restricted);
  const slug = project.name.toLowerCase().replace(/\s+/g, "_");
  const cmd  = project.restricted ? "ROOT" : "ThisIsNotYourIP";
  return [
    p("┌─[ TECHNOLOGIES ]────────────────────────"),
    g(`${cmd}@${ip}:~$ cat ${slug}/STACK.md`),
    e(), p("# Tech Stack"), e(),
    ...project.technologies.map((t, i) => ({
      text: `  ${i === project.technologies.length - 1 ? "└─" : "├─"} ${t}`,
      color: project.restricted ? (i % 2 === 0 ? RED : RED_DIM) : (i % 2 === 0 ? GREEN : DIM),
    })),
    e(), r(`${cmd}@${ip}:~$ exit  # All done`),
    d("└──────────────────────────────────────────"),
  ];
}

/* ── TypeLine — types once, then stays ──────────────────────────── */
function TypeLine({ text, color, speed = 13, onDone }: {
  text: string; color: string; speed?: number; onDone: () => void;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut(""); setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i++; setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (done) onDone(); }, [done, onDone]);
  return (
    <div style={{ color, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", minHeight: "1.6em" }}>
      {out}
      {!done && <span className="inline-block w-[7px] h-[13px] ml-0.5 align-middle animate-pulse" style={{ background: GREEN }} />}
    </div>
  );
}

/* ── StaticLine ──────────────────────────────────────────────────── */
function StaticLine({ line }: { line: TLine }) {
  return (
    <div style={{ color: line.color, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", minHeight: "1.6em" }}>
      {line.text}
    </div>
  );
}

/* ── LineStream — remembers typed state, never retypes ──────────── */
function LineStream({
  lines, tabKey, cache, onFinished,
}: {
  lines: TLine[];
  tabKey: TabKey | "boot";
  cache: React.RefObject<Map<string, TLine[]>>;
  onFinished?: () => void;
}) {
  const scrollRef      = useRef<HTMLDivElement>(null);
  /* keep latest onFinished in a ref so advance() never goes stale */
  const onFinishedRef  = useRef(onFinished);
  useEffect(() => { onFinishedRef.current = onFinished; }, [onFinished]);

  const wasFinished = cache.current.has(tabKey);
  const [cursor, setCursor] = useState(wasFinished ? lines.length : 0);
  const [done,   setDone]   = useState(wasFinished);

  const typedRef     = useRef<TLine[]>(wasFinished ? cache.current.get(tabKey)! : []);
  const [, rerender] = useState(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  });

  /* advance never changes identity — reads latest state via refs */
  const advance = useCallback(() => {
    const cur     = typedRef.current.length;
    const updated = [...typedRef.current, lines[cur]];
    typedRef.current = updated;
    rerender((n) => n + 1);
    if (cur + 1 >= lines.length) {
      setDone(true);
      cache.current.set(tabKey, updated);
      onFinishedRef.current?.();        // always calls the latest callback
    } else {
      setCursor(cur + 1);
    }
  // stable — lines/tabKey/cache don't change within a tab's lifetime
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, tabKey]);

  const currentLine = !done && cursor < lines.length ? lines[cursor] : null;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {typedRef.current.map((l, i) => <StaticLine key={i} line={l} />)}
      {currentLine && (
        <TypeLine
          key={`${tabKey}-${cursor}`}
          text={currentLine.text}
          color={currentLine.color}
          onDone={advance}
        />
      )}
    </div>
  );
}

/* ── NextBtn ─────────────────────────────────────────────────────── */
function NextBtn({ label, onClick, restricted }: { label: string; onClick: () => void; restricted?: boolean }) {
  const c = restricted ? RED : GREEN;
  return (
    <motion.button
      className="mt-3 inline-flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-lg flex-shrink-0"
      style={{ color: c, background: `${c}12`, border: `1px solid ${c}44`, cursor: "none" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ background: `${c}25`, scale: 1.03, boxShadow: `0 0 18px -4px ${c}55` }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>▶</motion.span>
      {label}
    </motion.button>
  );
}

/* ── Browser with nav dropdown ───────────────────────────────────── */
function BrowserWindow({
  project, activeTab, unlockedTabs, onNavSelect,
}: {
  project: Project;
  activeTab: TabKey;
  unlockedTabs: TabKey[];
  onNavSelect: (t: TabKey) => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isRestricted = !!project.restricted;
  const [dropOpen, setDropOpen] = useState(false);
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");

  const paths: { key: TabKey; path: string }[] = [
    { key: "general",      path: `/general` },
    { key: "details",      path: `/details` },
    { key: "technologies", path: `/tech`    },
  ];

  const titles: Record<TabKey, string> = {
    general:      project.name,
    details:      `${project.name} — Details`,
    technologies: `${project.name} — Stack`,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dropOpen) return;
    const h = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, [dropOpen]);

  /* colors — red override for restricted */
  const chromeBg   = isRestricted ? "#120000"  : (isDark ? "#1a1a1a" : "#f0f0f0");
  const chromeBd   = isRestricted ? "#3a0000"  : (isDark ? "#2a2a2a" : "#d0d0d0");
  const urlBg      = isRestricted ? "#0a0000"  : (isDark ? "#111"    : "#ffffff");
  const urlBd      = isRestricted ? "#550000"  : (isDark ? "#333"    : "#c8c8c8");
  const urlText    = isRestricted ? "#883333"  : (isDark ? "#888"    : "#555");
  const pageBg     = isRestricted ? "#0a0000"  : (isDark ? "#080808" : "#f8f8f8");
  const titleColor = isRestricted ? RED        : (isDark ? "#ffffff" : "#111111");
  const dropBg     = isRestricted ? "#0f0000"  : (isDark ? "#111"    : "#ffffff");
  const dropBd     = isRestricted ? "#440000"  : (isDark ? "#444"    : "#ccc");
  const dropItem   = isRestricted ? "#1a0000"  : (isDark ? "#1a1a1a" : "#f0f0f0");
  const accent     = isRestricted ? RED        : (isDark ? GREEN     : "#059669");
  const pathColor  = isRestricted ? RED_MID    : PATH;

  return (
    <div ref={containerRef} className="flex flex-col h-full rounded-lg"
      style={{ border: `1px solid ${chromeBd}`, background: chromeBg, overflow: "visible" }}>

      {/* Restricted: pulsing red scanlines */}
      {isRestricted && (
        <div className="absolute inset-0 pointer-events-none rounded-lg z-0"
          style={{ background: "repeating-linear-gradient(0deg,rgba(255,0,0,0.03) 0px,rgba(255,0,0,0.03) 1px,transparent 1px,transparent 3px)" }}
        />
      )}

      {/* Chrome bar */}
      <div className="relative z-10 flex-shrink-0 flex items-center gap-2 px-3 py-[7px] border-b"
        style={{ background: chromeBg, borderColor: chromeBd }}>
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: isRestricted ? "#ff3333" : "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: isRestricted ? "#550000" : "#febc2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: isRestricted ? "#220000" : "#28c840" }} />
        </div>

        <div className="relative flex-1">
          <button
            className="w-full flex items-center gap-1 rounded-md px-3 py-[3px] text-[11px] font-mono text-left"
            style={{ background: urlBg, border: `1px solid ${urlBd}`, cursor: "none" }}
            onClick={() => setDropOpen((v) => !v)}
          >
            {isRestricted
              ? <span style={{ color: RED }}>⚠ CLASSIFIED://</span>
              : <span style={{ color: accent }}>http://</span>
            }
            <span style={{ color: urlText }}>{isRestricted ? "restricted.gov/" : "localhost:3000/"}</span>
            <span style={{ color: pathColor }}>{slug}</span>
            <span style={{ color: pathColor }}>{paths.find((p) => p.key === activeTab)?.path}</span>
            <span className="ml-auto" style={{ color: urlText }}>▾</span>
          </button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 rounded-lg overflow-hidden mt-1"
                style={{ zIndex: 9999, background: dropBg, border: `1px solid ${dropBd}`, boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {paths.map(({ key, path }) => {
                  const unlocked = unlockedTabs.includes(key);
                  const active   = key === activeTab;
                  return (
                    <button
                      key={key}
                      disabled={!unlocked}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-mono text-left"
                      style={{
                        background: active ? `${accent}12` : "transparent",
                        color: !unlocked ? "#330000" : active ? accent : urlText,
                        borderBottom: `1px solid ${dropItem}`,
                        cursor: unlocked ? "none" : "not-allowed",
                        transition: "background 0.15s",
                      }}
                      onClick={() => { if (unlocked) { onNavSelect(key); setDropOpen(false); } }}
                    >
                      <span style={{ color: unlocked ? (active ? accent : RED_DIM) : "#220000" }}>
                        {unlocked ? "●" : "○"}
                      </span>
                      <span style={{ color: urlText }}>{isRestricted ? "restricted.gov/" : `localhost:3000/${slug}`}</span>
                      <span style={{ color: !unlocked ? "#220000" : active ? accent : pathColor }}>{path}</span>
                      {!unlocked && <span className="ml-auto text-[10px]" style={{ color: "#440000" }}>locked</span>}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span style={{ color: urlText, fontSize: 11, flexShrink: 0 }}>↻</span>
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 p-6 overflow-hidden"
          style={{ background: pageBg }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onClick={() => setDropOpen(false)}
        >
          {/* Logo box */}
          <motion.div
            className="rounded-2xl flex items-center justify-center flex-shrink-0 relative"
            style={{
              width: 110, height: 110,
              background: `${accent}08`,
              border: `1px solid ${accent}22`,
            }}
            animate={{ boxShadow: [
              `0 0 30px -8px ${accent}30`,
              `0 0 50px -4px ${accent}55`,
              `0 0 30px -8px ${accent}30`,
            ]}}
            transition={{ duration: isRestricted ? 1.5 : 3, repeat: Infinity }}
          >
            {isRestricted ? (
              <motion.span
                className="text-4xl"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⛔
              </motion.span>
            ) : project.logo ? (
              <Image src={project.logo} alt={project.name} fill sizes="110px" className="object-contain p-4" />
            ) : (
              <span className="text-3xl font-bold font-mono" style={{ color: accent }}>{project.name.charAt(0)}</span>
            )}
          </motion.div>

          {/* Title + badges */}
          <div className="text-center">
            <h2 className="font-bold text-sm" style={{ color: titleColor }}>{titles[activeTab]}</h2>
            <div className="flex flex-wrap gap-1 justify-center mt-1.5">
              {project.type.map((t) => (
                isRestricted ? (
                  <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                    style={{ background: "rgba(255,51,51,0.1)", color: RED, borderColor: "rgba(255,51,51,0.35)" }}>
                    {t}
                  </span>
                ) : (
                  <span key={t} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[t] ?? "bg-muted text-muted-foreground border-border"}`}>{t}</span>
                )
              ))}
            </div>
          </div>

          {/* Restricted warning */}
          {isRestricted && (
            <motion.div
              className="text-center font-mono text-[11px] px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,0,0,0.07)", border: "1px solid rgba(255,51,51,0.25)", color: RED_MID }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠ NATIONAL CONFIDENTIALITY DIRECTIVE
            </motion.div>
          )}

          {/* Tech tags */}
          {activeTab === "technologies" && (
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
              {project.technologies.map((t, i) => (
                <motion.span key={t} className="text-[11px] px-2 py-0.5 rounded font-mono"
                  style={{
                    background: `${accent}12`,
                    color: accent,
                    border: `1px solid ${accent}30`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
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

/* ── TabbedTerminal ──────────────────────────────────────────────── */
function TabbedTerminal({
  project, activeTab, unlockedTabs, doneMap, cache, ip,
  onTabDone, onTabSwitch,
}: {
  project: Project;
  activeTab: TabKey;
  unlockedTabs: TabKey[];
  doneMap: Record<TabKey, boolean>;
  ip: string;
  cache: React.RefObject<Map<string, TLine[]>>;
  onTabDone: (t: TabKey) => void;
  onTabSwitch: (t: TabKey) => void;
}) {
  const isRestricted = !!project.restricted;
  const ACC = isRestricted ? RED     : GREEN;
  const DIM_ = isRestricted ? RED_DIM : DIM;
  const ROOT_ = isRestricted ? RED_MID : ROOT;

  const scripts: Record<TabKey, TLine[]> = {
    general:      generalScript(project, ip),
    details:      detailsScript(project, ip),
    technologies: techScript(project, ip),
  };
  const nextLabel: Partial<Record<TabKey, string>> = {
    general: "[Detailed]",
    details: "[Technologies]",
  };
  const nextTab: Partial<Record<TabKey, TabKey>> = {
    general: "details",
    details: "technologies",
  };

  const termBg  = isRestricted ? "#0a0000" : "#0a0a0a";
  const tabBg   = isRestricted ? "#0d0000" : "#0d0d0d";
  const userTag = isRestricted ? "ROOT" : "ThisIsNotYourIP";

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{ background: termBg, border: `1px solid ${ACC}20`, boxShadow: `0 0 40px -10px ${ACC}30` }}
    >
      {/* Restricted scanlines */}
      {isRestricted && (
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "repeating-linear-gradient(0deg,rgba(255,0,0,0.03) 0px,rgba(255,0,0,0.03) 1px,transparent 1px,transparent 3px)" }}
        />
      )}

      {/* Tab bar */}
      <div className="relative z-10 flex-shrink-0 flex items-stretch border-b"
        style={{ background: tabBg, borderColor: `${ACC}15` }}
      >
        {unlockedTabs.map((key) => {
          const active = key === activeTab;
          return (
            <motion.button
              key={key}
              onClick={() => onTabSwitch(key)}
              className="flex items-center justify-center gap-1.5 py-[7px] font-mono text-[11px] whitespace-nowrap overflow-hidden"
              style={{
                flex: 1, minWidth: 0,
                background: active ? `${ACC}08` : "transparent",
                borderRight: `1px solid ${ACC}10`,
                borderBottom: active ? `2px solid ${ACC}` : "2px solid transparent",
                cursor: "none",
                transition: "all 0.18s",
              }}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                display: "inline-block",
                background: active ? ACC : (isRestricted ? "#330000" : "#333"),
                boxShadow: active ? `0 0 5px ${ACC}` : "none",
                transition: "all 0.18s",
              }} />
              <span style={{ color: active ? DIM_ : (isRestricted ? "#3a0000" : "#3a3a3a"), overflow: "hidden", textOverflow: "ellipsis" }}>
                {userTag}@
              </span>
              <span style={{ color: active ? ROOT_ : (isRestricted ? "#2a0000" : "#2a2a2a"), overflow: "hidden", textOverflow: "ellipsis" }}>
                {ip}:~
              </span>
              <span style={{ color: isRestricted ? "#2a0000" : "#2a2a2a", fontSize: 10, flexShrink: 0 }}>×</span>
            </motion.button>
          );
        })}
      </div>

      {/* Prompt row */}
      <div className="relative z-10 px-4 pt-3 pb-1 flex-shrink-0 font-mono text-[13px]">
        <span style={{ color: DIM_ }}>{userTag}@</span>
        <span style={{ color: ROOT_ }}>{ip}</span>
        <span style={{ color: isRestricted ? "#550000" : "#555" }}>{isRestricted ? ":~#" : ":~$"}</span>
        <span className="inline-block w-[7px] h-[13px] ml-1 align-middle animate-pulse" style={{ background: ACC }} />
      </div>

      {/* Content area */}
      <div className="relative z-10 flex-1 px-4 pb-3 flex flex-col overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex-1 flex flex-col overflow-hidden min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LineStream
              lines={scripts[activeTab]}
              tabKey={activeTab}
              cache={cache}
              onFinished={() => onTabDone(activeTab)}
            />
            {doneMap[activeTab] && nextLabel[activeTab] && (
              <NextBtn
                label={nextLabel[activeTab]!}
                onClick={() => onTabSwitch(nextTab[activeTab]!)}
                restricted={isRestricted}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── ModalInner ──────────────────────────────────────────────────── */
function ModalInner({ project, onClose, layoutId }: {
  project: Project; onClose: () => void; layoutId: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [stage,     setStage]     = useState<Stage>("desktop");
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [ip, setIp] = useState("127.0.0.1");
  const [bootDone,  setBootDone]  = useState(false);
  const [doneMap, setDoneMap] = useState<Record<TabKey, boolean>>({ general: false, details: false, technologies: false });

  /* cache: stores fully typed lines per tab so they never retype */
  const cache = useRef<Map<string, TLine[]>>(new Map());

  /* unlocked = visited tabs — tracked separately so switching TO a tab unlocks it */
  const [visited, setVisited] = useState<Set<TabKey>>(new Set(["general"]));

  /* tabs appear only when the user explicitly navigates to them via button click */
  const unlocked: TabKey[] = [
    "general",
    ...(visited.has("details")      ? ["details"]      as TabKey[] : []),
    ...(visited.has("technologies") ? ["technologies"] as TabKey[] : []),
  ];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIp(d.ip ?? "127.0.0.1"))
      .catch(() => {});
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleTabDone = useCallback((t: TabKey) => {
    setDoneMap((prev) => ({ ...prev, [t]: true }));
  }, []);

  const handleTabSwitch = useCallback((t: TabKey) => {
    setVisited((prev) => { const s = new Set(prev); s.add(t); return s; });
    setActiveTab(t);
    setStage(t);
  }, []);

  const showSplit = stage !== "desktop" && stage !== "boot";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-stretch justify-end lg:flex-row lg:items-center lg:justify-center"
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: "rgba(0,0,0,0.72)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <style>{`
        @media(min-width:1024px){
          .project-modal-shell { flex: none !important; height: 720px !important; border-radius: 14px !important; }
        }
      `}</style>

      {/* Close btn row — mobile only top bar */}
      <div className="flex justify-end px-3 py-2 flex-shrink-0 lg:hidden" onClick={(e) => e.stopPropagation()}>
        <motion.button
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono"
          style={{ background: "rgba(255,95,87,0.12)", color: "#ff5f57", border: "1px solid rgba(255,95,87,0.35)", cursor: "none" }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          whileHover={{ scale: 1.12, background: "rgba(255,95,87,0.28)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >✕</motion.button>
      </div>

      {/* Desktop close btn — fixed top-right */}
      <motion.button
        className="hidden lg:flex fixed top-5 right-5 z-[210] w-9 h-9 rounded-full items-center justify-center text-xs font-mono"
        style={{ background: "rgba(255,95,87,0.12)", color: "#ff5f57", border: "1px solid rgba(255,95,87,0.35)", cursor: "none" }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        whileHover={{ scale: 1.12, background: "rgba(255,95,87,0.28)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >✕</motion.button>

        <motion.div
          layoutId={layoutId}
          onClick={(e) => e.stopPropagation()}
          className="project-modal-shell relative overflow-hidden flex flex-col lg:flex-row flex-1 lg:flex-none w-full"
          style={{
            minHeight: 0,
            width: "100%",
            maxWidth: 1100,
            borderRadius: "14px 14px 0 0",
            border: "1px solid rgba(0,255,65,0.15)",
            boxShadow: `0 0 100px -20px ${GREEN}40`,
          }}
          /* desktop: inline style overridden by scoped CSS below */
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* ── DESKTOP stage ── */}
        <AnimatePresence>
          {stage === "desktop" && (
            <motion.div
              key="desktop"
              className="absolute inset-0"
              style={{ background: isDark ? "#080808" : "#eef2eb" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Wallpaper logo — very faint background */}
              {project.logo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ opacity: 0.04 }}>
                  <div className="relative w-[200px] h-[200px]">
                    <Image src={project.logo} alt="" fill sizes="200px" className="object-contain filter grayscale" />
                  </div>
                </div>
              )}

              {/* Terminal icon — top-left like a desktop shortcut */}
              <motion.div
                className="absolute top-6 left-6 flex flex-col items-center gap-2"
                whileHover={{ scale: 1.08 }}
                onClick={() => setStage("boot")}
                style={{ cursor: "none", width: 72 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl"
                  style={{
                    background: isDark ? "rgba(0,255,65,0.07)" : "rgba(5,150,105,0.09)",
                    border: `1px solid ${isDark ? `${GREEN}30` : "rgba(5,150,105,0.3)"}`,
                  }}
                  animate={{ boxShadow: isDark
                    ? [`0 0 24px -8px ${GREEN}30`, `0 0 40px -4px ${GREEN}50`, `0 0 24px -8px ${GREEN}30`]
                    : [`0 0 24px -8px rgba(5,150,105,0.15)`, `0 0 40px -4px rgba(5,150,105,0.3)`, `0 0 24px -8px rgba(5,150,105,0.15)`]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span style={{ color: isDark ? GREEN : "#059669" }}>$_</span>
                </motion.div>
                <span className="font-mono text-[11px] text-center leading-tight"
                  style={{ color: isDark ? GREEN : "#059669" }}>Terminal</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOOT stage ── */}
        <AnimatePresence>
          {stage === "boot" && (
            <motion.div
              key="boot"
              className="absolute inset-0 flex flex-col"
              style={{ background: "#080808" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Boot terminal chrome */}
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-[7px] border-b"
                style={{ background: "#0d0d0d", borderColor: `${GREEN}15` }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="flex-1 text-center font-mono text-[11px]" style={{ color: MUTED }}>
                  ThisIsNotYourIP@{ip}: ~
                </span>
                <div className="flex gap-2" style={{ color: "#333", fontSize: 11 }}>
                  <span>⚲</span><span>≡</span><span>−</span><span>□</span><span>×</span>
                </div>
              </div>
              {/* Boot content */}
              <div className="flex-1 flex flex-col p-5 overflow-hidden">
                <LineStream
                  lines={bootScript(project, ip)}
                  tabKey="boot"
                  cache={cache}
                  onFinished={() => setBootDone(true)}
                />
                {bootDone && (
                  <NextBtn
                    label="Launch browser"
                    onClick={() => { setStage("general"); }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SPLIT stage ── */}
        {showSplit && (
          <motion.div
            className="absolute inset-0 flex flex-col lg:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* CSS handles mobile vs desktop sizing */}
            <style>{`
              .modal-browser { flex: 0 0 50% !important; min-height:0; height:50% !important; }
              .modal-terminal { flex: 0 0 50% !important; min-height:0; }
              @media(min-width:1024px){
                .modal-browser { flex: 0 0 50% !important; height:auto !important; min-width: 0; }
                .modal-terminal { flex: 0 0 50% !important; min-width: 0; }
              }
            `}</style>

            {/* Browser */}
            <motion.div
              className="modal-browser p-2"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <BrowserWindow
                project={project}
                activeTab={activeTab}
                unlockedTabs={unlocked}
                onNavSelect={handleTabSwitch}
              />
            </motion.div>

            {/* Terminal */}
            <motion.div
              className="modal-terminal p-2"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TabbedTerminal
                project={project}
                activeTab={activeTab}
                unlockedTabs={unlocked}
                doneMap={doneMap}
                cache={cache}
                ip={ip}
                onTabDone={handleTabDone}
                onTabSwitch={handleTabSwitch}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Border overlay */}
        <div className="absolute inset-0 rounded-[14px] pointer-events-none"
          style={{ border: "1px solid rgba(0,255,65,0.1)" }} />
      </motion.div>
    </motion.div>
  );
}

/* ── export ──────────────────────────────────────────────────────── */
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
