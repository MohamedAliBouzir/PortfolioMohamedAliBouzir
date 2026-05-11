"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationMenu } from "@/Content/navigation-menu";
import { useUIStore } from "@/store/ui.store";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-muted-foreground hover:text-accent transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 right-0 glass-strong border-b border-border/50 z-50 py-4"
          >
            <nav className="container mx-auto px-4 flex flex-col gap-1">
              {navigationMenu.map((link) => (
                <a
                  key={link.index}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all duration-200 cursor-none"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
