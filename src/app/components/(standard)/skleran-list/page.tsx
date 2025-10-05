"use client";
import ComponentWrapper from "@/components/custom/component-wrapper";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ComponentWrapper
      date={t("Date.september") + " 2025"}
      title="Skleran List"
      githubUrl="/"
      subdomain="skleran-list"
      active
      siteUrl="https://skleran-list.erdemkoyuncu.com/"
      className={"p-0 m-0 relative min-h-min aspect-[3/2]"}
    >
      <Link href={"https://skleran-list.erdemkoyuncu.com/"} target="_blank">
        <div>
          <Image
            src={
              !mounted || resolvedTheme === "dark"
                ? "/images/skleran-list-dark.webp"
                : "/images/skleran-list-light.webp"
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
