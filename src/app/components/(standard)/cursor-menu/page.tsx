import ComponentWrapper from "@/components/custom/component-wrapper";

export default function Page() {
  return (
    <ComponentWrapper>
      <div className="px-6 min-h-[100svh] bg-accent flex items-center justify-center">
        <h1 className="text-4xl font-bold">Page Section 1</h1>
      </div>
      <div className="px-6 min-h-[100svh] bg-accent/80 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Page Section 2</h1>
      </div>
    </ComponentWrapper>
  );
}
