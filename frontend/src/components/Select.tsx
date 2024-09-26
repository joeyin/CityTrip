"use client";

import React from "react";
import {
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
  SlotsToClasses,
} from "@nextui-org/react";
import cx from "classnames";

export interface SelectProps extends Omit<BaseSelectProps, "classNames"> {
  icon?: React.JSX.Element | undefined;
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

const Select = ({ icon, fullWidth, ...props }: SelectProps) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <div
      className={cx(
        "flex",
        "items-center",
        "rounded-md",
        "border-1",
        "transition-color",
        "duration-300",
        { "border-gray-300": focus, "border-gray-200": !focus },
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
            { "text-black": focus, "text-gray-500": !focus },
            { "opacity-disabled": props?.isDisabled },
            props?.classNames?.icon,
          ),
        })}
      <BaseSelect
        {...props}
        onOpenChange={setFocus}
        classNames={{
          base: "flex-1",
          label: "font-poppins text-xs text-gray-500",
          value: "font-poppins text-sm text-black font-medium",
          trigger:
            "bg-default-transaparent pl-0 pr-4 data-[hover=true]:bg-default-transaparent group-data-[focus=true]:bg-default-transaparent shadow-none",
        }}
      />
    </div>
  );
};

export default Select;
