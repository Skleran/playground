import ComponentWrapper from "@/components/custom/component-wrapper";
import React from "react";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] transition-all duration-400 ease-out max-w-[1400px] mx-auto p-6 grid grid-cols-12 grid-rows-12 overflow-hidden"></div>
    </ComponentWrapper>
  );
}
