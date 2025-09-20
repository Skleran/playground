"use client";

import {
  Bookmark,
  Layout,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { easeOut, motion, Variants, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// import SignOut from "../sign-out";
// import { useQuery } from "convex-helpers/react/cache/hooks";
// import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import type { Transition } from "framer-motion";
// import ListLayoutSelector from "./list-layout-selector";
import { useTranslations } from "next-intl";
import ChangeThemeTabs from "./theme-selector";
// import LocaleSelectBox from "./locale-select-box";

export default function UserBox() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openedWithKeyboard, setOpenedWithKeyboard] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [toolboxPosition, setToolboxPosition] = useState({ top: 0, left: 0 });
  const t = useTranslations();

  const iconRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const motionDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // const user = useQuery(api.users.currentUser, {});

  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    if (isExpanded && openedWithKeyboard) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [isExpanded, openedWithKeyboard]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        iconRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = Array.from(
          containerRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) || []
        ).filter(
          (el) =>
            !el.hasAttribute("tabindex") || el.getAttribute("tabindex") !== "-1"
        ) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const currentIndex = focusableElements.indexOf(
          document.activeElement as HTMLElement
        );

        if (e.shiftKey) {
          if (document.activeElement === firstElement || currentIndex === -1) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement || currentIndex === -1) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleClose = useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false);
      iconRef.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isExpanded
      ) {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
      }
    };

    const handleScroll = () => {
      if (isExpanded) {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isExpanded, handleClose]);

  // if (user === null) return null;

  const boxVariants: Variants = {
    initial: {
      width: "150px",
      height: "250px",
      zIndex: -1,
      borderRadius: "9px",
      padding: "0px",
      overflow: "hidden",
      opacity: 0,
    },
    expanded: {
      width: "200px",
      height: "250px",
      zIndex: 3,
      borderRadius: "20px",
      padding: "4px",
      opacity: 1,
    },
  };

  const innerBoxVariants: Variants = {
    initial: {
      scale: 0.9,
      y: "-20px",
      filter: "blur(5px)",
    },
    expanded: {
      scale: 1,
      y: "0px",
      filter: "blur(0px)",
    },
  };

  const backdropVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    bounce: 0.24,
    damping: 10,
    mass: 1,
    ease: easeOut,
  };

  const linearTransition: Transition = {
    duration: 0.15,
    ease: "easeOut",
  };
  const backdropTransition: Transition = { duration: 0.2, ease: "easeInOut" };

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const wasKeyboard = "key" in e ? e.key === "Enter" || e.key === " " : false;

    if (!isExpanded && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setToolboxPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });

      setOpenedWithKeyboard(wasKeyboard);
      setShouldRender(true);
      setTimeout(() => setIsExpanded(true), 10);
    } else {
      setIsExpanded(false);
      if (wasKeyboard) {
        iconRef.current?.focus();
      }
    }
  };

  const renderBackdrop = () => {
    if (!hasMounted) return null;

    return createPortal(
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-9"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={backdropTransition}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <>
      {/* <div className=" absolute border shadow-xs border-neutral-300/50 dark:border-accent bg-neutral-200/50 dark:bg-secondary w-2/3 max-w-[400px] h-15 flex justify-end p-4 px-2.5 rounded-full"></div> */}
      <Button
        ref={iconRef}
        variant="ghost"
        size="icon"
        className={`hover:cursor-pointer transition-all h-10 w-10 rounded-full relative -m-1.5 mr-[0px]`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick(e);
          }
        }}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-label="User menu"
      >
        <div className="relative size-9.5">
          <Image
            src={"/images/profile-picture.png"}
            alt="user profile image"
            width={38}
            height={38}
            draggable={false}
            className={`rounded-full absolute inset-0 m-auto size-9.5 transition-opacity duration-400 z-1 ${
              isExpanded ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </Button>

      {renderBackdrop()}

      {hasMounted &&
        shouldRender &&
        createPortal(
          <div
            ref={containerRef}
            className="z-10"
            style={{
              position: "absolute",
              top: toolboxPosition.top,
              right: toolboxPosition.left,
            }}
            role="menu"
            aria-label="User menu"
          >
            <motion.div
              animate={isExpanded ? "expanded" : "initial"}
              initial="initial"
              variants={boxVariants}
              transition={isExpanded ? springTransition : linearTransition}
              onAnimationComplete={(definition) => {
                if (definition === "initial") {
                  setShouldRender(false);
                }
              }}
              className={` bg-card z-auto ${
                isExpanded ? "border" : "border-transparent"
              }`}
            >
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                className={`hover:cursor-pointer transition-all h-10 w-10 rounded-full relative ${
                  isExpanded
                    ? "hover:bg-accent opacity-100"
                    : "-m-1.5 bg-transparent opacity-0"
                }`}
                onClick={handleClose}
                aria-label="Close menu"
                tabIndex={isExpanded ? 0 : -1}
              >
                <X className="size-5" />
              </Button>

              <motion.div
                ref={motionDivRef}
                animate={isExpanded ? "expanded" : "initial"}
                initial="initial"
                variants={innerBoxVariants}
                transition={isExpanded ? springTransition : linearTransition}
                className={`w-full h-[calc(100%-40px)] rounded-2xl p-2 flex flex-col items-center justify-between overflow-hidden bg-accent-foreground/5`}
              >
                <Button
                  className="w-full rounded-t-xl flex items-center justify-center"
                  size={"lg"}
                >
                  <Layout />
                  {t("UserBox.dashboard")}
                  {/* Dashboard */}
                </Button>
                <Button
                  className="w-full flex items-center justify-center"
                  size={"lg"}
                >
                  <Settings />
                  {/* Settings */}
                  {t("UserBox.settings")}
                </Button>
                <Button
                  className="w-full flex items-center justify-center rounded-b-xl"
                  size={"lg"}
                >
                  <Bookmark />
                  {/* Saved */}
                  {t("UserBox.bookmarks")}
                </Button>
                <div className="w-full border-t " />
                <Button
                  className="w-full flex items-center justify-center rounded-full"
                  size={"lg"}
                  variant={"destructive"}
                >
                  <LogOut className="stroke-3" />
                  {/* <p>Log Out</p> */}
                  {t("UserBox.log_out")}
                </Button>
                {/* <SignOut /> */}
              </motion.div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}
