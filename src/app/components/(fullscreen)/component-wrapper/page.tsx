import ComponentWrapper from "@/components/custom/fullscreen-component-wrapper";
import React from "react";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="p-5 lg:px-11 lg:py-0 grid grid-cols-12 grid-rows-4 min-h-[100svh] bg-special-orange text-[#f2f2f2]">
        <h1 className="text-[clamp(2rem,12vw,9rem)] max-sm:leading-[12vw] col-span-10 sm:text-nowrap tracking-tight font-machina font-black">
          Page <span className="text-nowrap">Section 0</span>
        </h1>
        <p className="row-start-2 row-span-2 lg:row-start-3 text-end col-start-4 col-span-10 lg:col-start-9 lg:col-span-4 text-lg font-[500] lg:text-xl lg:leading-relaxed">
          Component wrapper, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Molestiae libero facere nobis, dicta maiores molestias facilis
          placeat! Iste explicabo eveniet sapiente nisi facilis sint. Eius
          provident rem eaque amet. Quidem sapiente delectus quo rerum
          doloremque esse debitis, laudantium velit? Quaerat necessitatibus
          ipsum optio unde sapiente debitis voluptatum ex repellendus modi.
        </p>
      </div>
      <div className="p-5 lg:px-12 min-h-[100svh] bg-special-blue text-[#f2f2f2] flex flex-col gap-[clamp(1rem,50vw,20rem)] items-end justify-end">
        <div className="w-full">
          {" "}
          <p className="w-[clamp(1rem,64vw,45rem)] text-lg font-[500] lg:text-xl lg:leading-relaxed">
            Component wrapper, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Molestiae libero facere nobis, dicta maiores
            molestias facilis placeat! Iste explicabo eveniet sapiente nisi
            facilis sint. Eius provident rem eaque amet. Quidem sapiente
            delectus quo rerum doloremque esse debitis, laudantium velit?
            Quaerat necessitatibus ipsum optio unde sapiente debitis voluptatum
            ex repellendus modi.
          </p>
        </div>

        <h1 className="text-[clamp(2rem,12vw,9rem)] max-lg:leading-[12vw] lg:leading-32 col-span-10 sm:text-nowrap tracking-tight font-machina-inktrap font-black ">
          Page <br /> Section 1
        </h1>
      </div>
    </ComponentWrapper>
  );
}
