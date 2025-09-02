"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
          <AccordionItem value="item-1">
            <AccordionTrigger>VIVIA-M</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>SMOFT ERP</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Billcom Consulting</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Skillware Company</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Digital Market</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Code Time</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              Description holder
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
};

export default Experiences;
