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

export default function ArtShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageUrls = artworksData.map((art) => art.imageSrc);
  const currentArtwork = artworksData[currentSlide];

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
      const h = 280;
      canvas.width = h;
      canvas.height = h;

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div>
        <div className="mb-2 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                // to-do: rotation according to scroll direction
                key={currentArtwork.id + "-avatar"}
                initial={{ rotate: -90, filter: "blur(3px)", opacity: 0 }}
                animate={{ rotate: 0, filter: "blur(0px)", opacity: 1 }}
                exit={{ rotate: 90, filter: "blur(3px)", opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              >
                <Avatar className="size-6 select-none">
                  <AvatarImage src={currentArtwork.avatarSrc} />
                  <AvatarFallback>
                    {currentArtwork.painterName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentArtwork.id + "-name"}
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
                className="text-xs font-semibold text-nowrap"
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

        <Carousel setApi={setApi} className="max-w-70 select-none">
          <div className="overflow-hidden rounded-3xl">
            <CarouselContent>
              {artworksData.map((artwork, _) => (
                <CarouselItem key={artwork.id}>
                  <div>
                    <img
                      src={artwork.imageSrc}
                      alt={`Artwork by ${artwork.painterName}`}
                      className="h-70 object-cover rounded-3xl select-none"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselPrevious className="bg-primary/5 border border-primary/20 hover:bg-primary/7 opacity-90 hover:opacity-100 hidden sm:flex" />
          <CarouselNext className="bg-primary/5 border border-primary/20 hover:bg-primary/7 opacity-90 hover:opacity-100 hidden sm:flex" />
        </Carousel>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute mx-auto max-w-full w-full inset-0 h-full brightness-115 blur-[200px] -z-10"
      />
    </div>
  );
}
