"use client";

import { motion } from "framer-motion";
import RotateItem from "../motions/rotateItems";
import { CarouselItem } from "../ui/CarouselItem";
import { projectsData } from "@/assets/data/projects-data";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 xl:gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-4xl font-bold text-accent">Projects</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <RotateItem
          items={projectsData.map((item) => (
            <CarouselItem key={item.id} data={item} />
          ))}
        />
      </motion.div>
    </div>
  );
};

export default Projects;
