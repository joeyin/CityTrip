"use client";

import React from "react";
import {
  InputProps as BaseInputProps,
  SlotsToClasses,
} from "@nextui-org/react";
import BaseInput from "./Input";
import cx from "classnames";

export interface AdvancedInputProps extends Omit<BaseInputProps, "classNames"> {
  icon?: React.ReactElement;
  classNames?:
    | SlotsToClasses<
        | "base"
        | "input"
        | "label"
        | "description"
        | "errorMessage"
        | "mainWrapper"
        | "inputWrapper"
        | "innerWrapper"
        | "helperWrapper"
        | "clearButton"
        | "icon"
      >
    | undefined;
}

const AdvancedInput = ({
  icon,
  fullWidth,
  radius,
  onFocusChange = () => {},
  ...props
}: AdvancedInputProps) => {
  const [focused, setFocused] = React.useState(false);

  const handleOnFocusChange = React.useCallback((isFocused: boolean) => {
    setFocused(isFocused);
    onFocusChange(isFocused);
  }, []); //eslint-disable-line

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
            { "opacity-disabled": props.isDisabled },
            props?.classNames?.icon,
          ),
        })}
      <BaseInput
        color="default"
        radius="none"
        onFocusChange={handleOnFocusChange}
        classNames={{
          base: "py-2 flex-1",
          label: "font-poppins",
          input: "font-poppins font-medium",
          innerWrapper: "pl-0 pr-4",
          inputWrapper:
            "h-10 p-0 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
        }}
        {...props}
      />
    </div>
  );
};

export default AdvancedInput;
