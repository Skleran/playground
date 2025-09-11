"use client";

// import Image from "next/image";

import ExperimentalTag from "@/components/custom/experimental-tag";
import ChangeThemeTabs from "@/components/custom/theme-selector";
import Link, { useScrollRestoration } from "@/components/transition-link";
import { HomeCard } from "@/components/ui/home-card";
// import { useTransitionRouter } from "next-view-transitions";
// import Link from "next/link";
// import { Link } from "next-view-transitions";

export default function Home() {
  useScrollRestoration();

  return (
    <div className="max-w-[700px] mx-auto overflow-x-hidden px-6 py-18 sm:py-22 text-neutral-800 dark:text-neutral-100">
      <main>
        <div className="text-[22px] font-medium tracking-tight text-primary w-full pb-3 flex flex-row justify-between">
          <h1>
            Hey, I'm{" "}
            <span style={{ viewTransitionName: "name" }} className="relative">
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
            <Link href={"/components/view-transitions"}>
              <HomeCard className="flex items-center gap-3 justify-center font-medium">
                View Transitions
                <ExperimentalTag />
              </HomeCard>{" "}
            </Link>

            <Link
              href={"/components/glowing-video"}
              className="relative flex w-full items-center justify-center"
            >
              <span
                className="absolute w-full h-full"
                style={{ viewTransitionName: "glowing-video" }}
              />
              <HomeCard className="w-full flex items-center justify-center font-medium">
                Glowing Video
              </HomeCard>{" "}
            </Link>

            <Link href="/components/squircles">
              <HomeCard className="flex items-center gap-3 justify-center font-medium">
                Squircle UI Elements
                <ExperimentalTag />
              </HomeCard>{" "}
            </Link>

            <Link href="/components/animated-glass-navbar">
              <HomeCard className="flex items-center gap-3 justify-center font-medium">
                Animated Glass Navbar
                <ExperimentalTag />
              </HomeCard>{" "}
            </Link>

            <Link href="/components/animated-user-box">
              <HomeCard
                className="flex items-center justify-center font-medium"
                style={{ viewTransitionName: "component-wrapper" }}
              >
                Animated User Box
              </HomeCard>{" "}
            </Link>

            <Link href="/components/animated-navbar">
              <HomeCard className="flex items-center justify-center font-medium">
                Animated Navbar
              </HomeCard>{" "}
            </Link>

            <Link href="/components/hold-to-action-button">
              <HomeCard className="flex items-center justify-center font-medium">
                Hold to Action Button
              </HomeCard>{" "}
            </Link>

            <Link href="/components/the-end-is-never">
              <HomeCard className="flex items-center justify-center font-medium">
                The End is Never
              </HomeCard>{" "}
            </Link>

            <Link href="/components/table-of-contents-alt">
              <HomeCard className="flex items-center justify-center font-medium">
                Table of Contents Alt
              </HomeCard>{" "}
            </Link>

            <Link href="/components/table-of-contents">
              <HomeCard className="flex items-center justify-center font-medium">
                Table of Contents
              </HomeCard>{" "}
            </Link>

            <Link href="/components/neue-haas-design">
              <HomeCard className="flex items-center justify-center font-medium">
                Neue Haas Design
              </HomeCard>{" "}
            </Link>

            <Link href="/components/neue-machina-design">
              <HomeCard className="flex items-center justify-center font-medium">
                Neue Machina Design
              </HomeCard>{" "}
            </Link>

            <Link href="/components/cursor-menu">
              <HomeCard className="flex items-center justify-center font-medium">
                Cursor Tracking Menu
              </HomeCard>{" "}
            </Link>

            <Link href="/components/component-wrapper">
              <HomeCard className="flex items-center justify-center font-medium">
                Component Wrapper
              </HomeCard>
            </Link>
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
