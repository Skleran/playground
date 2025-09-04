import UserBox from "@/components/custom/animated-user-box";
import React from "react";

export default function Page() {
  return (
    <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] mx-auto max-w-7xl p-6 pt-4 flex flex-col items-center justify-center overflow-hidden">
      <UserBox />
    </div>
  );
}
