// import Image from "next/image";

import ChangeThemeTabs from "@/components/custom/theme-selector";
import { HomeCard } from "@/components/ui/home-card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto overflow-x-hidden px-6 py-18 sm:py-22 text-neutral-800 dark:text-neutral-100">
      <main>
        <div className="text-[22px] font-medium tracking-tight text-primary w-full pb-3 flex flex-row justify-between">
          <h1>Hey, I'm Erdem</h1>
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
