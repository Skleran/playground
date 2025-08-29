import ComponentWrapper from "@/components/custom/component-wrapper";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="px-12 py-14 min-h-[100svh] bg-[#e94b1d] text-[#f2f2f2] flex items-start">
        <h1 className="text-[9rem] leading-30 tracking-tight font-machina font-black">
          Page Section 0
        </h1>
      </div>
      <div className="px-16 py-14 min-h-[100svh] bg-[#c2fe0c] text-[#1d1d1d] flex items-end justify-end">
        <h1 className="text-[9rem] leading-32 tracking-tight font-machina-inktrap font-black ">
          Page <br /> Section 1
        </h1>
      </div>
    </ComponentWrapper>
  );
}
