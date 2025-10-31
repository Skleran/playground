import ComponentWrapper from "@/components/custom/component-wrapper";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/custom/motion-accordion";
import { Accessibility, Cog, Rocket, Shield, Sparkles } from "lucide-react";
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
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full max-w-90 mx-auto"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-blue-500" />
              Is it accessible?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Absolutely. All components follow WAI-ARIA accessibility guidelines
            and are keyboard navigable by default.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Cog className="w-5 h-5 text-amber-500" />
              How does it work?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            The accordion leverages Framer Motion for smooth open/close
            transitions and Radix UI primitives for state handling.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-emerald-500" />
              Is it performant?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Yes — animations are GPU-accelerated and only active when visible,
            ensuring minimal performance impact.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Is it secure?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            The component never exposes internal state or DOM mutations
            directly. Security best practices are followed throughout.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Can I customize it?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Definitely. You can style it using Tailwind, replace icons, or
            modify animation parameters for a unique look and feel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ComponentWrapper>
  );
}
