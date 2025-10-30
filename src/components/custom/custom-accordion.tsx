"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const AccordionValueContext = React.createContext<string | undefined>(
  undefined
);

function Accordion({
  className,
  defaultValue,
  onValueChange,
  type = "single",
  collapsible = true,
  ...props
}: AccordionPrimitive.AccordionSingleProps &
  React.RefAttributes<HTMLDivElement>) {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(
    defaultValue
  );

  const handleValueChange = (val: string) => {
    const newActiveValue = val === "" ? undefined : val;
    setActiveValue(newActiveValue);
    onValueChange?.(val);
  };

  return (
    <AccordionValueContext.Provider value={activeValue}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        type={type}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        collapsible={collapsible}
        className={cn("", className)}
        {...props}
      />
    </AccordionValueContext.Provider>
  );
}

function AccordionItem({
  className,
  value,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const activeValue = React.useContext(AccordionValueContext);
  const isAnyItemOpen = activeValue !== undefined;
  const isThisItemOpen = activeValue === value;

  const ref = React.useRef<HTMLDivElement>(null);
  const [isBeforeOpen, setIsBeforeOpen] = React.useState(false);
  const [isAfterOpen, setIsAfterOpen] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(false);
  const [isLast, setIsLast] = React.useState(false);
  const [hasClosedNext, setHasClosedNext] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const accordion = ref.current.parentElement;
    if (!accordion) return;

    const items = Array.from(
      accordion.querySelectorAll('[data-slot="accordion-item"]')
    );
    const currentIndex = items.indexOf(ref.current);

    setIsFirst(currentIndex === 0);
    setIsLast(currentIndex === items.length - 1);

    const nextItem = items[currentIndex + 1];
    setHasClosedNext(
      nextItem ? nextItem.getAttribute("data-state") === "closed" : false
    );

    if (!activeValue) {
      setIsBeforeOpen(false);
      setIsAfterOpen(false);
      return;
    }

    const openItemIndex = items.findIndex(
      (item) => item.getAttribute("data-state") === "open"
    );

    setIsBeforeOpen(openItemIndex !== -1 && currentIndex === openItemIndex - 1);
    setIsAfterOpen(openItemIndex !== -1 && currentIndex === openItemIndex + 1);
  }, [activeValue]);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      value={value}
      className={cn(
        "border-b border transition-all duration-300 px-2",
        "data-[state=open]:my-4 data-[state=open]:rounded-3xl",
        "data-[state=closed]:my-0",

        !isThisItemOpen && hasClosedNext && "border-b-0",

        !isAnyItemOpen && [
          isFirst && "rounded-t-3xl",
          isLast && "rounded-b-3xl",
        ],

        isAnyItemOpen && [
          !isThisItemOpen && isFirst && "rounded-t-3xl",

          !isThisItemOpen && isLast && "rounded-b-3xl",

          isBeforeOpen && "rounded-b-3xl",

          isAfterOpen && "rounded-t-3xl",
        ],
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "hover:cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
