"use client";

import { motion, animate, AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import FixedReturnButton from "./fixed-return-button";
import { projects } from "@/lib/projects";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";

// basic mobile version - no animations
function ComponentWrapperBasic({
  children,
  description,
  subdomain,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  subdomain: string;
}) {
  const currentIndex = projects.findIndex((p) => p.subdomain === subdomain);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  return (
    <div className="relative h-[100svh] overflow-y-scroll">
      <div className="h-[250px] rounded-b-2xl relative">
        <header className="absolute pt-8 px-1.5">
          <FixedReturnButton />
        </header>
        <div className="flex w-full absolute justify-between bottom-10 px-6">
          {prevProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-start px-0 group gap-1.5"
            >
              <Link href={`/components/${prevProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Previous
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {prevProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-end px-0 group gap-1.5"
            >
              <Link href={`/components/${nextProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Next
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {nextProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>

      <div className="relative shadow-xl overflow-hidden">{children}</div>

      <div className="h-[200px] mx-6 sm:mx-6 rounded-t-2xl flex items-center justify-center text-muted-foreground relative">
        <div className="text-center px-4">
          {/* <p className="mb-2">⬇ Next / Prev / Home</p> */}
          {description && (
            <div className="text-sm text-muted-foreground/80 max-w-md">
              {/* {description} */}
            </div>
          )}
        </div>
        <div className="flex w-full absolute justify-between bottom-15">
          {prevProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-start px-0 group gap-1.5"
            >
              <Link href={`/components/${prevProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Previous
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {prevProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-end px-0 group gap-1.5"
            >
              <Link href={`/components/${nextProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Next
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {nextProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

// animated desktop version
function ComponentWrapperAnimated({
  children,
  // description,
  subdomain,
}: {
  children: React.ReactNode;
  // description?: React.ReactNode;
  subdomain: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isSnapping = useRef(false);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const rafRef = useRef<number | null>(null);
  const topBottomSectionHeight = 250;
  const currentIndex = projects.findIndex((p) => p.subdomain === subdomain);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const dimensionsCache = useRef({
    containerHeight: 0,
    topHeight: 0,
    middleHeight: 0,
    bottomHeight: 0,
    lastUpdate: 0,
  });

  const [topVisibility, setTopVisibility] = useState(0);
  const [bottomVisibility, setBottomVisibility] = useState(0);

  const getDimensions = useCallback(() => {
    const container = ref.current;
    if (!container) return dimensionsCache.current;

    const now = performance.now();
    if (now - dimensionsCache.current.lastUpdate < 100) {
      return dimensionsCache.current;
    }

    const topSection = container.children[0] as HTMLElement;
    const middleSection = container.children[1] as HTMLElement;
    const bottomSection = container.children[2] as HTMLElement;

    dimensionsCache.current = {
      containerHeight: container.clientHeight,
      topHeight: topSection.offsetHeight,
      middleHeight: middleSection.offsetHeight,
      bottomHeight: bottomSection.offsetHeight,
      lastUpdate: now,
    };

    return dimensionsCache.current;
  }, []);

  const updateEffectIntensities = useCallback(
    (scrollTop: number) => {
      const { containerHeight, topHeight, middleHeight, bottomHeight } =
        getDimensions();

      // top effect
      const topEffectIntensity =
        scrollTop <= topBottomSectionHeight
          ? Math.max(
              0,
              Math.min(
                1,
                (topBottomSectionHeight - scrollTop) / topBottomSectionHeight
              )
            )
          : 0;

      // bottom effect
      const totalScrollableHeight =
        topHeight + middleHeight + bottomHeight - containerHeight;
      const distanceFromBottom = totalScrollableHeight - scrollTop;
      const bottomEffectIntensity =
        distanceFromBottom <= topBottomSectionHeight
          ? Math.max(
              0,
              Math.min(
                1,
                (topBottomSectionHeight - distanceFromBottom) /
                  topBottomSectionHeight
              )
            )
          : 0;

      setTopVisibility((prev) =>
        Math.abs(prev - topEffectIntensity) > 0.015 ? topEffectIntensity : prev
      );
      setBottomVisibility((prev) =>
        Math.abs(prev - bottomEffectIntensity) > 0.015
          ? bottomEffectIntensity
          : prev
      );
    },
    [getDimensions, topBottomSectionHeight]
  );

  const scheduleUpdateEffectIntensities = useCallback(
    (scrollTop: number) => {
      if (rafRef.current != null) return;

      rafRef.current = requestAnimationFrame(() => {
        updateEffectIntensities(scrollTop);
        rafRef.current = null;
      });
    },
    [updateEffectIntensities]
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let debounceTimeout: NodeJS.Timeout | null = null;

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

    const handleScroll = () => {
      const scrollTop = container.scrollTop;

      if (animationRef.current) {
        return;
      }

      scheduleUpdateEffectIntensities(scrollTop);

      if (isSnapping.current) return;

      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const { containerHeight, topHeight, middleHeight, bottomHeight } =
          getDimensions();

        // top zone
        if (scrollTop > 0 && scrollTop < topHeight) {
          const ratio = scrollTop / topHeight;
          if (ratio > 0.05 && ratio < 0.95) {
            isSnapping.current = true;
            cancelRunningAnimation();
            animationRef.current = animate(
              scrollTop,
              ratio > 0.5 ? topHeight : 0,
              {
                duration: 0.5,
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
          if (ratio > 0.05 && ratio < 0.95) {
            isSnapping.current = true;
            cancelRunningAnimation();
            animationRef.current = animate(
              scrollTop,
              ratio > 0.5
                ? topHeight + middleHeight + bottomHeight - containerHeight
                : topHeight + middleHeight - containerHeight,
              {
                duration: 0.5,
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
      }, 80);
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

    const handleResize = () => {
      dimensionsCache.current.lastUpdate = 0;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", onUserInterrupt);
      container.removeEventListener("touchstart", onUserInterrupt);
      container.removeEventListener("pointerdown", onUserInterrupt);
      window.removeEventListener("resize", handleResize);
      if (debounceTimeout) clearTimeout(debounceTimeout);
      if (animationRef.current) {
        try {
          animationRef.current.stop();
        } catch {}
        animationRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdateEffectIntensities, getDimensions, topBottomSectionHeight]);

  const effectIntensity = Math.max(topVisibility, bottomVisibility);
  const borderRadius = effectIntensity * 32;
  const brightness = 1 - effectIntensity * 0.15;

  return (
    <div ref={ref} className="relative h-[100svh] overflow-y-scroll">
      <motion.div
        className="h-[250px] flex items-center justify-center mx-6 relative border-1 border-t-0 border-muted-foreground/10 dark:border-muted-foreground/16 bg-accent dark:bg-accent/15"
        animate={{
          borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
          opacity: topVisibility * 0.7 + 0.3,
          boxShadow: topVisibility
            ? `0 10px 30px rgba(0,0,0,${topVisibility * 0.1})`
            : "0 0px 0px rgba(0,0,0,0)",
          scale: topVisibility * 0.1 + 0.9,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <header className="absolute top-10 left-[calc(50%-520px)]">
          <FixedReturnButton />
        </header>
        <div className="flex w-full max-w-[700px] mx-auto justify-between mt-20">
          {prevProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-start px-0 group gap-1.5"
            >
              <Link href={`/components/${prevProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Previous
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {prevProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-end px-0 group gap-1.5"
            >
              <Link href={`/components/${nextProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Next
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {nextProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </motion.div>

      <motion.div
        className="relative overflow-hidden"
        animate={{
          borderRadius: `${borderRadius}px`,
          filter: `brightness(${brightness})`,
          boxShadow: `0 0 30px rgba(0,0,0,${brightness * 0.1}`,
          scale: 1 - (topVisibility * 0.025 + bottomVisibility * 0.025),
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <motion.div
        className="h-[250px] flex items-center justify-center mx-6 relative border-1 border-b-0 border-muted-foreground/10 dark:border-muted-foreground/16 bg-accent dark:bg-accent/15"
        animate={{
          borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
          opacity: bottomVisibility * 0.7 + 0.3,
          boxShadow: bottomVisibility
            ? `0 -10px 30px rgba(0,0,0,${bottomVisibility * 0.1})`
            : "0 0px 0px rgba(0,0,0,0)",
          scale: bottomVisibility * 0.1 + 0.9,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="text-center px-4">
          {/* {description && (
            <motion.div
              className="text-sm text-muted-foreground/80 max-w-md"
              animate={{
                opacity: bottomVisibility > 0.3 ? 1 : 0.6,
              }}
              transition={{ duration: 0.2 }}
            >
              {description}
            </motion.div>
          )} */}
        </div>
        <div className="flex w-full max-w-[700px] mx-auto justify-between mt-20">
          {prevProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-start px-0 group gap-1.5"
            >
              <Link href={`/components/${prevProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Previous
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {prevProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Button
              asChild
              variant={"none"}
              className="flex flex-col items-end px-0 group gap-1.5"
            >
              <Link href={`/components/${nextProject.subdomain}`}>
                <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                  Next
                </p>
                <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                  {nextProject.name}
                </p>
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// detect screen size
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return isDesktop;
}

// main wrapper component that chooses between versions
export default function ComponentWrapper({
  children,
  description,
  subdomain,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  subdomain: string;
}) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <ComponentWrapperAnimated
        //  description={description}
        subdomain={subdomain}
      >
        {children}
      </ComponentWrapperAnimated>
    );
  }

  return (
    <ComponentWrapperBasic description={description} subdomain={subdomain}>
      {children}
    </ComponentWrapperBasic>
  );
}
