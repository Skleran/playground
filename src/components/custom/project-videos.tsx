"use client";

import React from "react";
import { HomeCard } from "@/components/ui/home-card";
import { useTransitionRouter } from "next-view-transitions";

const projects = [
  { id: 1, slug: "test-1", video: "/videos/example2.mp4" },
  { id: 2, slug: "test-2", video: "/videos/example1.mp4" },
  { id: 3, slug: "test-3", video: "/videos/example3.mp4" },
];

export default function ProjectVideos() {
  const router = useTransitionRouter();
  return (
    <div className="w-fit grid sm:grid-cols-2 gap-4 mt-5">
      {" "}
      {projects.map((project, i) => (
        <button
          key={project.id}
          onClick={() => {
            router.push(`/components/view-transitions/${project.slug}`);
          }}
        >
          <div className="max-w-100 flex items-center justify-center font-medium overflow-hidden p-0 m-0 relative aspect-[1.6]">
            <h3
              style={{ viewTransitionName: `project-title-${i}` }}
              className="absolute w-full top-2.5"
            ></h3>
            <div
              style={{ viewTransitionName: `project-desc-${i}` }}
              className="absolute w-full bottom-2.5"
            ></div>
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline={true}
              style={{ viewTransitionName: `project-content-${i}` }}
              className="object-cover object-top size-full aspect-[1.6] rounded-2xl"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
