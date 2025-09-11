"use client";

import { Link as TransitionLink } from "next-view-transitions";
import { useEffect } from "react";

export default function Link({
  href,
  children,
  ...props
}: React.ComponentProps<typeof TransitionLink>) {
  return (
    <TransitionLink
      {...props}
      href={href}
      onClick={(e) => {
        // save current scroll before navigating
        sessionStorage.setItem("scrollY", String(window.scrollY));
        if (props.onClick) props.onClick(e);
      }}
    >
      {children}
    </TransitionLink>
  );
}

// Add a small hook to restore on mount
export function useScrollRestoration() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem("scrollY");
    }
  }, []);
}
