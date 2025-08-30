"use client";

import { useEffect, useState } from "react";
import ComponentWrapper from "@/components/custom/component-wrapper";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function Page() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // smoothed values
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 10, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 10, mass: 0.1 });

  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

  useMotionValueEvent(smoothX, "change", (latest) => {
    setSmoothPos((prev) => ({ ...prev, x: latest }));
  });
  useMotionValueEvent(smoothY, "change", (latest) => {
    setSmoothPos((prev) => ({ ...prev, y: latest }));
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 28);
      mouseY.set(e.clientY - 28);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // clamp helper
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const padding = 60;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;

  const xcoordX = clamp(
    smoothPos.x + (12 / 100) * vw + 30,
    padding,
    vw - 2.5 * padding
  );
  const xcoordY = clamp(smoothPos.y - 20, padding + 10, vh - 1.25 * padding);

  const ycoordX = clamp(smoothPos.x + 50, padding, vw - 2.32 * padding);
  const ycoordY = clamp(smoothPos.y + 330, padding, vh - 1.25 * padding);

  const nameX = clamp(
    smoothPos.x - (20 / 100) * vw - 200,
    padding,
    vw - 4 * padding
  );
  const nameY = clamp(smoothPos.y - 30, padding, vh - 4.35 * padding);

  return (
    <ComponentWrapper>
      <div className="flex overflow-hidden cursor-none">
        <div className="min-h-[100svh]">
          <div className="absolute pointer-events-none">
            {/* coords */}
            <span
              className="absolute font-mono text-muted-foreground/50"
              style={{ transform: `translate(${xcoordX}px, ${xcoordY}px)` }}
            >
              {Math.round(smoothPos.x)}px
            </span>
            <span
              className="absolute font-mono text-muted-foreground/50"
              style={{ transform: `translate(${ycoordX}px, ${ycoordY}px)` }}
            >
              {Math.round(smoothPos.y)}px
            </span>

            {/* name + list */}
            <motion.div
              className="absolute flex flex-col text-nowrap gap-10"
              style={{ x: nameX, y: nameY }}
            >
              <div className="font-mono tracking-tighter text-xl sm:text-4xl">
                Erdem Koyuncu
              </div>
              <ul className="sm:text-xl leading-relaxed">
                <li>Design</li>
                <li>Develop</li>
                <li>Test</li>
                <li>Improve</li>
              </ul>
            </motion.div>

            {/* circle + lines */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ x: smoothX, y: smoothY }}
            >
              <div className="absolute top-[-100vh] left-1/2 w-px h-[100vh] bg-muted-foreground/50" />
              <div className="absolute bottom-[-100vh] left-1/2 w-px h-[100vh] bg-muted-foreground/50" />
              <div className="absolute left-[-100vw] top-1/2 h-px w-[100vw] bg-muted-foreground/50" />
              <div className="absolute right-[-100vw] top-1/2 h-px w-[100vw] bg-muted-foreground/50" />
              <div className="size-10 m-2 bg-special-orange rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
