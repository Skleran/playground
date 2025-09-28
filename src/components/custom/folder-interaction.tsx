"use client";

import { ArrowLeft, CheckCircle, Paperclip, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

const IMAGES = [
  { id: 1, src: "/images/SwiftGlow.jpg" },
  { id: 2, src: "/images/Mistnova.jpeg" },
  { id: 3, src: "/images/BlueRays.jpeg" },
  { id: 4, src: "/images/Celestials.jpeg" },
];

export default function FolderInteraction() {
  const [imagesToSend, setImagesToSend] = useState<string[]>([]);
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [ref, bounds] = useMeasure();

  const imagesToShow = readyToSend
    ? IMAGES.filter((img) => !imagesToSend.includes(img.src))
    : IMAGES;

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        setImagesToSend([]);
        setReadyToSend(false);
        setSent(false);
      }, 1000);
    }
  }, [sent]);

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}>
      <div className="relative h-full flex flex-col items-center justify-center gap-6">
        <motion.div animate={{ height: bounds.height || "auto" }}>
          <div
            ref={ref}
            className="flex flex-col items-center justify-center gap-6"
          >
            <motion.ul
              animate={{
                opacity: sent ? 0 : 1,
                transition: { delay: 0.7, duration: 0.25 },
              }}
              className="grid grid-cols-2 gap-4"
            >
              <AnimatePresence initial={false}>
                {!readyToSend &&
                  imagesToShow.map((img) => {
                    const isSelected = imagesToSend.includes(img.src);

                    return (
                      <motion.li
                        exit={
                          isSelected
                            ? {}
                            : {
                                opacity: 0,
                                filter: "blur(4px)",
                                transition: { duration: 0.17 },
                              }
                        }
                        key={img.id}
                        className="relative flex size-30 rounded-xl overflow-hidden"
                      >
                        <Button
                          onClick={() => {
                            if (isSelected) {
                              setImagesToSend((prev) =>
                                prev.filter((image) => image !== img.src)
                              );
                            } else {
                              setImagesToSend((prev) => [...prev, img.src]);
                            }
                          }}
                          variant={"none"}
                          className="active:scale-98 relative h-full w-full rounded-xl overflow-hidden focus-visible:border-2 p-0"
                        >
                          <motion.div
                            exit={{ opacity: 0, transition: { duration: 0 } }}
                            className="absolute pointer-events-none right-2 bottom-2 flex size-4 items-center justify-center rounded-full border border-white/50 z-1"
                          >
                            {isSelected ? <CheckCircle /> : null}
                          </motion.div>

                          <motion.img
                            layoutId={img.src}
                            src={img.src}
                            alt="image"
                            draggable={false}
                            className="object-cover h-full w-full"
                          />
                        </Button>
                      </motion.li>
                    );
                  })}
              </AnimatePresence>
            </motion.ul>

            {/* send button */}
            <AnimatePresence mode="popLayout" initial={false}>
              {imagesToSend.length > 0 && !readyToSend ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", y: 20 }}
                  className="w-full flex rounded-xl"
                >
                  <div className="flex w-full justify-between gap-1">
                    <Button variant={"secondary"} className="rounded-full">
                      <ArrowLeft /> Back
                    </Button>
                    <motion.div layoutId="button">
                      <Button
                        onClick={() => {
                          if (readyToSend) {
                            setSent(true);
                          } else {
                            setReadyToSend(true);
                          }
                        }}
                        className="text-white bg-special-orange hover:bg-special-orange/85 rounded-full"
                      >
                        <Paperclip /> Attach Images
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {readyToSend ? (
            <motion.div
              animate={{
                x: sent ? 100 : 0,
                opacity: sent ? 0 : 1,
                filter: sent ? "blur(2px)" : "",
              }}
              className="absolute top-1/2 z-10 h-[180px] w-[130px] -translate-y-2/3"
            >
              <motion.div
                initial={{ scale: 1.2, filter: "blur(4px)", opacity: 0 }}
                animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                exit={{ scale: 1.2, filter: "blur(4px)", opacity: 0 }}
                className="absolute left-2"
              >
                <svg
                  width="120"
                  height="180"
                  viewBox="0 0 200 300"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-muted-foreground/80"
                >
                  <path
                    d="
                M 30 20
                Q 20 20 20 30
                L 20 270
                Q 20 280 30 280
                L 170 280
                Q 180 280 180 270
                L 180 30
                Q 180 20 170 20
                Z"
                    stroke="none"
                  />
                </svg>
              </motion.div>

              <motion.div
                animate={{ x: -100 }}
                transition={{ delay: 0.15 }}
                className="absolute flex w-full flex-col-reverse items-center top-1/2 left-5/5"
              >
                {imagesToSend.map((src, index) => (
                  <li key={index} className="flex h-1 items-center gap-2">
                    <motion.img
                      layoutId={src}
                      src={src}
                      // height={100}
                      // width={100}
                      style={{
                        rotate:
                          index % 2 === 0
                            ? 4 * (imagesToSend.length - index + 1)
                            : -1 * (imagesToSend.length - index + 1) * 4,
                      }}
                      className="size-22 object-cover rounded-xl"
                    />
                  </li>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.175, duration: 0 }}
                className="absolute bottom-0"
              >
                <svg
                  width="120"
                  height="180"
                  viewBox="0 0 200 300"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-muted-foreground"
                >
                  <path
                    d="
                M 30 20
                Q 20 20 20 30
                L 20 270
                Q 20 280 30 280
                L 170 280
                Q 180 280 180 270
                L 180 210

                Q 178 195 165 188
                Q 150 180 150 160
                L 150 140
                Q 150 120 165 112
                Q 178 105 180 90

                L 180 30
                Q 180 20 170 20
                Z"
                    stroke="none"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {readyToSend ? (
            <motion.div
              exit={{
                opacity: 0,
                y: 20,
                filter: "blur(4px)",
                transition: { duration: 0.175 },
              }}
              layoutId="button"
              className="absolute bottom-15"
            >
              <Button
                onClick={() => {
                  if (readyToSend) {
                    setSent(true);
                  } else {
                    setReadyToSend(true);
                  }
                }}
                className="text-white bg-special-orange hover:bg-special-orange/85 rounded-full w-40"
              >
                <Send /> Send {imagesToSend.length} images
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
