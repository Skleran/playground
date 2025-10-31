import ComponentWrapper from "@/components/custom/component-wrapper";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/custom/motion-accordion";
import { useTranslations } from "next-intl";

import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <ComponentWrapper
      date={t("Date.october") + " 2025"}
      title={t("HomePage.motion_accordion")}
      githubUrl="/"
      subdomain="motion-accordion"
      className="py-0 sm:py-0 min-h-[450px] max-w-full"
    >
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            It uses Framer Motion for smooth animations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            It uses Framer Motion for smooth animations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            It uses Framer Motion for smooth animations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            It uses Framer Motion for smooth animations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ComponentWrapper>
  );
}
