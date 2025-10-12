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
    >
      <AnimatedButtonBg />
    </ComponentWrapper>
  );
}
