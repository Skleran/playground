"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

const AccordionValueContext = React.createContext<string | undefined>(
  undefined
);

interface AccordionProps
  extends Omit<AccordionPrimitive.AccordionSingleProps, "type"> {
  type?: "single";
  collapsible?: boolean;
}

function Accordion({
  className,
  defaultValue,
  onValueChange,
  type = "single",
  collapsible = true,
  ...props
}: AccordionProps) {
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
        "ring-b ring transition-all duration-400 ease-in-out px-3 w-90 overflow-hidden relative will-change-transform",
        "data-[state=open]:my-4 data-[state=open]:rounded-3xl data-[state=open]:bg-accent-foreground/15 data-[state=open]:hover:bg-accent-foreground/20",
        "data-[state=closed]:my-0  data-[state=closed]:bg-accent data-[state=closed]:hover:bg-accent-foreground/20",

        !isThisItemOpen && hasClosedNext && "ring-b-0",

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
          "hover:cursor-pointer focus-visible:ring-ring flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <div className="[&[data-state=open]>svg]:rotate-180">
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
}: // ...props
React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const [measureRef, bounds] = useMeasure();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const element = contentRef.current?.closest('[data-slot="accordion-item"]');
    if (!element) return;

    const observer = new MutationObserver(() => {
      setIsOpen(element.getAttribute("data-state") === "open");
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });
    setIsOpen(element.getAttribute("data-state") === "open");

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ height: isOpen ? bounds.height || "auto" : 0 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0.35 }}
      className="overflow-hidden"
    >
      <div ref={measureRef}>
        <div ref={contentRef}>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 0, filter: "blur(3px)" }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                data-slot="accordion-content"
                className={cn("text-sm", className)}
              >
                <div className="pt-0 pb-4">{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
