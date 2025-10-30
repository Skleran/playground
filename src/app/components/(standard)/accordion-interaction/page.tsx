import AccordionInteraction from "@/components/custom/accordion-interaction";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.october") + " 2025"}
      title={t("HomePage.accordion_interaction")}
      githubUrl="/"
      subdomain="accordion-interaction"
      className="py-8 sm:py-8"
    >
      <AccordionInteraction />
    </ComponentWrapper>
  );
}
