"use client";
import { countUpData } from "@/assets/data/professional-data";
import CountUp from "../motions/CountUp";
import { motion } from "framer-motion";

const InformationsNumbers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-20 items-center"
    >
      {countUpData.map((data) => (
        <CountUp key={data.id} {...data} />
      ))}
    </motion.div>
  );
};

export default InformationsNumbers;
