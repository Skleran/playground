"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion, useMotionValue, useTransform } from "motion/react";
import clsx from "clsx";
import { animate } from "motion";

export default function OutlineOrbitButton() {
  const [isHovered, setIsHovered] = useState(false);

  const rectangles = [
    {
      width: 200,
      height: 56,
      normalColor: "stroke-sky-500",
      hoverColor: "stroke-sky-400",
    },
    {
      width: 256,
      height: 112,
      normalColor: "stroke-sky-500/25",
      hoverColor: "stroke-sky-400/35",
    },
    {
      width: 312,
      height: 168,
      normalColor: "stroke-sky-500/10",
      hoverColor: "stroke-sky-400/20",
    },
  ];

  const strokeWidth = 2;
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress]);

  const innerBorderOffset = useTransform(progress, [0, 1], [0, -64]);
  const middleBorderOffset = useTransform(progress, [0, 1], [0, 64]);
  const outerBorderOffset = useTransform(progress, [0, 1], [0, -128]);

  const borderOffsets = [
    innerBorderOffset,
    middleBorderOffset,
    outerBorderOffset,
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: rectangles[2].width,
        height: rectangles[2].height,
      }}
    >
      {/* animated svg borders */}
      {rectangles.map((rect, index) => (
        <svg
          key={index}
          className="pointer-events-none absolute left-1/2 top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          width={rect.width + strokeWidth}
          height={rect.height + strokeWidth}
          viewBox={`0 0 ${rect.width + strokeWidth} ${
            rect.height + strokeWidth
          }`}
        >
          <motion.rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={rect.width}
            height={rect.height}
            rx={rect.height / 2}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray="4 4"
            className={clsx(
              "transition-colors duration-500 ease-out",
              isHovered ? rect.hoverColor : rect.normalColor
            )}
            style={{
              strokeDashoffset: borderOffsets[index],
            }}
          />
        </svg>
      ))}

      <Button
        className="relative z-10 w-[200px] h-[56px] rounded-full bg-sky-100/30 dark:bg-sky-900/30 hover:bg-sky-100/70 dark:hover:bg-sky-900/50"
        variant={"ghost"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xl">Button</span>
      </Button>
    </div>
  );
}
