"use client";

// import Image from "next/image";

// import ExperimentalTag from "@/components/custom/experimental-tag";
import ChangeThemeTabs from "@/components/custom/theme-selector";
import Link, { useScrollRestoration } from "@/components/transition-link";
import { HomeCard } from "@/components/ui/home-card";
import { useViewTransition } from "@/utils/useViewTransitionActive";
import ProjectCard, { ProjectCardProps } from "@/components/ui/project-card";
// import { useTransitionRouter } from "next-view-transitions";
// import Link from "next/link";
// import { Link } from "next-view-transitions";

export default function Home() {
  useScrollRestoration();
  const { activeProject, setActiveProject } = useViewTransition();

  const projects: ProjectCardProps[] = [
    {
      name: "View Transitions",
      subdomain: "view-transitions",
      isExperimental: true,
    },
    {
      name: "Glowing Video",
      subdomain: "glowing-video",
      isExperimental: false,
    },
    {
      name: "Squircle UI Elements",
      subdomain: "squircles",
      isExperimental: true,
    },
    {
      name: "Animated Glass Navbar",
      subdomain: "animated-glass-navbar",
      isExperimental: true,
    },
    {
      name: "Animated User Box",
      subdomain: "animated-user-box",
      isExperimental: false,
    },
    {
      name: "Animated Navbar",
      subdomain: "animated-navbar",
      isExperimental: false,
    },
    {
      name: "Hold To Action Button",
      subdomain: "hold-to-action-button",
      isExperimental: false,
    },
    {
      name: "The End is Never",
      subdomain: "the-end-is-never",
      isExperimental: false,
    },
    {
      name: "Table of Contents Alt",
      subdomain: "table-of-contents-alt",
      isExperimental: false,
    },
    {
      name: "Table of Contents",
      subdomain: "table-of-contents",
      isExperimental: false,
    },
    {
      name: "Neue Haas Design",
      subdomain: "neue-haas-design",
      isExperimental: false,
    },
    {
      name: "Neue Machina Design",
      subdomain: "neue-machina-design",
      isExperimental: false,
    },
    {
      name: "Cursor Tracking Menu",
      subdomain: "cursor-menu",
      isExperimental: false,
    },
    {
      name: "Component Wrapper",
      subdomain: "component-wrapper",
      isExperimental: false,
    },
  ];

  return (
    <div className="max-w-[700px] mx-auto overflow-x-hidden px-6 py-18 sm:py-22 text-neutral-800 dark:text-neutral-100">
      <main>
        <div className="text-[22px] font-medium tracking-tight text-primary w-full pb-3 flex flex-row justify-between">
          <h1>
            Hey, I'm{" "}
            <span
              style={
                activeProject === null ? {} : { viewTransitionName: "name" }
              }
              className="relative"
            >
              {" "}
              <div
                role="none"
                className="invisible absolute top-1/2 right-full"
                style={{ viewTransitionName: "back-arrow" }}
              />
              Erdem
            </span>
          </h1>
          <ChangeThemeTabs animationKey="theme" key={"theme"} />
        </div>
        <div className="text-neutral-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          cupiditate saepe architecto doloribus voluptatibus officiis, sint,
          obcaecati incidunt possimus quisquam sequi dolores, voluptatum
          eligendi assumenda.
        </div>
        <div className="mt-26">
          <p className="font-medium tracking-tight">Projects</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                name={project.name}
                subdomain={project.subdomain}
                isExperimental={project.isExperimental}
              />
            ))}
          </div>
        </div>
        <div className="mt-26">
          <p className="font-medium tracking-tight">Work</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
            <HomeCard />
            <HomeCard />
          </div>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
