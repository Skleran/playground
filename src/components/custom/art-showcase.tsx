"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ArtShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const imageUrls = useMemo(
    () => [
      "/images/folder-interaction-images/Mistnova_square.avif",
      "/images/folder-interaction-images/Celestials_square.avif",
      "/images/folder-interaction-images/BlueRays_square.avif",
      // "/images/folder-interaction-images/Mistnova_square.avif",
      "/images/folder-interaction-images/SwiftGlow_square.avif",
    ],
    []
  );

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

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div>
        <Carousel setApi={setApi} className="max-w-70 select-none">
          <div className="overflow-hidden rounded-3xl">
            <CarouselContent>
              {imageUrls.map((src, index) => (
                <CarouselItem key={index}>
                  <div>
                    <img
                      src={src}
                      alt={`Art ${index + 1}`}
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
        className="absolute mx-auto max-w-full w-full inset-0 h-full brightness-115 blur-[300px] -z-10"
      />
    </div>
  );
}
