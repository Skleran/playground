import ComponentWrapper from "@/components/custom/component-wrapper";
import FeedbackBox from "@/components/custom/feedback-box";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.feedback_box")}
      githubUrl="/"
      subdomain="feedback-box"
      className="p-0 sm:p-0 h-full w-full flex items-center justify-center"
    >
      <FeedbackBox />
    </ComponentWrapper>
  );
}
