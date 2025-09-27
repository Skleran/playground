import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ComponentWrapper({
  title,
  date,
  githubUrl,
  subdomain,
  children,
  description,
  className,
  active,
  siteUrl,
}: {
  title: string;
  date: string;
  githubUrl: string;
  subdomain: string;
  children: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  active?: boolean;
  siteUrl?: string;
}) {
  const currentIndex = projects.findIndex((p) => p.subdomain === subdomain);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const t = useTranslations();

  return (
    <div className="min-h-[100dvh] sm:h-auto sm:min-h-[100dvh] max-w-[1280px] mx-auto p-6 pt-4 overflow-hidden">
      <header className="max-xl:max-w-[652px] max-xl:mx-auto max-xl:mb-5 pt-4 xl:pt-12 xl:fixed xl:w-[270px] xl:flex justify-end">
        <nav>
          <Link href={"/"}>
            <Button
              asChild
              variant={"ghost"}
              className="max-xl:-translate-x-4.5 xl:-translate-y-1.5"
            >
              <div className="w-fit flex items-center gap-2 text-muted-foreground/85 hover:text-primary/85 transition-colors ease-out text-sm font-semibold">
                <div style={{ viewTransitionName: "back-arrow" }}>
                  <ArrowLeft />
                </div>
                <div className="relative">
                  {" "}
                  <span style={{ viewTransitionName: "name" }}>Erdem</span>
                  {/* <span className="invisible absolute left-0 top-full whitespace-nowrap">
                  Software Engineering Student
                </span> */}
                </div>
              </div>
            </Button>
          </Link>
        </nav>
      </header>
      <main>
        <article className="max-w-[652px] mx-auto xl:pt-12">
          <header>
            <div
              className="flex gap-4 items-center pb-10"
              style={{ viewTransitionName: "component-header" }}
            >
              <div className="flex-1">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {title}
                </h1>
                <div>
                  <span className="text-muted-foreground text-sm font-medium">
                    {date}
                  </span>
                </div>
              </div>
              {active === undefined ? (
                <Button
                  asChild
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <Link href={githubUrl} target="_blank">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary/85 size-full"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </Link>
                </Button>
              ) : (
                siteUrl && (
                  <div className="flex flex-row items-center gap-4">
                    <Button
                      asChild
                      variant={"ghost"}
                      size={"icon"}
                      className="rounded-full"
                    >
                      <Link href={githubUrl} target="_blank">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-primary/85 size-3/4"
                        >
                          <title>GitHub</title>
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>{" "}
                      </Link>
                    </Button>{" "}
                    <Button
                      asChild
                      variant={"default"}
                      className="sm:hidden rounded-full size-12"
                      size={"icon"}
                    >
                      <Link href={siteUrl} target="_blank">
                        <ArrowUpRight className="size-6" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant={"default"}
                      className="max-sm:hidden rounded-full w-fit h-12"
                      size={"lg"}
                    >
                      <Link href={siteUrl} target="_blank">
                        <div className="flex items-center gap-1.5 mx-1">
                          <p className="text-base">
                            {t("ComponentWrapper.visit")}{" "}
                          </p>
                          <ArrowUpRight className="size-5" />
                        </div>
                      </Link>
                    </Button>
                  </div>
                )
              )}
            </div>
            <div
              style={{ viewTransitionName: "component-wrapper" }}
              className={cn(
                "w-full mx-auto min-h-[400px] overflow-x-hidden px-6 py-18 sm:py-22 rounded-2xl bg-neutral-50 dark:bg-card ring-1 ring-border flex items-center justify-center overflow-hidden",
                className
              )}
            >
              {children}
            </div>
          </header>
          <p
            style={{ viewTransitionName: "component-desc" }}
            className="py-10 text-primary/75 text-lg leading-8"
          >
            {description}
          </p>
          {/* previous / next navigation */}
          <div className="flex justify-between pt-6 pb-10">
            {prevProject ? (
              <Button
                asChild
                variant={"none"}
                className="flex flex-col items-start px-0 group gap-1.5"
              >
                <Link href={`/components/${prevProject.subdomain}`}>
                  <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                    {t("ComponentWrapper.previous")}
                  </p>
                  <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                    {prevProject.name}
                  </p>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Button
                asChild
                variant={"none"}
                className="flex flex-col items-end px-0 group gap-1.5"
              >
                <Link href={`/components/${nextProject.subdomain}`}>
                  <p className="text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">
                    {t("ComponentWrapper.next")}
                  </p>
                  <p className="text-primary/80 group-hover:text-accent-foreground transition-colors duration-200">
                    {nextProject.name}
                  </p>
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
