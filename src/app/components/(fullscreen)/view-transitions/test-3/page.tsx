"use client";

import React from "react";

export default function Page() {
  return (
    <div className="max-w-[1000px] mx-auto mt-5 p-6 overflow-hidden ">
      <h3
        style={{ viewTransitionName: "project-title-2" }}
        className="flex items-start z-0 text-3xl font-bold pb-10"
      >
        Title of The Project 2
      </h3>
      <video
        src="/videos/example3.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ viewTransitionName: "project-content-2" }}
        className="object-cover object-top size-full aspect-[1.6] rounded-2xl"
      />
      <div
        style={{ viewTransitionName: "project-desc-2" }}
        className="w-full bottom-2.5 pt-10"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
        ratione dolore, quibusdam nisi quasi vel tempore adipisci quo atque
        consequuntur doloremque, necessitatibus corporis nihil unde autem a
        magnam quos aliquam non!
      </div>
    </div>
  );
}
