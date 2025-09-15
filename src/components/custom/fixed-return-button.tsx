import { Link } from "next-view-transitions";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function FixedReturnButton() {
  return (
    <nav>
      <Link href={"/"}>
        <Button
          asChild
          variant={"ghost"}
          className="text-primary/85 hover:text-primary/85 ease-out"
        >
          <div className="w-fit flex items-center gap-2 text-sm font-semibold">
            <div style={{ viewTransitionName: "back-arrow" }}>
              <ArrowLeft className="" />
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
  );
}
