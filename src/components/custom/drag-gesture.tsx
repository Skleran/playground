"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

export default function DragGesture() {
  const boundingBox = useRef(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 100], [1, 0]);

  return (
    <div
      ref={boundingBox}
      className="w-full min-h-[400px] flex items-center justify-center p-6"
      style={{ touchAction: "pan-x pan-y" }}
    >
      <motion.div
        // drag
        // dragConstraints={boundingBox}
        // // dragMomentum={false}
        // dragElastic={0.8}
        onPan={(_, info) => {
          y.set(info.offset.y);
        }}
        onPanEnd={() => {
          // animate back
          animate(y, 0, {
            type: "spring",
            bounce: 0.25,
            duration: 0.6,
          });
        }}
        style={{
          y,
          opacity,
          // Prevent touch scrolling/zooming interference
          touchAction: "none",
        }}
        className="size-14 rounded-full bg-special-orange hover:cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
}
