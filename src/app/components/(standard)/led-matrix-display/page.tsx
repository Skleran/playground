import ComponentWrapper from "@/components/custom/component-wrapper";
import LedTicker from "@/components/custom/led-matrix-display";

import React from "react";

export default function Page() {
  return (
    <ComponentWrapper
      date="September 2025"
      title="LED Matrix Display"
      githubUrl="/"
      subdomain="led-matrix-display"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
      className="flex-col gap-4 sm:gap-8"
    >
      <LedTicker
        text="DISK:12% · CPU:9% · MEMORY:56% · STATUS:OK"
        height={28}
        dotSize={3}
        step={2}
        fps={30}
        // color="#0c0"
        glow={true}
        // offColor="#222"
        dotSpacing={1}
        charSpacing={1}
        glowStrength={3}
      />
      <LedTicker
        text="Welcome to my playground"
        height={42}
        dotSize={5}
        step={10}
        fps={6}
        // color="#0c0"
        glow={true}
        // offColor="#222"
        dotSpacing={1}
        charSpacing={1}
        glowStrength={5}
      />
    </ComponentWrapper>
  );
}
