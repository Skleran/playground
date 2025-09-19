import React from "react";
import Link from "../transition-link";
import { useViewTransition } from "@/utils/useViewTransitionActive";
import { HomeCard } from "./home-card";
import ExperimentalTag from "../custom/experimental-tag";
import Image from "next/image";

export type ProjectCardProps = {
  name: string;
  subdomain: string;
  imageUrl?: string;
  category?: string;
  isExperimental?: boolean;
};

export default function ProjectCard({
  name,
  subdomain,
  imageUrl,
  // category,
  isExperimental,
}: ProjectCardProps) {
  const { activeProject, setActiveProject } = useViewTransition();
  return (
    <Link
      href={`/components/${subdomain}`}
      className="relative"
      onClick={() => setActiveProject(subdomain)}
    >
      <div
        className="absolute top-3 w-full"
        style={
          activeProject === subdomain
            ? { viewTransitionName: "component-header" }
            : {}
        }
      />
      <div
        className="absolute bottom-3 w-full"
        style={
          activeProject === subdomain
            ? { viewTransitionName: "component-desc" }
            : {}
        }
      />
      {imageUrl === undefined ? (
        <HomeCard
          className="relative flex items-center justify-center font-medium"
          style={
            activeProject === subdomain
              ? { viewTransitionName: "component-wrapper" }
              : {}
          }
        >
          <div className="flex flex-col gap-4 items-center">
            <span>{name}</span>
            {isExperimental === true ? <ExperimentalTag /> : ""}
          </div>
        </HomeCard>
      ) : (
        <HomeCard className="relative flex items-center justify-center font-medium">
          <div className="flex flex-col gap-2 h-full w-full">
            <div className="h-full relative rounded-lg overflow-clip">
              {" "}
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                style={
                  activeProject === subdomain
                    ? { viewTransitionName: "component-wrapper" }
                    : {}
                }
              />
            </div>

            <div className="flex justify-between">
              <div className="font-medium tracking-tight">{name}</div>
              {isExperimental === true ? <ExperimentalTag /> : ""}
            </div>
          </div>
        </HomeCard>
      )}
    </Link>
  );
}
