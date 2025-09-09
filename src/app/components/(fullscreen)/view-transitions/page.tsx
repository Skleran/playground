"use client";

import { HomeCard } from "@/components/ui/home-card";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import React from "react";

export default function Page() {
  const router = useTransitionRouter();
  return (
    <div className="max-w-[700px] mx-auto  mt-5 overflow-hidden">
      <button
        onClick={() => {
          router.push("/components/view-transitions/test-1");
        }}
      >
        <HomeCard className="flex items-center justify-center font-medium overflow-hidden p-0 m-0">
          <video
            src="/videos/example2.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ viewTransitionName: "shared-video" }}
            className="object-cover w-full h-full"
          />
        </HomeCard>
      </button>
      <HomeCard />
      <HomeCard />
    </div>
  );
}
