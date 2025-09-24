import AnimatedButtonBg from "@/components/custom/animated-button-bg";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.animated_button_bg")}
      githubUrl="/"
      subdomain="animated-button-bg"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
    >
      <AnimatedButtonBg />
    </ComponentWrapper>
  );
}
