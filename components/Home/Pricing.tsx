"use client";

import { motion } from "framer-motion";
import PricingCard from "../common/PricingCard";
import { pricingData } from "@/assets/data/pricing-data";

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 xl:gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-4xl font-bold text-accent">Pricing</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        <div className="flex flex-col xl:flex-row justify-center items-center gap-6 xl:gap-10 rounded-2xl p-4">
          {pricingData.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
