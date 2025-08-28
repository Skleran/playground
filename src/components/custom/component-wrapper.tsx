"use client";

import { motion, animate, AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ComponentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isSnapping = useRef(false);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const rafRef = useRef<number | null>(null);
  const topBottomSectionHeight = 250;

  const [topVisibility, setTopVisibility] = useState(0);
  const [bottomVisibility, setBottomVisibility] = useState(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let debounceTimeout: NodeJS.Timeout | null = null;

    const scheduleUpdateEffectIntensities = (scrollTop: number) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateEffectIntensities(scrollTop);
        rafRef.current = null;
      });
    };

    const updateEffectIntensities = (scrollTop: number) => {
      const containerHeight = container.clientHeight;
      const topSection = container.children[0] as HTMLElement;
      const middleSection = container.children[1] as HTMLElement;
      const bottomSection = container.children[2] as HTMLElement;

      const topHeight = topSection.offsetHeight;
      const middleHeight = middleSection.offsetHeight;
      const bottomHeight = bottomSection.offsetHeight;

      // top effect
      let topEffectIntensity = 0;
      if (scrollTop <= topBottomSectionHeight) {
        topEffectIntensity =
          (topBottomSectionHeight - scrollTop) / topBottomSectionHeight;
        topEffectIntensity = Math.max(0, Math.min(1, topEffectIntensity));
      }

      // bottom effect
      const totalScrollableHeight =
        topHeight + middleHeight + bottomHeight - containerHeight;
      const distanceFromBottom = totalScrollableHeight - scrollTop;
      let bottomEffectIntensity = 0;
      if (distanceFromBottom <= topBottomSectionHeight) {
        bottomEffectIntensity =
          (topBottomSectionHeight - distanceFromBottom) /
          topBottomSectionHeight;
        bottomEffectIntensity = Math.max(0, Math.min(1, bottomEffectIntensity));
      }

      // update on change
      setTopVisibility((prev) =>
        Math.abs(prev - topEffectIntensity) > 0.01 ? topEffectIntensity : prev
      );
      setBottomVisibility((prev) =>
        Math.abs(prev - bottomEffectIntensity) > 0.01
          ? bottomEffectIntensity
          : prev
      );
    };

    // page entry animation
    animationRef.current = animate(0, topBottomSectionHeight, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        container.scrollTop = v;
        scheduleUpdateEffectIntensities(v);
      },
      onComplete: () => {
        animationRef.current = null;
      },
    });

    // cancel animation helper
    const cancelRunningAnimation = () => {
      if (animationRef.current) {
        try {
          animationRef.current.stop();
        } catch {
          /* ignore */
        }
        animationRef.current = null;
        isSnapping.current = false;
      }
    };

    // cancel animation on user scroll
    const onUserInterrupt = () => {
      cancelRunningAnimation();
      // clear debounce to avoid snapping right away
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
        debounceTimeout = null;
      }
    };

    // core scroll handler
    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      if (animationRef.current) {
        return;
      }

      scheduleUpdateEffectIntensities(scrollTop);

      if (isSnapping.current) return;

      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const containerHeight = container.clientHeight;
        const topSection = container.children[0] as HTMLElement;
        const middleSection = container.children[1] as HTMLElement;
        const bottomSection = container.children[2] as HTMLElement;

        const topHeight = topSection.offsetHeight;
        const middleHeight = middleSection.offsetHeight;
        const bottomHeight = bottomSection.offsetHeight;

        // top zone
        if (scrollTop > 0 && scrollTop < topHeight) {
          const ratio = scrollTop / topHeight;
          if (ratio > 0 && ratio < 1) {
            isSnapping.current = true;
            // start animation and store ref
            cancelRunningAnimation();
            animationRef.current = animate(
              container.scrollTop,
              ratio > 0.5 ? topHeight : 0,
              {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                onUpdate: (v) => {
                  container.scrollTop = v;
                  scheduleUpdateEffectIntensities(v);
                },
                onComplete: () => {
                  isSnapping.current = false;
                  animationRef.current = null;
                },
              }
            );
          }
          return;
        }

        // bottom zone
        const bottomStart = topHeight + middleHeight - containerHeight;
        if (scrollTop > bottomStart) {
          const bottomVisible = scrollTop - bottomStart;
          const ratio = bottomVisible / bottomHeight;
          if (ratio > 0 && ratio < 1) {
            isSnapping.current = true;
            cancelRunningAnimation();
            animationRef.current = animate(
              container.scrollTop,
              ratio > 0.5
                ? topHeight + middleHeight + bottomHeight - containerHeight
                : topHeight + middleHeight - containerHeight,
              {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                onUpdate: (v) => {
                  container.scrollTop = v;
                  scheduleUpdateEffectIntensities(v);
                },
                onComplete: () => {
                  isSnapping.current = false;
                  animationRef.current = null;
                },
              }
            );
          }
          return;
        }
      }, 120);
    };

    // listen for user scroll
    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", onUserInterrupt, { passive: true });
    container.addEventListener("touchstart", onUserInterrupt, {
      passive: true,
    });
    container.addEventListener("pointerdown", onUserInterrupt, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", onUserInterrupt);
      container.removeEventListener("touchstart", onUserInterrupt);
      container.removeEventListener("pointerdown", onUserInterrupt);
      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (animationRef.current) {
        try {
          animationRef.current.stop();
        } catch {}
        animationRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // visual effect values
  const effectIntensity = Math.max(topVisibility, bottomVisibility);
  const scale = 1 - effectIntensity * 0.05;
  const borderRadius = effectIntensity * 32;
  const brightness = 1 - effectIntensity * 0.15;

  return (
    <div
      ref={ref}
      className="relative bg-background h-[100svh] overflow-y-scroll"
    >
      <motion.div
        className="h-[250px] bg-accent rounded-b-2xl flex items-center justify-center text-muted-foreground"
        animate={{
          scale: topVisibility * 0.1 + 0.9,
          borderRadius: 32 - topVisibility * 32,
          opacity: topVisibility * 0.7 + 0.3,
          y: (1 - topVisibility) * -20,
          boxShadow: topVisibility
            ? `0 10px 30px rgba(0,0,0,${topVisibility * 0.15})`
            : undefined,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <p>⬆ Top navigation / info ({Math.round(topVisibility * 100)}%)</p>
      </motion.div>

      <motion.div
        className="relative shadow-xl overflow-hidden"
        animate={{
          scale,
          borderRadius: `${borderRadius}px`,
          filter: `brightness(${brightness})`,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <motion.div
        className="h-[250px] bg-accent mx-2.5 sm:mx-6 rounded-t-2xl flex items-center justify-center text-muted-foreground"
        animate={{
          scale: bottomVisibility * 0.1 + 0.9,
          // borderRadius: 32 - bottomVisibility * 32,
          opacity: bottomVisibility * 0.7 + 0.3,
          y: (1 - bottomVisibility) * 20,
          boxShadow: bottomVisibility
            ? `0 -10px 30px rgba(0,0,0,${bottomVisibility * 0.15})`
            : undefined,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <p>⬇ Next / Prev / Home ({Math.round(bottomVisibility * 100)}%)</p>
      </motion.div>
    </div>
  );
}
