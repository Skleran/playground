import ComponentWrapper from "@/components/custom/component-wrapper";
import MultistepDialog from "@/components/custom/multistep-dialog";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.multistep_dialog")}
      githubUrl="/"
      subdomain="multistep-dialog"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
      className="px-2 py-4 sm:px-4 sm:py-2 min-h-110"
    >
      <MultistepDialog />
    </ComponentWrapper>
  );
}
