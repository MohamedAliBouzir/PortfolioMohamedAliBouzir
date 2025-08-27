"use client";
import { motion } from "framer-motion";

export default function Gestures({ children }: { children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      {children}
    </motion.div>
  );
}
