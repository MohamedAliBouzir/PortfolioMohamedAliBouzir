"use client";

import { motion } from "framer-motion";
import HoverScale from "../motions/HoverScale";
import {
  BackEndTechnologiesData,
  DataBaseData,
  FrontEndTechnologiesData,
  MobileTechnologiesData,
} from "@/assets/data/technologies-data";
import TechnologyCard from "../TechnologyCard";

const Technologies = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 xl:gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-4xl font-bold text-accent">Technologies</p>
      </motion.div>
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center text-gray-600 mb-4"
        >
          Front-end Development
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center gap-4 max-w-6xl"
        >
          {FrontEndTechnologiesData.map((frontTech) => (
            <HoverScale key={frontTech.index}>
              <TechnologyCard props={frontTech} />
            </HoverScale>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col xl:flex-row justify-evenly w-full max-w-6xl">
        <div className="flex flex-col ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center text-gray-600 mb-4"
          >
            Back-end Development
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap justify-center gap-4 max-w-6xl"
          >
            {BackEndTechnologiesData.map((backTech) => (
              <HoverScale key={backTech.index}>
                <TechnologyCard props={backTech} />
              </HoverScale>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center text-gray-600 mb-4"
          >
            Mobile Development
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap justify-center gap-4 max-w-6xl"
          >
            {MobileTechnologiesData.map((mob) => (
              <HoverScale key={mob.index}>
                <TechnologyCard props={mob} />
              </HoverScale>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center text-gray-600 mb-4"
        >
          DataBases & Tools
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center gap-4 max-w-6xl"
        >
          {DataBaseData.map((db) => (
            <HoverScale key={db.index}>
              <TechnologyCard props={db} />
            </HoverScale>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Technologies;
