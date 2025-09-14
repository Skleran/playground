"use client";

import ComponentWrapper from "@/components/custom/fullscreen-component-wrapper";
import React from "react";
import AnimatedLetters from "@/components/custom/animated-letters";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="bg-special-orange text-neutral-100">
        <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] transition-all duration-400 ease-out max-w-[1400px] mx-auto p-6 md:pt-[clamp(0.1rem,3vw,3rem)] grid grid-cols-12 grid-rows-12 overflow-hidden">
          <div className="col-span-12 row-start-1 row-span-9 flex flex-col items-center justify-center">
            {/* <AnimatedLetters text="aaaaaaaa" delay={0} />
            <AnimatedLetters text="aaaaaaaa" delay={0.171} />
            <AnimatedLetters text="aaaaaaaa" delay={0.342} />
            <AnimatedLetters text="aaaaaaaa" delay={0.514} /> faster animation
            <AnimatedLetters text="aaaaaaaa" delay={0.685} />
            <AnimatedLetters text="aaaaaaaa" delay={0.857} />
            <AnimatedLetters text="aaaaaaaa" delay={1.028} />
            <AnimatedLetters text="aaaaaaaa" delay={1.2} /> */}
            <AnimatedLetters text="aaaaaaaa" delay={0} />
            <AnimatedLetters text="aaaaaaaa" delay={0.328} />
            <AnimatedLetters text="aaaaaaaa" delay={0.657} />
            <AnimatedLetters text="aaaaaaaa" delay={0.985} />
            <AnimatedLetters text="aaaaaaaa" delay={1.314} />
            <AnimatedLetters text="aaaaaaaa" delay={1.642} />
            <AnimatedLetters text="aaaaaaaa" delay={1.971} />
            <AnimatedLetters text="aaaaaaaa" delay={2.3} />
          </div>
          <div className="col-span-12 row-start-10 row-span-3 flex flex-col h-full lg:justify-center font-neue-haas-display">
            <div className="max-w-[82vw] sm:max-w-[62vw] md:max-w-[53vw] lg:max-w-[clamp(1rem,33vw,41rem)] py-4 w-full mx-auto flex justify-between text-[2.7vw] leading-[2.7vw] sm:text-[1.7vw] sm:leading-[1.7vw] md:text-[1.6vw] md:leading-[1.6vw] lg:text-[clamp(0.1rem,0.9vw,1.2rem)] lg:leading-[clamp(0.1rem,0.9vw,1.2rem)] ">
              <div className="flex flex-col justify-between">
                <p className="font-bold">
                  Neue Haas Grotesk
                  <br /> Display
                </p>
                <p>Symbol No. 001</p>
              </div>
              <div className="pr-[clamp(0.1rem,4vw,5rem)] ">
                <span className="font-[150] ">Ultra Thin 15 </span>
                <span className="font-[250] ">Thin 25</span>
                <br />
                <span className="font-[350] ">Extra Light 35 </span>
                <span className="font-[450] ">Light45</span>
                <br />
                <span className="font-[550] ">Roman 55 </span>
                <span className="font-[650] ">Medium 65</span>
                <br />
                <span className="font-[750] ">Bold 75 </span>
                <span className="font-[950] ">Black 95</span>
              </div>
              <div>
                <div className="font-[450] ">Typeface by</div>
                <div className="font-[750]">Max A. Miedinger</div>
                <div className="font-[450]">Revived by</div>
                <div className="font-[750]">Christian Schwartz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
