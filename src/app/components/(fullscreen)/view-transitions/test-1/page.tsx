"use client";

import React from "react";

export default function Page() {
  return (
    <div className="max-w-[1000px] mx-auto mt-5 overflow-hidden">
      <video
        src="/videos/example2.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ viewTransitionName: "shared-video" }}
        className="object-cover w-full h-full col-span-2 rounded-2xl"
      />
    </div>
  );
}
