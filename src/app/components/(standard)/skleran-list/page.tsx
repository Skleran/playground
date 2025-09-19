"use client";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ComponentWrapper
      date="July 2025"
      title="Skleran List"
      githubUrl="/"
      subdomain="skleran-list"
      className={"p-0 m-0 relative min-h-min aspect-[3/2]"}
    >
      <Link href={"https://skleran-list.erdemkoyuncu.com/"} target="_blank">
        <div>
          <Image
            src={
              !mounted || resolvedTheme === "dark"
                ? "/images/skleran-list-dark.png"
                : "/images/skleran-list-light.png"
            }
            alt=""
            fill
            className="object-cover"
          />{" "}
        </div>
      </Link>
    </ComponentWrapper>
  );
}
