import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import ChangeThemeTabs from "./theme-selector";
import LocaleSelectBox from "./locale-select-box";

export default function SettingsBox() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <Settings2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-3 p-2 origin-top-right mr-6 md:mr-0 md:origin-top">
        {" "}
        <ChangeThemeTabs animationKey="theme" key={"theme"} />
        <LocaleSelectBox />
      </PopoverContent>
    </Popover>
  );
}
