import ArtShowcase from "@/components/custom/art-showcase";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.november") + " 2025"}
      title={t("HomePage.art_showcase")}
      githubUrl="/"
      subdomain="art-showcase"
      className="py-0 sm:py-0 min-h- max-w-full"
    >
      <ArtShowcase />
    </ComponentWrapper>
  );
}
