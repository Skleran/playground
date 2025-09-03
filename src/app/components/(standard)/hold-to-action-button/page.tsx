import { HoldToActionButton } from "@/components/custom/hold-to-action-button";
import React from "react";

export default function Page() {
  return (
    <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] max-w-[700px] p-6 mx-auto overflow-hidden flex items-center justify-center">
      <HoldToActionButton className="w-50" />
    </div>
  );
}
