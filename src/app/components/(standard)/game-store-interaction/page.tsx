import ComponentWrapper from "@/components/custom/component-wrapper";
import GameStoreInteraction from "@/components/custom/game-store-interaction";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title={t("HomePage.game_store_interaction")}
      githubUrl="/"
      subdomain="game-store-interaction"
      className=""
    >
      <GameStoreInteraction />
    </ComponentWrapper>
  );
}
