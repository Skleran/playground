"use client";

import { useEffect, useState } from "react";
import ComponentWrapper from "@/components/custom/component-wrapper";
// import { motion, useMotionValue, useSpring } from "motion/react";

export default function Page() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - 28, y: e.clientY - 28 }); // offset so circle centers
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Helper to keep text inside viewport with padding
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const padding = 60; // safe margin from screen edges

  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;

  // Different clamped positions for each text group
  const xcoordX = clamp(
    pos.x + (12 / 100) * vw + 30,
    padding,
    vw - 2.5 * padding
  );
  const xcoordY = clamp(pos.y - 20, padding + 10, vh - 1.25 * padding);

  const ycoordX = clamp(pos.x + 50, padding, vw - 2.32 * padding);
  const ycoordY = clamp(pos.y + 330, padding, vh - 1.25 * padding);

  const nameX = clamp(pos.x - (20 / 100) * vw - 200, padding, vw - 4 * padding);
  const nameY = clamp(pos.y - 30, padding, vh - 4.35 * padding);

  return (
    <ComponentWrapper>
      <div className="flex overflow-hidden cursor-none">
        <div className="min-h-[100svh]">
          <div className="absolute pointer-events-none">
            <div>
              <div>
                <span
                  className="absolute font-mono text-muted-foreground/50"
                  style={{
                    transform: `translate(${xcoordX}px, ${xcoordY}px)`,
                  }}
                >
                  {pos.x}px
                </span>
                <span
                  className="absolute font-mono text-muted-foreground/50"
                  style={{
                    transform: `translate(${ycoordX}px, ${ycoordY}px)`,
                  }}
                >
                  {pos.y}px
                </span>
              </div>
              <div
                className="absolute flex flex-col text-nowrap gap-10"
                style={{
                  transform: `translate(${nameX}px, ${nameY}px)`,
                }}
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
              </div>
            </div>
            {/* container for circle + lines */}
            <div
              className="relative flex items-center justify-center"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              {/* vertical top line */}
              <div className="absolute top-[-100vh] left-1/2 w-px h-[100vh] bg-muted-foreground/50" />

              {/* vertical bottom line */}
              <div className="absolute bottom-[-100vh] left-1/2 w-px h-[100vh] bg-muted-foreground/50" />

              {/* horizontal left line (before style) */}
              <div className="absolute left-[-100vw] top-1/2 h-px w-[100vw] bg-muted-foreground/50" />

              {/* horizontal right line (after style) */}
              <div className="absolute right-[-100vw] top-1/2 h-px w-[100vw] bg-muted-foreground/50" />

              {/* circle */}
              <div className="size-10 m-2 bg-special-orange rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
