import UserBox from "@/components/custom/animated-user-box";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.july") + " 2025"}
      title={t("HomePage.animated_user_box")}
      githubUrl="/"
      subdomain="animated-user-box"
    >
      <UserBox />
    </ComponentWrapper>
  );
}
