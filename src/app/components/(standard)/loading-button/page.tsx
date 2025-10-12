import ComponentWrapper from "@/components/custom/component-wrapper";
import LoadingButton from "@/components/custom/loading-button";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.loading_button")}
      githubUrl="/"
      subdomain="loading-button"
    >
      <LoadingButton />
    </ComponentWrapper>
  );
}
