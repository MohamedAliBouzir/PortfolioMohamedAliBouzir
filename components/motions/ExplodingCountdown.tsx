"use client";
import React, { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

// Define explode animation for each letter
const explodeLetter = (): MotionProps["animate"] => ({
  x: (Math.random() - 0.5) * 400,
  y: (Math.random() - 0.5) * 400,
  rotate: Math.random() * 720 - 360,
  scale: [1, 1.5, 0],
  opacity: 0,
  transition: { duration: 1.2, ease: 'easeOut' },
});

const TypewriterExplodingText: React.FC = () => {
  const fullText = 'Self-destruct in...';
  const [typedText, setTypedText] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [exploded, setExploded] = useState<boolean>(false);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setCountdown(5);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Countdown effect
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    if (countdown === 1) {
      setTimeout(() => setExploded(true), 1000);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono space-y-8">
      {/* Typewriter Text with Exploding Letters */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold flex space-x-1">
        {fullText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={
              exploded
                ? explodeLetter()
                : typedText.length > index
                  ? { opacity: 1 }
                  : { opacity: 0 }
            }
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default TypewriterExplodingText;
