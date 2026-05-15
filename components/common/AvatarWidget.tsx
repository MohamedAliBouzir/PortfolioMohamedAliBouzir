"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "hi_avatar";
const RESHOW_AFTER_MS = 48 * 60 * 60 * 1000; // 48 hours

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true; // first ever visit

    const { dismissed, lastOpened } = JSON.parse(raw) as {
      dismissed: boolean;
      lastOpened: number;
    };

    if (!dismissed) return true;

    // dismissed before — only reshow if 48 h have passed
    const elapsed = Date.now() - (lastOpened ?? 0);
    return elapsed >= RESHOW_AFTER_MS;
  } catch {
    return true;
  }
}

function persistDismissed() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ dismissed: true, lastOpened: Date.now() })
    );
  } catch {}
}

function persistOpened() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // first time — record open, not yet dismissed
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dismissed: false, lastOpened: Date.now() })
      );
      return;
    }
    const data = JSON.parse(raw);
    // only update lastOpened if we are reshowing after 48 h
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, lastOpened: Date.now() })
    );
  } catch {}
}

export default function AvatarWidget() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (shouldShow()) {
      persistOpened();
      setVisible(true);
    }
  }, []);

  function dismiss() {
    persistDismissed();
    setVisible(false);
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="avatar-widget"
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 select-none"
          initial={{ opacity: 0, y: 48, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.75 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.6 }}
        >
          {/* Speech bubble */}
          <motion.button
            onClick={dismiss}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Dismiss avatar"
          >
            <div className="glass px-4 py-2.5 rounded-2xl rounded-br-sm border border-border/60 shadow-lg text-sm font-mono text-foreground/90 whitespace-nowrap">
              Hover &amp; Click everywhere!
              {/* bubble tail */}
              <span className="absolute -bottom-[9px] right-3 w-3 h-3 overflow-hidden block">
                <span className="absolute top-0 right-0 w-4 h-4 bg-background/80 border-b border-r border-border/60 rotate-45 -translate-y-1/2" />
              </span>
            </div>
            {/* live badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary opacity-80 ring-2 ring-background animate-pulse" />
          </motion.button>

          {/* Avatar */}
          <motion.div
            className="relative w-24 h-24 cursor-pointer"
            onClick={dismiss}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/MyAvatarHI.png"
              alt="Mohamed Ali waving"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
