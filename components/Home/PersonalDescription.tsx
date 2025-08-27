"use client";

import { motion } from "framer-motion";
import HoverZoom from "../motions/HoverZoom";

const PersonalDescription = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex flex-col items-center"
    >
        <p className="text-center font-extrabold font-mono text-4xl text-accent">
          Software Engineer
        </p>
      <HoverZoom>
        <p className="text-xl">Hello There 👋🏽😄</p>
      </HoverZoom>
        <p className="text-2xl">
          I&apos;m{" "}
          <span className="text-accent">
            Bouzir Mohamed A<span>li</span>
          </span>
        </p>
      <HoverZoom>
        <p className="font-mono font-extralight italic text-xs">
          You can call me Daly
        </p>
      </HoverZoom>
      <p
        className="mt-4 px-6 py-4
                    rounded-xl
                    text-base
                    leading-relaxed
                    text-foreground
                    shadow
                    max-w-xl
                    text-center"
      >
        I&apos;m a software engineer with a passion for building web
        applications and exploring new technologies. with nearly 3 years of
        experience as a JS Full Stack Developer, I have honed my skills in both
        frontend and backend development. My expertise lies in React, Node.js,
        and various other technologies. I love to create intuitive and
        user-friendly interfaces that enhance the user experience.
      </p>
    </motion.div>
  );
};

export default PersonalDescription;
