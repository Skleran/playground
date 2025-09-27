"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function AnimateHeight() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div className="h-full">
      <div className="border bg-accent rounded-xl w-full max-w-88 overflow-hidden">
        <motion.div
          animate={{ height: bounds.height || "auto" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="px-4 my-3"
        >
          <div ref={ref}>
            <h2
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-base font-semibold w-full flex items-center justify-between hover:cursor-pointer"
            >
              Lorem ipsum dolor sit amet?
              <span className="text-sm font-normal text-muted-foreground flex items-center justify-center">
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ArrowDown className="size-5" />
                </motion.span>
              </span>
            </h2>
            <div className="w-full border-t-1 my-1.5" />
            <p className="text-sm mb-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
              provident aliquid doloremque.
            </p>
            <AnimatePresence mode="popLayout">
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  className={`text-sm`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid sit omnis atque perferendis.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
