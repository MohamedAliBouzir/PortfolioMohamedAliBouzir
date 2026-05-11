"use client";

import { motion } from "framer-motion";
import { navigationMenu } from "@/Content/navigation-menu";
import { useUIStore } from "@/store/ui.store";

const Nav = () => {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navigationMenu.map((link) => (
        <motion.a
          key={link.index}
          href={link.path}
          whileHover={{ scale: 1.04 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group cursor-none"
        >
          {link.name}
          <span className="absolute inset-x-4 bottom-1 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.a>
      ))}
    </nav>
  );
};

export default Nav;
