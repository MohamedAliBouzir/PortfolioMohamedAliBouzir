"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/store/ui.store";
import { ModeToggle } from "@/components/LightDarkButton";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = () => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full relative"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-bold text-xl tracking-tight flex-shrink-0 cursor-none"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <span className="aurora-gradient-text">MohA</span>
          <span className="text-foreground">.</span>
        </motion.a>

        {/* Desktop nav */}
        <Nav />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
