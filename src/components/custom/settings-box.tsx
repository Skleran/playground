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
        <Button variant={"ghost"} size={"icon"}>
          <Settings2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-3 p-2">
        {" "}
        <ChangeThemeTabs animationKey="theme" key={"theme"} />
        <LocaleSelectBox />
      </PopoverContent>
    </Popover>
  );
}
