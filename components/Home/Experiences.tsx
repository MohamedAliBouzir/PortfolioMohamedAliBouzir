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
    <div className="flex flex-col items-center justify-center w-screen min-h-screen px-4 py-12 gap-8 -mx-[calc((100vw-100%)/2)]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center"
      >
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent">
          Resume
        </p>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          My professional journey and experience
        </p>
      </motion.div>

      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
          {experienceData.map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${data.id}`} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline py-4 sm:py-6 px-3 sm:px-6 rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex flex-row gap-3 sm:gap-5 items-center w-full text-left">
                    <div className="flex-shrink-0">
                      {data.logo && (
                        <Image
                          src={data.logo}
                          priority
                          quality={100}
                          width={56}
                          height={56}
                          alt={data.societeName}
                          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold truncate">
                        {data.societeName}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {data.position}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                      <div className="flex flex-col gap-2">
                        <div className="text-base sm:text-lg font-bold text-accent">
                          {data.position}
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                          {data.type} • {data.presence}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-muted-foreground">
                        {data.startDate} - {data.endDate}
                      </div>
                    </div>
                    <div
                      className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default Experiences;
