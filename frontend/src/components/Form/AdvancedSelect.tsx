"use client";

import React from "react";
import {
  SelectProps as BaseSelectProps,
  SlotsToClasses,
} from "@nextui-org/react";
import BaseSelect from "./Select";
import cx from "classnames";

export interface AdvancedSelectProps
  extends Omit<BaseSelectProps, "classNames"> {
  icon?: React.ReactElement;
  classNames?:
    | SlotsToClasses<
        | "base"
        | "label"
        | "description"
        | "errorMessage"
        | "mainWrapper"
        | "innerWrapper"
        | "helperWrapper"
        | "value"
        | "selectorIcon"
        | "trigger"
        | "spinner"
        | "listboxWrapper"
        | "listbox"
        | "popoverContent"
        | "icon"
      >
    | undefined;
}

const AdvancedSelect = ({
  icon,
  fullWidth,
  radius,
  ...props
}: AdvancedSelectProps) => {
  const [focused, setFocused] = React.useState(false);

  const handleOnFocusChange = React.useCallback((isFocused: boolean) => {
    setFocused(isFocused);
  }, []);

  return (
    <div
      className={cx(
        "flex",
        "items-center",
        "border-1",
        "transition-color",
        "duration-300",
        {
          "rounded-none": radius === "none",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-full": radius === "full",
        },
        {
          outline: focused,
          "outline-2": focused,
          "outline-focus": focused,
          "outline-offset-2": focused,
        },
        { "border-gray-300": focused, "border-gray-200": !focused },
        { "w-full": fullWidth },
        { "cursor-not-allowed": props.isDisabled },
      )}
    >
      {icon &&
        React.cloneElement(icon, {
          className: cx(
            "min-w-6",
            "max-w-6",
            "transition-color",
            "duration-300",
            "mx-4",
            { "text-black": focused, "text-gray-500": !focused },
            { "opacity-disabled": props?.isDisabled },
            props?.classNames?.icon,
          ),
        })}
      <BaseSelect
        {...props}
        color="default"
        radius="none"
        onFocus={() => handleOnFocusChange(true)}
        onBlur={() => handleOnFocusChange(false)}
        classNames={{
          base: "flex-1",
          label: "font-poppins",
          value: "font-poppins font-medium",
          trigger: "pl-0 pr-4 data-[focus-visible=true]:outline-0",
        }}
      />
    </div>
  );
};

export default AdvancedSelect;
