import ComponentWrapper from "@/components/custom/component-wrapper";
import { HoldToActionButton } from "@/components/custom/hold-to-action-button";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.august") + " 2025"}
      title={t("HomePage.hold_to_action_button")}
      githubUrl="/"
      subdomain="hold-to-action-button"
    >
      <HoldToActionButton className="w-50" />
    </ComponentWrapper>
  );
}
