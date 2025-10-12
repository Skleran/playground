import ComponentWrapper from "@/components/custom/component-wrapper";
import OutlineOrbitButton from "@/components/custom/outline-orbit-button";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.outline_orbit_button")}
      githubUrl="/"
      subdomain="outline-orbit-button"
      // className=""
    >
      <OutlineOrbitButton />
    </ComponentWrapper>
  );
}
