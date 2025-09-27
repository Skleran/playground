import AnimateHeight from "@/components/custom/animate-height";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.animate_height")}
      githubUrl="/"
      subdomain="animate-height"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
      className="p-0 sm:py-0"
    >
      <AnimateHeight />
    </ComponentWrapper>
  );
}
