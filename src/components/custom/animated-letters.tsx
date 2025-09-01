import { Variants, motion } from "motion/react";
import React from "react";

export default function AnimatedLetters({
  delay,
  text,
}: {
  delay?: number;
  text: string;
}) {
  const container: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.4,
        // staggerChildren: 0.225, faster animation
        repeat: Infinity,
        repeatType: "loop",
        delayChildren: delay,
      },
    },
  };

  const letter: Variants = {
    animate: {
      "--wght": [100, 900, 100],
      transition: {
        duration: 5,
        // duration: 3,
        // ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.span variants={container} animate="animate" className="flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{
            fontVariationSettings: `"wght" var(--wght)`,
          }}
          className="text-[20vw] leading-[13vw] sm:text-[15vw] sm:leading-[9.5vw] md:text-[13vw] md:leading-[8vw] lg:text-[clamp(1rem,8vw,10rem)] lg:leading-[clamp(0.1rem,5vw,6rem)] tracking-[-0.04em]"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
