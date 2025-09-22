import ComponentWrapper from "@/components/custom/component-wrapper";
import DynamicIsland from "@/components/custom/dynamic-island";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.dynamic_island")}
      githubUrl="/"
      subdomain="dynamic-island"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
      className=""
    >
      <DynamicIsland />
    </ComponentWrapper>
  );
}
