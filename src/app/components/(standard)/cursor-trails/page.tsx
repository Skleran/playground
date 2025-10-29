import ComponentWrapper from "@/components/custom/component-wrapper";
import CursorTrails from "@/components/custom/cursor-trails";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.october") + " 2025"}
      title={t("HomePage.drag_gesture")}
      githubUrl="/"
      subdomain="cursor-trails"
      className="w-full h-full px-0 py-0 sm:py-0"
    >
      <CursorTrails />
    </ComponentWrapper>
  );
}
