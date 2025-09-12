"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ViewTransitionContextType = {
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
};

const ViewTransitionContext = createContext<
  ViewTransitionContextType | undefined
>(undefined);

export function ViewTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    // Listen for the end of a view transition
    const handleTransitionEnd = () => {
      // Delay just a tick to make sure animations have fully completed
      requestAnimationFrame(() => {
        setActiveProject(null);
      });
    };

    document.addEventListener("viewtransitionend", handleTransitionEnd);

    return () => {
      document.removeEventListener("viewtransitionend", handleTransitionEnd);
    };
  }, []);

  return (
    <ViewTransitionContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ViewTransitionContext.Provider>
  );
}

export function useViewTransition() {
  const ctx = useContext(ViewTransitionContext);
  if (ctx === undefined) {
    throw new Error(
      "useViewTransition must be used inside ViewTransitionProvider"
    );
  }
  return ctx;
}
