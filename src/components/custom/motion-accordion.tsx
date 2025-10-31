"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
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

  React.useEffect(() => {
    if (!ref.current) return;

    const accordion = ref.current.parentElement;
    if (!accordion) return;

    const items = Array.from(
      accordion.querySelectorAll('[data-slot="accordion-item-wrapper"]')
    );
    const currentIndex = items.indexOf(ref.current);

    setIsFirst(currentIndex === 0);
    setIsLast(currentIndex === items.length - 1);

    if (!activeValue) {
      setIsBeforeOpen(false);
      setIsAfterOpen(false);
      return;
    }

    const openItemIndex = items.findIndex(
      (item) =>
        item
          .querySelector('[data-slot="accordion-item"]')
          ?.getAttribute("data-state") === "open"
    );

    setIsBeforeOpen(openItemIndex !== -1 && currentIndex === openItemIndex - 1);
    setIsAfterOpen(openItemIndex !== -1 && currentIndex === openItemIndex + 1);
  }, [activeValue]);

  return (
    <motion.div
      ref={ref}
      data-slot="accordion-item-wrapper"
      animate={{
        marginTop: isThisItemOpen ? 16 : 0,
        marginBottom: isThisItemOpen ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.8,
      }}
    >
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        value={value}
        {...props}
        className={cn(
          "ring-b ease-in-out px-3 overflow-hidden relative will-change-transform transition-all bg-[#f1f1f1] dark:bg-accent hover:bg-[#e6e6e6] dark:hover:bg-[#313131]",
          "data-[state=open]:rounded-3xl",

          !isAnyItemOpen && isFirst && "rounded-t-3xl",
          !isAnyItemOpen && isLast && "rounded-b-3xl",

          isAnyItemOpen && !isThisItemOpen && isFirst && "rounded-t-3xl",
          isAnyItemOpen && !isThisItemOpen && isLast && "rounded-b-3xl",
          isAnyItemOpen && isBeforeOpen && "rounded-b-3xl",
          isAnyItemOpen && isAfterOpen && "rounded-t-3xl",

          className
        )}
      />
    </motion.div>
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
          "group hover:cursor-pointer focus-visible:ring-ring flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50", // <-- 1. ADD 'group' HERE
          className
        )}
        {...props}
      >
        {children}

        <div className="flex-shrink-0">
          <ChevronDownIcon
            className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" // <-- 3. ADDED CLASSES HERE
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
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
      transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
      className="overflow-hidden"
    >
      <div ref={measureRef}>
        <div ref={contentRef}>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ ease: easeOut, duration: 0.2 }}
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
