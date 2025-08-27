"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ImageHolder = ({ src }: { src: string | StaticImport }) => {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.5, duration: 0.2, ease: "easeIn" },
        }}
        className="flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.7, duration: 0.2, ease: "easeInOut" },
          }}
          className="w-65 h-65 xl:w-92 xl:h-92 rounded-full overflow-hidden absolute"
        >
          <Image
            src={src}
            priority
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="personal-image"
            className="object-cover"
          />
        </motion.div>
        <motion.svg
          className="w-70 h-70 xl:w-100 xl:h-100"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="oklch(71.407% 0.24045 319.146)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default ImageHolder;
