"use client";
import { motion } from "framer-motion";

export default function WildcardKeyframes({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        scale: [null, 1.1, 1.6],
        transition: {
          duration: 0.5,
          times: [0, 0.6, 1],
          ease: ["easeInOut", "easeOut"],
        },
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}