import React from "react";
import Link from "../transition-link";
import { useViewTransition } from "@/utils/useViewTransitionActive";
import { HomeCard } from "./home-card";
import ExperimentalTag from "../custom/experimental-tag";

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
  category,
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
      <HomeCard
        className="relative flex items-center justify-center font-medium"
        style={
          activeProject === subdomain
            ? { viewTransitionName: "component-wrapper" }
            : {}
        }
      >
        {imageUrl && <img src={imageUrl} alt={name} className="h-8 w-8 mr-2" />}

        <span>{name}</span>
        {isExperimental === true ? <ExperimentalTag /> : ""}
        {category && (
          <span className="ml-2 text-xs text-muted">{category}</span>
        )}
      </HomeCard>
    </Link>
  );
}
