// import Image from "next/image";

import ChangeThemeTabs from "@/components/custom/theme-selector";
import { HomeCard } from "@/components/ui/home-card";

export default function Home() {
  return (
    <div className="max-w-[700px] mx-auto overflow-x-hidden px-6 py-18 sm:py-22 text-neutral-800 dark:text-neutral-100">
      <main>
        <div className="text-[22px] font-medium tracking-tight text-primary w-full pb-3 flex flex-row justify-between">
          <h1>Hey👋, I'm Erdem</h1>
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
            <a href="/components/cursor-menu">
              <HomeCard />
            </a>

            <HomeCard />
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
