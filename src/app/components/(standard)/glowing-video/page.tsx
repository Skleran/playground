"use client";
import FixedReturnButton from "@/components/custom/fixed-return-button";
import React, { useEffect, useRef } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const render = () => {
      if (video.paused || video.ended) return;
      // draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      animationFrame = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      render();
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] p-6 mx-auto overflow-hidden flex items-center justify-center relative">
      <div className="fixed top-8 left-6 lg:left-[calc(50%-470px)]">
        <header className="max-xl:-translate-x-4.5">
          <FixedReturnButton />
        </header>
      </div>

      {/* glowing canvas */}
      <canvas
        ref={canvasRef}
        className="absolute mx-auto max-w-full w-full inset-0 h-full scale-125 blur-[300px] -z-10"
      />
      {/* video */}
      <video
        ref={videoRef}
        src="/videos/example2.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ viewTransitionName: "component-wrapper" }}
        className="rounded-xl shadow-lg relative z-10 max-w-full w-[700px]"
      />
    </div>
  );
}
