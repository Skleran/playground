"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Reset after a view transition ends
  useEffect(() => {
    const handleTransitionEnd = () => {
      requestAnimationFrame(() => {
        if (pathname === "/") setActiveProject(null);
      });
    };

    document.addEventListener("viewtransitionend", handleTransitionEnd);
    return () =>
      document.removeEventListener("viewtransitionend", handleTransitionEnd);
  }, [pathname]);

  useEffect(() => {
    if (!activeProject || pathname !== "/") return;

    const timeoutId = setTimeout(() => {
      setActiveProject(null);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [activeProject, pathname]);

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
