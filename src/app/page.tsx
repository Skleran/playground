"use client";

// import Image from "next/image";

// import ExperimentalTag from "@/components/custom/experimental-tag";
import { useScrollRestoration } from "@/components/transition-link";
// import { HomeCard } from "@/components/ui/home-card";
import { useViewTransition } from "@/utils/useViewTransitionActive";
import ProjectCard, { ProjectCardProps } from "@/components/ui/project-card";
import { useTranslations } from "next-intl";
import SettingsBox from "@/components/custom/settings-box";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PersonalInfo from "@/components/custom/personal-info";
// import { useTransitionRouter } from "next-view-transitions";
// import Link from "next/link";
// import { Link } from "next-view-transitions";

export default function Home() {
  useScrollRestoration();
  const { activeProject } = useViewTransition();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  // const locale = useLocale();

  const projects: ProjectCardProps[] = [
    {
      name: t("HomePage.folder_interaction"),
      subdomain: "folder-interaction",
      isExperimental: false,
    },
    {
      name: t("HomePage.multistep_dialog"),
      subdomain: "multistep-dialog",
      isExperimental: false,
    },
    {
      name: t("HomePage.feedback_box"),
      subdomain: "feedback-box",
      isExperimental: false,
    },
    {
      name: t("HomePage.animate_height"),
      subdomain: "animate-height",
      isExperimental: false,
    },
    {
      name: t("HomePage.drag_gesture"),
      subdomain: "drag-gesture",
      isExperimental: false,
    },
    {
      name: t("HomePage.loading_button"),
      subdomain: "loading-button",
      isExperimental: false,
    },
    {
      name: t("HomePage.game_store_interaction"),
      subdomain: "game-store-interaction",
      isExperimental: false,
    },
    {
      name: t("HomePage.animated_button_bg"),
      subdomain: "animated-button-bg",
      isExperimental: false,
    },
    {
      name: t("HomePage.dynamic_island"),
      subdomain: "dynamic-island",
      isExperimental: false,
    },
    {
      name: t("HomePage.outline_orbit_button"),
      subdomain: "outline-orbit-button",
      isExperimental: false,
    },
    {
      name: t("HomePage.led_matrix_display"),
      subdomain: "led-matrix-display",
      isExperimental: false,
    },
    {
      name: t("HomePage.glowing_video"),
      subdomain: "glowing-video",
      isExperimental: false,
    },
    {
      name: t("HomePage.squircle_ui_elements"),
      subdomain: "squircles",
      isExperimental: true,
    },
    {
      name: t("HomePage.animated_glass_navbar"),
      subdomain: "animated-glass-navbar",
      isExperimental: true,
    },
    {
      name: t("HomePage.animated_user_box"),
      subdomain: "animated-user-box",
      isExperimental: false,
    },
    {
      name: t("HomePage.animated_navbar"),
      subdomain: "animated-navbar",
      isExperimental: false,
    },
    {
      name: t("HomePage.hold_to_action_button"),
      subdomain: "hold-to-action-button",
      isExperimental: false,
    },
    {
      name: t("HomePage.the_end_is_never"),
      subdomain: "the-end-is-never",
      isExperimental: false,
    },
    {
      name: t("HomePage.table_of_contents_alt"),
      subdomain: "table-of-contents-alt",
      isExperimental: false,
    },
    {
      name: t("HomePage.table_of_contents"),
      subdomain: "table-of-contents",
      isExperimental: false,
    },
    {
      name: t("HomePage.neue_haas_design"),
      subdomain: "neue-haas-design",
      isExperimental: false,
    },
    {
      name: t("HomePage.neue_machina_design"),
      subdomain: "neue-machina-design",
      isExperimental: false,
    },
    {
      name: t("HomePage.cursor_tracking_menu"),
      subdomain: "cursor-menu",
      isExperimental: false,
    },
    {
      name: t("HomePage.component_wrapper"),
      subdomain: "component-wrapper",
      isExperimental: false,
    },
  ];

  return (
    <div className="max-w-[700px] mx-auto overflow-x-hidden px-6 py-10 sm:py-18 text-neutral-800 dark:text-neutral-100">
      <main>
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          {" "}
          <img
            src={
              !mounted || resolvedTheme === "dark"
                ? "/me-icon-dark.svg"
                : "/me-icon-light.svg"
            }
            alt=""
            className="size-15"
            draggable={false}
          />
          {/* <PersonalInfo /> */}
        </div>

        <div className="text-[22px] font-medium tracking-tight text-primary w-full pb-3 flex flex-row justify-between">
          <h1>
            {t("HomePage.intro")}
            <span
              style={
                activeProject === null ? {} : { viewTransitionName: "name" }
              }
              className="relative"
            >
              {" "}
              <div
                role="none"
                className="invisible absolute top-1/2 right-full"
                style={{ viewTransitionName: "back-arrow" }}
              />
              Erdem
            </span>
          </h1>
          <SettingsBox />
          {/* <LocaleSelectBox />
          <ChangeThemeTabs animationKey="theme" key={"theme"} /> */}
        </div>
        <div className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          cupiditate saepe architecto doloribus voluptatibus officiis, sint,
          obcaecati incidunt.
        </div>
        <div className="flex flex-row gap-4 mt-6">
          <Button
            asChild
            variant={"secondary"}
            size={"lg"}
            className="rounded-full text-base"
          >
            <Link target="_blank" href={"mailto:iletisim@erdemkoyuncu.com"}>
              Mail
              <ArrowUpRight className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            size={"lg"}
            className="rounded-full text-base"
          >
            <Link target="_blank" href={"https://github.com/Skleran"}>
              GitHub
              <ArrowUpRight className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            size={"lg"}
            className="rounded-full text-base"
          >
            <Link
              target="_blank"
              href={"https://www.linkedin.com/in/erdemkoyuncu"}
            >
              LinkedIn
              <ArrowUpRight className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="mt-23">
          <p className="font-medium tracking-tight">
            {t("HomePage.projects")}
            {/* Work */}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
            <ProjectCard
              name="Skleran List"
              subdomain="skleran-list"
              imageUrl={
                !mounted || resolvedTheme === "dark"
                  ? "/images/skleran-list-dark.png"
                  : "/images/skleran-list-light.png"
              }
            />
          </div>
        </div>
        <div className="mt-26">
          <p className="font-medium tracking-tight">
            {t("HomePage.work")}
            {/* Projects */}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                name={project.name}
                subdomain={project.subdomain}
                isExperimental={project.isExperimental}
              />
            ))}
          </div>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
