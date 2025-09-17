"use client";

import ComponentWrapper from "@/components/custom/fullscreen-component-wrapper";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();

  return (
    <ComponentWrapper description={<div className="h-screen"></div>}>
      <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] transition-all duration-400 ease-out max-w-[1400px] mx-auto p-6 grid grid-cols-12 grid-rows-12 font-machina-inktrap overflow-hidden">
        {/* top text */}
        <div className="col-start-1 col-span-12 grid grid-cols-3 grid-rows-1 text-sm font-light tracking-wider overflow-hidden">
          <p className="truncate">New — Free Font</p>
          <p className="text-center truncate">Pangram Pangram® x Baugasm™</p>
          <p className="text-end truncate">↓↓N°19</p>
        </div>

        {/* header - "Neue" */}
        <div className="row-start-2 row-span-1 lg:row-span-3 col-start-1 col-span-12 flex items-start justify-between overflow-hidden">
          <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] xl:-translate-x-4 leading-none font-medium">
            Neue
          </span>

          {/* numbers */}
          <span className="max-lg:hidden flex flex-col gap-1.5 items-end mt-2.5">
            <span className="flex gap-1.5">
              <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                <p className="pt-1.5">2</p>
              </span>
              <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                <p className="pt-1.5">0</p>
              </span>
              <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                <p className="pt-1.5">2</p>
              </span>
              <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                <p className="pt-1.5">5</p>
              </span>
            </span>

            <span className="flex gap-1.5">
              {" "}
              <span className="text-3xl size-12 rounded-full flex items-center justify-center border-3 border-accent-foreground">
                <p className="pt-1.5">0</p>
              </span>
              <span className="text-3xl size-12 rounded-full flex items-center justify-center border-3 border-accent-foreground">
                <p className="pt-1.5">8</p>
              </span>
            </span>
          </span>
        </div>

        {/* header - "Machina" */}
        <div className="row-start-3 lg:row-start-5 row-span-1 lg:row-span-3 col-start-1 col-span-12 flex items-start overflow-hidden">
          <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] xl:-translate-x-4 leading-none font-medium">
            Machina*
          </span>
        </div>

        {/* image */}
        <div className="row-start-5 lg:row-start-8 row-span-8 lg:row-span-5 col-span-12 relative overflow-hidden sm:grid sm:grid-cols-2 sm:gap-12 sm:p-6">
          <Image
            src={
              theme === "light"
                ? "/images/Dreamy-Fabrica.jpeg"
                : "/images/Phantom.jpeg"
            }
            fill
            alt="Phantom image"
            className="object-cover"
          />
          <span className="lg:hidden absoulte flex flex-col justify-between h-full">
            <span className="lg:hidden absoulte flex flex-col gap-1.5 lg:items-end max-lg:scale-85 max-lg:-translate-x-2.5 mt-2.5 z-10">
              <span className="flex gap-1.5">
                <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                  <p className="pt-1.5">2</p>
                </span>
                <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                  <p className="pt-1.5">0</p>
                </span>
                <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                  <p className="pt-1.5">2</p>
                </span>
                <span className="text-3xl bg-accent-foreground size-12 rounded-full flex items-center justify-center text-background">
                  <p className="pt-1.5">5</p>
                </span>
              </span>

              <span className="flex gap-1.5">
                {" "}
                <span className="text-3xl size-12 rounded-full flex items-center justify-center border-3 border-accent-foreground">
                  <p className="pt-1.5">0</p>
                </span>
                <span className="text-3xl size-12 rounded-full flex items-center justify-center border-3 border-accent-foreground">
                  <p className="pt-1.5">8</p>
                </span>
              </span>
            </span>
            <span className="p-4 px-4.5 z-10">
              <p>
                Neue Machina is a powerful and meticulously crafted typeface
                boasting monospace/geometric type features as well as apparent
                and deep ink traps in its heavier weights.
              </p>
              <br />
              <p>
                It is inspired by the aesthetics of robotics and machines — a
                font suited for the future of technology.
              </p>
            </span>
          </span>
          <span className="max-lg:hidden col-start-2 col-span-1 leading-normal pr-10 z-10">
            <p>
              Neue Machina is a powerful and meticulously crafted typeface
              boasting monospace/geometric type features as well as apparent and
              deep ink traps in its heavier weights.
            </p>
            <br />
            <p>
              It is inspired by the aesthetics of robotics and machines <br /> —
              a font suited for the future of technology.
            </p>
            <br />
            <p>
              It was design to be versatile, to blend in your designs in its
              lighter weights or to give them a lot of personality in its
              heavier ones. The font was created in collaboration with artist
              Vasjen Katro / Baugasm™.
            </p>
          </span>
        </div>
      </div>
    </ComponentWrapper>
  );
}
