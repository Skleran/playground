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
      className=""
    >
      <DynamicIsland />
    </ComponentWrapper>
  );
}
