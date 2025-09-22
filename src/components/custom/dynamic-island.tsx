"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { motion, Variants } from "motion/react";
import type { Transition } from "motion/react";

export default function DynamicIsland() {
  const [mode, setMode] = useState<"idle" | "ring" | "silent">("idle");
  const [showActiveClasses, setShowActiveClasses] = useState(false);

  useEffect(() => {
    if (mode === "ring" || mode === "silent") setShowActiveClasses(true);
  }, [mode]);

  const islandVariants: Variants = {
    idle: { width: "100px" },
    ring: { width: "128px" },
    silent: { width: "148px" },
  };

  const ringTextVariants: Variants = {
    idle: { scale: 0.8, opacity: 0, filter: "blur(4px)" },
    ring: { scale: 1, opacity: 1, filter: "blur(0px)" },
    silent: { scale: 0.8, opacity: 0, filter: "blur(4px)" },
  };

  const silentTextVariants: Variants = {
    idle: { scale: 0.8, opacity: 0, filter: "blur(4px)" },
    ring: { scale: 0.8, opacity: 0, filter: "blur(4px)" },
    silent: { scale: 1, opacity: 1, filter: "blur(0px)" },
  };

  // const bellVariants: Variants = {
  //   idle: { scale: 0.9, opacity: 0, filter: "blur(4px)" },
  //   ring: { scale: 1, opacity: 1, filter: "blur(0px)" },
  //   silent: { scale: 1, opacity: 1, filter: "blur(0px)", translateX: "8.5px" },
  // };

  const redBgVariants: Variants = {
    idle: { width: 0, opacity: 0, filter: "blur(4px)" },
    ring: { width: 0, opacity: 0, filter: "blur(4px)" },
    silent: { width: 40, opacity: 1, filter: "blur(0px)" },
  };

  const outerLineVariants: Variants = {
    idle: { scale: 0.9, opacity: 0, filter: "blur(4px)", translateX: "0px" },
    ring: { scale: 1, opacity: 1, filter: "blur(0px)", translateX: "0px" },
    silent: { scale: 1, opacity: 1, filter: "blur(0px)", translateX: "8.5px" },
  };

  const innerLineVariants: Variants = {
    idle: { height: "0px", opacity: 0 },
    ring: { height: "0px", opacity: 0 },
    silent: { height: "16px", opacity: 1 },
  };

  const islandTransition: Transition = {
    type: "spring",
    stiffness: 250,
    bounce: 0.6,
    damping: 14,
    mass: 0.8,
  };

  const textTransition: Transition = {
    type: "spring",
    stiffness: 150,
    bounce: 0,
    damping: 15,
    mass: 1,
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <div className="mx-auto overflow-hidden rounded-full bg-black">
        <div>
          <motion.div
            initial="idle"
            animate={mode}
            variants={islandVariants}
            transition={islandTransition}
            className={`h-[28px] ${
              showActiveClasses
                ? "relative flex items-center justify-between px-2.5"
                : ""
            }`}
            onAnimationComplete={(def) => {
              if (def === "idle") setShowActiveClasses(false);
            }}
          >
            <motion.div
              initial="idle"
              animate={mode}
              variants={redBgVariants}
              transition={islandTransition}
              className="absolute left-[5px] h-[18px] w-12 cursor-pointer rounded-full bg-[#FD5F30]"
            />
            <button className="relative h-[12.75px] w-[11.25px] ">
              {" "}
              <motion.svg
                initial="idle"
                animate={mode}
                variants={outerLineVariants}
                transition={textTransition}
                width="11.25"
                height="12.75"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
              >
                <path
                  d="M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z"
                  fill="white"
                ></path>
              </motion.svg>
              <motion.div
                initial="idle"
                animate={mode}
                variants={outerLineVariants}
                transition={textTransition}
                className="absolute inset-0"
              >
                <div className="h-5 -translate-y-[5px] translate-x-[5.25px] rotate-[-40deg] overflow-hidden">
                  <motion.div
                    initial="idle"
                    animate={mode}
                    variants={innerLineVariants}
                    transition={textTransition}
                    className="w-fit rounded-full"
                  >
                    <div className="flex h-full w-[3px] items-center justify-center rounded-full bg-[#FD4F30]">
                      <div className="h-full w-[0.75px] rounded-full bg-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </button>

            <div className="relative flex w-[32px] items-center">
              <motion.span
                initial="idle"
                animate={mode}
                variants={ringTextVariants}
                transition={textTransition}
                className="text-xs ml-auto font-medium text-white"
              >
                Ring
              </motion.span>
              <motion.span
                initial="idle"
                animate={mode}
                variants={silentTextVariants}
                transition={textTransition}
                className="absolute text-xs font-medium text-[#FD4F30]"
              >
                Silent
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button variant={"outline"} onClick={() => setMode("idle")}>
          Idle
        </Button>
        <Button variant={"outline"} onClick={() => setMode("ring")}>
          Ring
        </Button>
        <Button variant={"outline"} onClick={() => setMode("silent")}>
          Silent
        </Button>
      </div>
    </div>
  );
}
