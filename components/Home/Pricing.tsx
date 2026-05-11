"use client";

import { motion } from "framer-motion";
import PricingCard from "../common/PricingCard";
import { pricingData } from "@/assets/data/pricing-data";

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center"
      >
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent">
          Pricing Plans
        </p>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Choose the perfect plan for your project
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingData.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
