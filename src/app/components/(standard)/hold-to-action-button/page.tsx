import ComponentWrapper from "@/components/custom/component-wrapper";
import { HoldToActionButton } from "@/components/custom/hold-to-action-button";
import React from "react";

export default function Page() {
  return (
    <ComponentWrapper
      date="August 2025"
      title="Hold To Action Button"
      githubUrl="/"
      subdomain="hold-to-action-button"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
    >
      <HoldToActionButton className="w-50" />
    </ComponentWrapper>
  );
}
