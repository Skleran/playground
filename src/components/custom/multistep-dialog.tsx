"use client";

import React, { useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { AnimatePresence, motion, MotionConfig, Variants } from "motion/react";
import useMeasure from "react-use-measure";

export default function MultistepDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDiraction] = useState(0);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="text-lg font-semibold pb-2">This is step one</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              obcaecati maxime cum dicta.
            </p>
            <div>
              <Skeleton className="w-2/3 h-5 my-2" />
              <Skeleton className="w-8/9 h-5 my-2" />
              <Skeleton className="w-1/2 h-5 my-2" />
              <Skeleton className="w-4/5 h-5 my-2" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-lg font-semibold pb-2">This is step two</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              obcaecati maxime cum dicta. Quibusdam, eos consequatur aut
              recusandae accusantium tempore.
            </p>
            <div>
              <Skeleton className="w-2/3 h-5 my-2" />
              <Skeleton className="w-3/7 h-5 my-2" />
              <Skeleton className="w-8/9 h-5 my-2" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-lg font-semibold pb-2">This is step three</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              obcaecati maxime cum dicta. Quibusdam, eos consequatur aut
              recusandae accusantium tempore.
            </p>
            <div>
              <Skeleton className="w-2/3 h-5 my-2" />
              <Skeleton className="w-1/2 h-5 my-2" />
              <Skeleton className="w-1/3 h-5 my-2" />
              <Skeleton className="w-3/4 h-5 my-2" />
              <Skeleton className="w-3/5 h-5 my-2" />
            </div>
          </>
        );
    }
  }, [currentStep]);

  const variants: Variants = {
    initial: (direction) => {
      return { x: `${110 * direction}%`, opacity: 0 };
    },
    active: { x: "0%", opacity: 1 },
    exit: (direction) => {
      return { x: `${-110 * direction}%`, opacity: 0 };
    },
  };

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}>
      <motion.div
        animate={{ height: bounds.height || "auto" }}
        className="max-w-120 border rounded-xl bg-accent/50 px-4 overflow-hidden relative"
      >
        <div ref={ref} className="flex flex-col justify-between gap-3 py-4">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              variants={variants}
              key={currentStep}
              initial="initial"
              animate="active"
              exit="exit"
              custom={direction}
              transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
              className=""
            >
              {content}
            </motion.div>
          </AnimatePresence>
          <motion.div layout className="flex items-center justify-between">
            <Button
              disabled={currentStep === 0}
              onClick={() => {
                if (currentStep === 0) return;
                setCurrentStep((prev) => prev - 1);
                setDiraction(-1);
              }}
              variant={"secondary"}
              className="rounded-full px-5"
            >
              Back
            </Button>
            <Button
              disabled={currentStep === 2}
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(0);
                  setDiraction(-1);
                  return;
                }
                setCurrentStep((prev) => prev + 1);
                setDiraction(1);
              }}
              className="bg-special-orange hover:bg-special-orange/85 text-white rounded-full px-7"
            >
              Next
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
