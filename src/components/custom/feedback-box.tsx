"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "../ui/spinner";
import { CheckCircle } from "lucide-react";

export default function FeedbackBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setIsOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key == "Enter" &&
        isOpen &&
        formState === "idle"
      )
        submit();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, formState]);

  return (
    <div className="flex w-full h-[400px] items-center justify-center">
      <motion.button
        layoutId="wrapper"
        onClick={() => {
          setIsOpen(true);
          setFormState("idle");
          setFeedback("");
        }}
        key={"button"}
        className="px-3 py-2 bg-background border border-muted-foreground/20 dark:bg-accent text-primary dark:text-primary rounded-lg relative items-center outline-none hover:cursor-pointer"
      >
        <motion.span layoutId="title" className="block">
          Feedback
        </motion.span>
      </motion.button>
      <AnimatePresence mode="popLayout">
        {isOpen ? (
          <motion.div
            layoutId="wrapper"
            className="h-50 w-80 rounded-xl p-1.5 gap-2 bg-neutral-200 dark:bg-accent shadow-xs absolute overflow-hidden flex"
          >
            <motion.span
              aria-hidden
              layoutId="title"
              className="absolute left-4.5 top-4.5 text-primary/50 dark:text-muted-foreground"
              data-feedback={feedback ? "true" : "false"}
            >
              Feedback
            </motion.span>
            <AnimatePresence mode="popLayout">
              {formState === "success" ? (
                <motion.div
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  key="success"
                  className="w-full h-full flex flex-col items-center justify-center bg-background dark:bg-accent rounded-lg"
                >
                  <CheckCircle className="stroke-special-orange" />
                  <h3 className="font-semibold mb-2 mt-1">
                    Feedback received!
                  </h3>
                  <p className="text-center text-sm">Thanks for helping me.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  className="h-full w-full bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-3"
                >
                  <textarea
                    required
                    autoFocus
                    name="textarea"
                    onChange={(e) => setFeedback(e.target.value)}
                    className="h-30 w-full resize-none outline-none text-base"
                  />
                  <div className="absolute w-full border-t-2 left-0 border-neutral-200 dark:border-accent border-dashed bottom-14" />
                  <div className="w-full ml-2 mt-2 flex justify-end">
                    <button
                      className="px-3 py-2 bg-special-orange rounded-lg w-[140px] text-white text-sm relative overflow-hidden transition-transform hover:cursor-pointer active:scale-97"
                      type="submit"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={formState}
                          transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                          }}
                          initial={{ y: -25, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 25, opacity: 0 }}
                        >
                          {formState === "loading" ? (
                            <Spinner size={"sm"} className="bg-white mx-auto" />
                          ) : (
                            <span>Send feedback</span>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
