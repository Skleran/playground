"use client";

import NumberFlow from "@number-flow/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";

export default function PersonalInfo() {
  const [timeParts, setTimeParts] = useState({ h: 0, m: 0, s: 0 });
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    []
  );

  const imageSrc = useMemo(
    () =>
      !mounted || resolvedTheme === "dark"
        ? "/me-icon-dark.svg"
        : "/me-icon-light.svg",
    [mounted, resolvedTheme]
  );

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const now = new Date();
      const [h, m, s] = formatter.format(now).split(":").map(Number);

      setTimeParts((prev) => {
        if (prev.h === h && prev.m === m && prev.s === s) {
          return prev;
        }
        return { h, m, s };
      });
    };

    update();
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, [formatter]);

  return (
    <div className="w-full relative">
      <div className="relative w-full h-15 flex items-center justify-between">
        <AnimatePresence>
          {!isOpen && (
            <motion.img
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              src={imageSrc}
              alt=""
              className="size-15"
              draggable={false}
            />
          )}
        </AnimatePresence>
        <Button
          variant={"none"}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="absolute right-0 flex flex-col h-12 w-auto p-0 m-0 items-end gap-0 z-10"
        >
          <span className="tabular-nums font-mono text-base">
            <NumberFlow
              value={timeParts.h}
              format={{ minimumIntegerDigits: 2 }}
            />
            :
            <NumberFlow
              value={timeParts.m}
              format={{ minimumIntegerDigits: 2 }}
            />
            :
            <NumberFlow
              value={timeParts.s}
              format={{ minimumIntegerDigits: 2 }}
            />
          </span>
          <span className="leading-0 text-sm text-end mt-1 text-muted-foreground">
            {t("HomePage.local_time")}
          </span>
        </Button>
      </div>
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            className="absolute h-16 w-full top-1 pr-24"
          >
            <div className="border bg-inherit rounded-xl h-full"></div>
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </div>
  );
}
