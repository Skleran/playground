import FixedReturnButton from "@/components/custom/fixed-return-button";
import ProjectVideos from "@/components/custom/project-videos";
import React from "react";

export default function Page() {
  return (
    <div className="w-fit px-6 mx-auto">
      <header className="max-xl:pt-5 max-xl:pb-1 max-xl:-translate-x-4.5 xl:fixed top-8 left-6 xl:left-[calc(50%-520px)]">
        <FixedReturnButton />
      </header>
      <ProjectVideos />
    </div>
  );
}
