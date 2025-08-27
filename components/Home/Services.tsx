"use client";

import { servicesData } from "@/assets/data/services-data";
import Image from "next/image";
import HoverZoom from "../motions/HoverZoom";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 xl:gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-4xl font-bold text-accent">Services</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-4 items-stretch">
          {servicesData.map((service) => (
            <HoverZoom key={service.index}>
              <div className="flex flex-col items-center justify-between p-4 shadow-lg rounded-lg border border-accent/10 hover:border-accent duration-300 hover:bg-background h-full">
                <div className="text-3xl mb-2 rounded-4xl bg-amber-200/8 border-accent/10 border p-2 flex items-center justify-center w-16 h-16 overflow-hidden">
                  <Image
                    src={service.Icon}
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="service icon"
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-semibold mb-1 text-center">
                  {service.Title}
                </p>
                <p className="text-gray-600 text-center">
                  {service.Description}
                </p>
              </div>
            </HoverZoom>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
