import { Button } from "@/components/ui/button";
import { Squircle } from "@squircle-js/react";
import { SquircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] max-w-[700px] px-6 py-[clamp(5rem,20vw,10rem)] mx-auto overflow-hidden grid grid-cols-2 gap-4">
      {/* squircle column - left */}
      <div className="w-full flex flex-col items-center gap-10">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Squircle Elements
        </h2>
        <Squircle asChild cornerSmoothing={1} cornerRadius={12}>
          <Button className="w-full sm:w-2/3" size={"lg"}>
            button
          </Button>
        </Squircle>
        <div className="w-full">
          <p className="text-center pb-3 scroll-m-20 font-semibold tracking-tight">
            Image
          </p>
          <Squircle asChild cornerSmoothing={1} cornerRadius={24}>
            <div className="w-full h-40 relative">
              <Image
                src={"/images/Shadeshifter.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
          </Squircle>
        </div>
        <div className="w-full">
          <Squircle asChild cornerSmoothing={1} cornerRadius={24}>
            <div className="w-full flex bg-accent h-50 rounded-3xl">
              <p className="m-auto">div element</p>
            </div>
          </Squircle>
        </div>
      </div>

      {/* standard column - right */}
      <div className="w-full flex flex-col items-center gap-10">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Standard Elements
        </h2>
        <Button className="w-full sm:w-2/3" size={"lg"}>
          button
        </Button>
        <div className="w-full">
          <p className="text-center pb-3 scroll-m-20 font-semibold tracking-tight">
            Image
          </p>
          <div className="w-full h-40 relative">
            <Image
              src={"/images/Shadeshifter.jpg"}
              fill
              alt=""
              className="object-cover rounded-3xl"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="w-full flex bg-accent h-50 rounded-3xl">
            <p className="m-auto">div element</p>
          </div>
        </div>
      </div>
    </div>
  );
}
