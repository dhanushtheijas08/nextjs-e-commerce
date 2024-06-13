"use client";

import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type MyColorPickerProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  onFieldChange: (hexval: string) => void;
};

const MyColorPicker = ({
  color,
  setColor,
  onFieldChange,
}: MyColorPickerProps) => {
  let bgColor = "#fff";
  if (color.hex) bgColor = color.hex;

  return (
    <Popover>
      <PopoverTrigger
        className={cn("rounded h-full w-full cursor-pointer bg-primary")}
        style={{ backgroundColor: bgColor }}
      ></PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <ColorPicker
          height={200}
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            onFieldChange(newColor.hex);
          }}
          hideInput={["rgb", "hsv"]}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MyColorPicker;
