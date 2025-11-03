"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { artworksData } from "@/lib/artworksData";
import useMeasure from "react-use-measure";
import NextImage from "next/image";

export default function ArtShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageUrls = artworksData.map((art) => art.imageSrc);
  const currentArtwork = artworksData[currentSlide];
  const [liveDirection, setLiveDirection] = useState(1);
  const [carouselHeight, setCarouselHeight] = useState<number | "auto">("auto");
  const [measureRef, bounds] = useMeasure();

  // 2. Preload all images for smooth drawing
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    });
  }, [imageUrls]);

  // 3. Set up the animation loop (FIXED)
  useEffect(() => {
    if (!api || !imagesLoaded || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    let animationFrame: number;
    let slideWidth = 0;
    let slideGap = 0;

    // Helper to get the real slide dimensions from embla
    const updateDimensions = () => {
      // FIX 2: Use slideNodes() for wider compatibility
      const slideNodes = api.slideNodes();
      if (slideNodes.length === 0) return;

      // Manually get the DOMRects
      const slideRects = slideNodes.map((node) => node.getBoundingClientRect());

      // Set canvas drawing buffer size to match one slide
      // The images have `h-70` (280px) and are square
      // const h = 280;
      // canvas.width = h;
      // canvas.height = h;

      // Get dimensions from our manually-created rects
      slideWidth = slideRects[0].width;
      slideGap =
        slideRects.length > 1 ? slideRects[1].left - slideRects[0].right : 0;
    };

    // Main render loop
    const render = () => {
      if (slideWidth === 0) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      // FIX 1: Change api.translate.get() to api.translate().get()
      const scrollX = api.internalEngine().location.get();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all images, translated by the carousel's scroll
      images.forEach((img, index) => {
        const totalSlideWidth = slideWidth + slideGap;
        const drawX = index * totalSlideWidth + scrollX;

        // Culling: Only draw images that are visible on the canvas
        if (drawX + slideWidth < 0 || drawX > canvas.width) {
          return;
        }

        ctx.drawImage(img, drawX, 0, slideWidth, canvas.height);
      });

      animationFrame = requestAnimationFrame(render);
    };

    // Start listeners and loop
    updateDimensions();
    render();

    api.on("reInit", updateDimensions);
    api.on("resize", updateDimensions);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      api.off("reInit", updateDimensions);
      api.off("resize", updateDimensions);
    };
  }, [api, imagesLoaded]);

  // scroll direction handler
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    const onScroll = () => {
      const engine = api.internalEngine();
      const currentPos = engine.location.get();
      const targetPos = engine.target.get();

      if (currentPos === targetPos) return;

      const newDirection = targetPos > currentPos ? 1 : -1;

      setLiveDirection(newDirection);
    };

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("scroll", onScroll);
    api.on("select", onSelect);

    return () => {
      api.off("scroll", onScroll);
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    // We only want to set the height if it's a valid number
    if (bounds.height > 0) {
      setCarouselHeight(bounds.height);
    }
  }, [bounds.height, currentSlide]);

  return (
    <div className="h-full w-full flex items-start justify-center overflow-hidden pt-3 pb-5">
      <motion.div
        initial={{ opacity: 0, filter: "blur(3px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        // todo: may need to play with values
        transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
      >
        <div className="mb-2 sm:mb-2.5 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 relative">
            {/* removed poplayout and made absolute to animate it wherever it is */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentArtwork.id + "-avatar"}
                initial={{
                  rotate: 90 * liveDirection,
                  filter: "blur(3px)",
                  opacity: 0,
                }}
                animate={{ rotate: 0, filter: "blur(0px)", opacity: 1 }}
                exit={{
                  rotate: -90 * liveDirection,
                  filter: "blur(3px)",
                  opacity: 0,
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                className="absolute"
              >
                <Avatar className="size-6 sm:size-7 select-none">
                  <AvatarImage src={currentArtwork.avatarSrc} />
                  <AvatarFallback>
                    {currentArtwork.painterName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                key={currentArtwork.id + "-name"}
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
                className="text-xs font-semibold text-nowrap absolute ml-8 sm:ml-9"
              >
                {currentArtwork.painterName}
              </motion.div>
            </AnimatePresence>
          </div>
          <div>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        <Carousel setApi={setApi} className="max-w-70 md:max-w-80 select-none">
          <motion.div
            animate={{ height: carouselHeight }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="overflow-hidden rounded-3xl"
          >
            <CarouselContent>
              {artworksData.map((artwork, index) => {
                const isActive = index === currentSlide;
                return (
                  <CarouselItem key={artwork.id}>
                    <motion.div
                      animate={{ height: bounds.height || "auto" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        ref={isActive ? measureRef : null}
                        className="relative"
                      >
                        <NextImage
                          draggable="false"
                          width={500}
                          height={500}
                          src={artwork.imageSrc}
                          alt={`Artwork by ${artwork.painterName}`}
                          className="w-70 md:w-80 rounded-3xl select-none"
                        />
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </motion.div>
          <CarouselPrevious
            onClick={() => {
              setLiveDirection(1);
              api?.scrollPrev();
            }}
            className="bg-primary/5 border border-primary/20 hover:bg-primary/7 opacity-90 hover:opacity-100 hidden sm:flex"
          />
          <CarouselNext
            onClick={() => {
              setLiveDirection(-1);
              api?.scrollNext();
            }}
            className="bg-primary/5 border border-primary/20 hover:bg-primary/7 opacity-90 hover:opacity-100 hidden sm:flex"
          />
        </Carousel>
      </motion.div>

      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // todo: may need to play with values
        transition={{ duration: 2, ease: "easeOut", delay: 0.7 }}
        className="absolute mx-auto max-w-full w-full inset-0 h-full brightness-140 dark:brightness-115 blur-[120px] dark:blur-[200px] -z-10"
      />
    </div>
  );
}
