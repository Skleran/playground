"use client";

import { ScrollProgressTracker } from "@/components/custom/toc-alt";
import React from "react";

export default function Page() {
  return (
    <div className="h-[100dvh] sm:h-auto sm:min-h-[100dvh] mx-auto transition-all duration-400 ease-out max-w-2xl">
      <div className="text-2xl m-auto min-h-30">
        {/* <span>This is my navbar</span> */}
      </div>
      <ScrollProgressTracker>
        <div className="mx-auto p-6 space-y-8">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Demo Blog Post</h1>
            <p className="text-muted-foreground">
              Scroll down to see the progress tracker in action
            </p>
          </header>

          {Array.from({ length: 10 }, (_, i) => (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-semibold">
                This is the {i + 1}. section
              </h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p className="text-muted-foreground">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </section>
          ))}

          <footer className="text-center py-8">
            End of content - you should see 100% now!
          </footer>
        </div>
      </ScrollProgressTracker>
    </div>
  );
}
