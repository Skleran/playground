"use client";

import NumberFlow from "@number-flow/react";
import React, { useState, useEffect, useRef } from "react";
import { ProgressiveBlur } from "../ui/progressive-blur";

interface HeaderItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface ScrollProgressTrackerProps {
  children: React.ReactNode;
}

export const ScrollProgressTracker: React.FC<ScrollProgressTrackerProps> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [progressView, setProgressView] = useState<"numeric" | "circular">(
    "numeric"
  );
  const [contentSize, setContentSize] = useState({ width: 190, height: 44 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const generateId = (text: string, index: number): string =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `heading-${index}`;

  // scan for headers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scanHeaders = () => {
      const headingElements = container.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      const headerItems: HeaderItem[] = [];
      headingElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const text = htmlElement.textContent || "";
        const level = parseInt(htmlElement.tagName.charAt(1));
        let id = htmlElement.id;
        if (!id) {
          id = generateId(text, index);
          htmlElement.id = id;
        }
        headerItems.push({ id, text, level, element: htmlElement });
      });
      setHeaders(headerItems);
    };

    scanHeaders();
    const observer = new MutationObserver(scanHeaders);
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, []);

  // scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }
      const currentProgress = Math.min(
        Math.max((scrollTop / totalScrollable) * 100, 0),
        100
      );
      setProgress(Math.round(currentProgress));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // estimate size when closed
  useEffect(() => {
    if (headers.length > 0 && !isOpen) {
      const baseWidth = 190;
      const baseHeight = 44;
      const maxTextLength = Math.max(...headers.map((h) => h.text.length));
      const estimatedWidth = Math.max(baseWidth, maxTextLength * 8 + 80);
      const estimatedHeight = Math.max(baseHeight, headers.length * 40 + 60);
      setContentSize({
        width: Math.min(estimatedWidth, 400),
        height: Math.min(estimatedHeight, 500),
      });
    }
  }, [headers, isOpen]);

  // close toc if background scrolls
  useEffect(() => {
    if (!isOpen) return;
    const closeOnScroll = () => setIsOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [isOpen]);

  // gradient scroll indicators
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowTopGradient(el.scrollTop > 0);
      setShowBottomGradient(el.scrollHeight > el.clientHeight + el.scrollTop);
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleLinkClick = (headerId: string) => {
    const element = document.getElementById(headerId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* popover */}
      <div
        className={`fixed bottom-12 bg-accent left-1/2 -translate-x-1/2 z-40 flex flex-col-reverse rounded-3xl overflow-hidden transition-all duration-300`}
        style={{
          width: isOpen ? `clamp(1rem,90vw,350px)` : "190px",
          height: isOpen ? `clamp(1rem,${contentSize.height}px,400px)` : "44px",
          boxShadow: isOpen
            ? "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)"
            : "0 4px 12px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {(isOpen || headers.length > 0) && (
          <div
            ref={contentRef}
            className="relative flex flex-col flex-1 no-scrollbar overflow-y-scroll"
          >
            {/* scrollable toc */}
            <div
              className="flex-1 flex flex-col px-3 transition-all duration-300"
              style={{
                paddingTop: "1rem",
                paddingBottom: "3.5rem",
              }}
            >
              {headers.length > 0 ? (
                <div className="space-y-0">
                  {headers.map((header) => (
                    <div key={header.id} className="relative group">
                      <button
                        onClick={() => handleLinkClick(header.id)}
                        className="text-left py-3 px-3 -mx-3 text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-all duration-200 bg-transparent border-0 cursor-pointer rounded-xl hover:bg-foreground/5 focus:bg-foreground/5 group text-nowrap active:scale-95"
                        style={{
                          marginLeft: `${(header.level - 0.8) * 0.8}rem`,
                          width: `clamp(1rem,320px - ${
                            (header.level - 0.8) * 0.8
                          }rem,80vw)`,
                          fontSize:
                            header.level === 1
                              ? "0.95rem"
                              : header.level === 2
                              ? "0.9rem"
                              : "0.85rem",
                          fontWeight: header.level === 1 ? "500" : "400",
                        }}
                      >
                        <span className="leading-tight truncate w-70">
                          {header.text}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm px-3 py-6">
                  No headers found
                </p>
              )}
            </div>

            {/* gradient */}
            {showTopGradient && (
              <>
                {" "}
                <div
                  className={`fixed top-0 h-16 w-[348px] bg-gradient-to-b from-accent to-transparent z-59 pointer-events-none`}
                />
                <ProgressiveBlur
                  className="pointer-events-none fixed top-0 h-16 z-60 w-[348px]"
                  direction="top"
                  blurIntensity={0.2}
                />
              </>
            )}
            {showBottomGradient && (
              <>
                {" "}
                <div
                  className={`fixed bottom-0 h-10 w-[348px] bg-gradient-to-t from-accent to-transparent z-60 pointer-events-none`}
                />
                <ProgressiveBlur
                  className="pointer-events-none fixed bottom-11 h-16 z-60 w-[348px]"
                  direction="bottom"
                  blurIntensity={0.2}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`fixed bottom-12 left-1/2 bg-accent text-primary -translate-x-1/2 z-50 rounded-full transition-all duration-300 ease-out active:scale-95 ${
          isOpen ? "mb-2" : "mb-0"
        }`}
        style={{
          width: isOpen ? `clamp(1rem,85vw,336px)` : "190px",
          height: "44px",
          boxShadow: isOpen
            ? "0 20px 40px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex items-center gap-2 px-2 pr-1 w-full">
          {/* progress bar icon */}
          <div
            className="cursor-pointer flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setProgressView(
                progressView === "numeric" ? "circular" : "numeric"
              );
            }}
          >
            {progressView === "numeric" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <mask
                  id="mask-bg"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="2"
                  width="24"
                  height="20"
                >
                  <path
                    d="M3 6.75L19.0541 6.75L21.027 6.75H23.0135L23 3.5L1 3.5L1 12L23 12L23.0135 21L1 21L1 17.25L13 17.25"
                    strokeWidth="2.5"
                    className="stroke-muted-foreground"
                  />
                </mask>
                <g mask="url(#mask-bg)">
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    className="fill-muted-foreground"
                  />
                </g>
                <mask
                  id="mask-progress"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="2"
                  width="24"
                  height="20"
                >
                  <path
                    d="M3 6.75L19.0541 6.75L21.027 6.75H23.0135L23 3.5L1 3.5L1 12L23 12L23.0135 21L1 21L1 17.25L13 17.25"
                    strokeWidth="2.5"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - progress}
                    style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
                    className="stroke-white"
                  />
                </mask>
                <g mask="url(#mask-progress)">
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    fill="var(--foreground)"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                className="text-muted-foreground"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - progress / 100)}
                  style={{
                    transition: "stroke-dashoffset 0.3s ease-out",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>
            )}
          </div>
          <span className="flex-1 flex items-center text-left gap-1">
            <span>Index</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-4 h-4 stroke-accent-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </span>

          <span className="bg-muted-foreground/10 backdrop-blur-sm px-2.5 py-2.5 rounded-full text-xs font-mono transition-all duration-200">
            <NumberFlow
              value={progress}
              transformTiming={{ duration: 150, easing: "ease-out" }}
              spinTiming={{ duration: 750, easing: "ease-out" }}
              opacityTiming={{ duration: 350, easing: "ease-out" }}
            />
            %
          </span>
        </div>
      </button>

      {/* backdrop */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: isOpen ? "blur(8px)" : "blur(0px)",
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* content */}
      <div ref={containerRef}>{children}</div>
    </>
  );
};
