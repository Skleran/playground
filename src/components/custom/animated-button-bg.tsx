"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useState } from "react";

const TABS = [
  { name: "Saved Sites" },
  { name: "Collections" },
  { name: "32 Following" },
  { name: "20 Followers" },
];

type Tab = { name: string };

export default function AnimatedButtonBg() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  return (
    <div>
      <ul className="flex gap-4 max-sm:flex-col">
        {TABS.map((tab) => (
          <motion.li
            layout
            className={clsx(
              "relative cursor-pointer px-4 py-2 sm:px-2 sm:py-1 text-sm outline-none transition-colors w-fit",
              activeTab === tab ? "text-primary/80" : "text-primary"
            )}
            tabIndex={0}
            key={tab.name}
            onFocus={() => setActiveTab(tab)}
            onMouseOver={() => setActiveTab(tab)}
            onMouseLeave={() => setActiveTab(tab)}
          >
            {activeTab === tab ? (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg bg-muted"
              />
            ) : null}
            <span className="relative z-10">{tab.name}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
