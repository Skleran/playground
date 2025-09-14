import UserBox from "@/components/custom/animated-user-box";
import ComponentWrapper from "@/components/custom/component-wrapper";
import React from "react";

export default function Page() {
  return (
    <ComponentWrapper
      date="June 2025"
      title="Animated User Box"
      githubUrl="/"
      description={
        <>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          nobis ab officia! Eveniet unde dolorem facilis nisi expedita?
          Voluptas, nobis?
        </>
      }
    >
      <UserBox />
    </ComponentWrapper>
  );
}
