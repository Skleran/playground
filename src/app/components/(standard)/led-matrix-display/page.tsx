import ComponentWrapper from "@/components/custom/component-wrapper";
import LedTicker from "@/components/custom/led-matrix-display";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.led_matrix_display")}
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
