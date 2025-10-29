"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CursorTrails() {
  const gridRef = useRef<HTMLDivElement>(null);

  const currentlyHoveredRef = useRef<HTMLElement | null>(null);

  const [cols, setCols] = useState(18);
  const rows = 10;

  useEffect(() => {
    const mobileCols = window.innerWidth < 768 ? 10 : 18;
    setCols(mobileCols);
  }, []);

  // build the grid and add event listeners
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const total = rows * cols;
    grid.innerHTML = Array.from({ length: total })
      .map(() => {
        const grade = Math.floor(Math.random() * 12 - 6);
        const opacity = Math.random() * 0.3 + 0.4;
        const hue = Math.floor(Math.random() * 70 + 250);
        const svg = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24" height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        `;
        return `
          <div
            class="plus-symbol p-1"
            style="--grade:${grade}; --hue:${hue}; opacity:${opacity}; color:hsl(${hue} 80% 50%);"
          >
            ${svg}
          </div>
        `;
      })
      .join("");

    grid.style.setProperty("--cols", cols.toString());
    grid.style.setProperty("--rows", rows.toString());

    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      const newElement = document.elementFromPoint(clientX, clientY);

      const newTarget = (newElement as HTMLElement)?.closest<HTMLElement>(
        ".plus-symbol"
      );
      const oldTarget = currentlyHoveredRef.current;

      if (newTarget === oldTarget) return;

      if (oldTarget) {
        oldTarget.removeAttribute("data-hover");
      }

      if (newTarget) {
        newTarget.setAttribute("data-hover", "true");
      }

      currentlyHoveredRef.current = newTarget;
    };

    const handlePointerLeave = () => {
      if (currentlyHoveredRef.current) {
        currentlyHoveredRef.current.removeAttribute("data-hover");
        currentlyHoveredRef.current = null;
      }
    };

    grid.addEventListener("pointermove", handlePointerMove);
    grid.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      grid.removeEventListener("pointermove", handlePointerMove);
      grid.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [cols]);

  return (
    <div className="flex flex-col items-start justify-center p-8">
      <div
        ref={gridRef}
        className="grid touch-none cursor-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      />
    </div>
  );
}
