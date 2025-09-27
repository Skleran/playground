"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { AnimatePresence, motion } from "motion/react";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={"sm"} className="bg-white dark:bg-black" />,
  success: "Login link sent!",
};

type ButtonState = keyof typeof buttonCopy;

export default function LoadingButton() {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  return (
    <div>
      <Button
        className="w-[160px]"
        disabled={buttonState !== "idle"}
        onClick={() => {
          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 1000);

          setTimeout(() => {
            setButtonState("idle");
          }, 3000);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 25, opacity: 0 }}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  );
}
