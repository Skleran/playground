"use client";

import ComponentWrapper from "@/components/custom/component-wrapper";
import React from "react";
import AnimatedLetters from "@/components/custom/animated-letters";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] transition-all duration-400 ease-out max-w-[1400px] mx-auto p-6 grid grid-cols-12 grid-rows-12 overflow-hidden">
        <div className="col-span-12 row-start-1 row-span-9 flex flex-col items-center justify-center">
          <AnimatedLetters text="aaaaaaaa" delay={0} />
          <AnimatedLetters text="aaaaaaaa" delay={0.143} />
          <AnimatedLetters text="aaaaaaaa" delay={0.285} />
          <AnimatedLetters text="aaaaaaaa" delay={0.428} />
          <AnimatedLetters text="aaaaaaaa" delay={0.571} />
          <AnimatedLetters text="aaaaaaaa" delay={0.714} />
          <AnimatedLetters text="aaaaaaaa" delay={0.857} />
          <AnimatedLetters text="aaaaaaaa" delay={1} />
        </div>
        <div className="col-span-12 row-start-10 row-span-3 flex flex-col h-full justify-center font-neue-haas-display">
          <div className="max-w-[33vw] py-4 w-full mx-auto flex">
            <div className="leading-4.5 flex flex-col gap-[1.25vh]">
              <p className="font-bold">
                Neue Haas Grotesk
                <br /> Display
              </p>
              <p>Symbol No. 001</p>
            </div>
            {/* <div className=""></div> */}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
}
