"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { experienceData } from "@/assets/data/experience-data";
import Image from "next/image";

const Experiences = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 xl:gap-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-4xl font-bold text-accent">Resume</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-screen flex items-center justify-center"
      >
        <Accordion
          type="single"
          collapsible
          className="w-6xl max-w-6xl "
          defaultValue="item-1"
        >
          {experienceData.map((data) => (
            <AccordionItem key={data.id} value={`item-${data.id}`}>
              <AccordionTrigger>
                <div className="flex flex-row gap-5 items-center">
                  <div>
                    {data.logo && (
                      <Image
                        src={data.logo}
                        priority
                        quality={100}
                        width={48}
                        height={48}
                        alt={data.societeName}
                        sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 10vw"
                        className="rounded-3xl"
                      />
                    )}
                  </div>
                  <div>{data.societeName}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div className="flex justify-between ml-4 mr-4 items-center">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold">{data.position}</div>
                    <div className="font-mono">{`${data.type}/${data.presence}`}</div>
                  </div>
                  <div className="font-bold">{`${data.startDate} - ${data.endDate}`}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default Experiences;
