"use client";

import { useEffect, useState } from "react";
import ComponentWrapper from "@/components/custom/fullscreen-component-wrapper";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import NumberFlow from "@number-flow/react";

export default function Page() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // smoothed values
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 10, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 10, mass: 0.1 });

  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

  const xCoordX = useMotionValue(0);
  const xCoordY = useMotionValue(0);
  const yCoordX = useMotionValue(0);
  const yCoordY = useMotionValue(0);
  const nameX = useMotionValue(0);
  const nameY = useMotionValue(0);

  // Spring configurations for bouncy text
  // const bounceSpring = { stiffness: 100, damping: 12, mass: 0.8 };

  const nameBounceSpring = { stiffness: 75, damping: 13, mass: 0.8 };
  const xCoordBounceSpring = { stiffness: 110, damping: 9, mass: 0.45 };
  const yCoordBounceSpring = { stiffness: 70, damping: 8, mass: 0.35 };

  const xCoordXSpring = useSpring(xCoordX, xCoordBounceSpring);
  const xCoordYSpring = useSpring(xCoordY, xCoordBounceSpring);
  const yCoordXSpring = useSpring(yCoordX, yCoordBounceSpring);
  const yCoordYSpring = useSpring(yCoordY, yCoordBounceSpring);
  const nameXSpring = useSpring(nameX, nameBounceSpring);
  const nameYSpring = useSpring(nameY, nameBounceSpring);

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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        return;
      }

      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      if (touch) {
        mouseX.set(touch.clientX - 28);
        mouseY.set(touch.clientY - 28);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (touch) {
          mouseX.set(touch.clientX - 28);
          mouseY.set(touch.clientY - 28);
        }
      }
    };

    // Mouse events
    window.addEventListener("mousemove", handleMouseMove);

    // Touch events
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [mouseX, mouseY]);

  // clamp helper with overshoot
  const elasticClamp = (
    value: number,
    min: number,
    max: number,
    overshootFactor = 0.1
  ) => {
    if (value < min) {
      const overshoot = (min - value) * overshootFactor;
      return min - overshoot;
    }
    if (value > max) {
      const overshoot = (value - max) * overshootFactor;
      return max + overshoot;
    }
    return value;
  };

  const padding =
    typeof window !== "undefined" && window.innerWidth > 600 ? 60 : 30;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;

  useEffect(() => {
    // x coordinate position
    const xcoordTargetX = smoothPos.x + (12 / 100) * vw + 30;
    const xcoordTargetY = smoothPos.y - 20;

    const clampedXcoordX = elasticClamp(
      xcoordTargetX,
      padding,
      vw - 2.9 * padding
    );
    const clampedXcoordY = elasticClamp(
      xcoordTargetY,
      padding + 10,
      vh - 1.25 * padding
    );

    xCoordX.set(clampedXcoordX);
    xCoordY.set(clampedXcoordY);

    // y coordinate position
    const ycoordTargetX = smoothPos.x + 50;
    const ycoordTargetY = smoothPos.y + 330;

    const clampedYcoordX = elasticClamp(
      ycoordTargetX,
      padding,
      vw - 2.32 * padding
    );
    const clampedYcoordY = elasticClamp(
      ycoordTargetY,
      padding,
      vh - 1.9 * padding
    );

    yCoordX.set(clampedYcoordX);
    yCoordY.set(clampedYcoordY);

    // name + list position
    const nameTargetX = smoothPos.x - (20 / 100) * vw - 200;
    const nameTargetY = smoothPos.y - 30;

    const clampedNameX = elasticClamp(
      nameTargetX,
      2 * padding,
      vw - 8 * padding
    );
    const clampedNameY = elasticClamp(
      nameTargetY,
      padding,
      vh - 4.65 * padding
    );

    nameX.set(clampedNameX);
    nameY.set(clampedNameY);
  }, [
    smoothPos.x,
    smoothPos.y,
    vw,
    vh,
    xCoordX,
    xCoordY,
    yCoordX,
    yCoordY,
    nameX,
    nameY,
  ]);

  return (
    <ComponentWrapper subdomain="cursor-menu">
      <div className="flex overflow-hidden cursor-none">
        <div className="min-h-[100svh]">
          <div className="absolute pointer-events-none">
            {/* coords */}
            <motion.span
              className="absolute font-mono text-muted-foreground/50 text-nowrap"
              style={{
                x: xCoordXSpring,
                y: xCoordYSpring,
              }}
            >
              <NumberFlow
                value={Math.round(smoothPos.x)}
                transformTiming={{ duration: 350 }}
              />
              px
            </motion.span>
            <motion.span
              className="absolute font-mono text-muted-foreground/50 text-nowrap"
              style={{
                x: yCoordXSpring,
                y: yCoordYSpring,
              }}
            >
              <NumberFlow
                value={Math.round(smoothPos.y)}
                transformTiming={{ duration: 350 }}
              />
              px
            </motion.span>

            {/* name + list */}
            <motion.div
              className="absolute flex flex-col text-nowrap gap-10"
              style={{
                x: nameXSpring,
                y: nameYSpring,
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
