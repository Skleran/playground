import ComponentWrapper from "@/components/custom/component-wrapper";
import FolderInteraction from "@/components/custom/folder-interaction";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.folder_interaction")}
      githubUrl="/"
      subdomain="folder-interaction"
      className="p-0 sm:p-0 h-[400px] w-full flex items-center justify-center"
    >
      <FolderInteraction />
    </ComponentWrapper>
  );
}
