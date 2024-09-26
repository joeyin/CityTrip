"use client";

import React from "react";
import {
  Input as BaseInput,
  InputProps as BaseInputProps,
  SlotsToClasses,
} from "@nextui-org/react";
import cx from "classnames";

export interface InputProps extends Omit<BaseInputProps, "classNames"> {
  icon?: React.JSX.Element | undefined;
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

const Input = ({ icon, fullWidth, ...props }: InputProps) => {
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
            { "opacity-disabled": props.isDisabled },
            props?.classNames?.icon,
          ),
        })}
      <BaseInput
        {...props}
        onFocusChange={setFocus}
        classNames={{
          base: "py-2 flex-1",
          label: "font-poppins text-xs text-gray-500",
          input: "font-poppins text-sm text-black font-medium",
          innerWrapper: "pl-0 pr-4",
          inputWrapper:
            "h-10 p-0 bg-default-transaparent data-[hover=true]:bg-default-transaparent group-data-[focus=true]:bg-default-transaparent shadow-none",
        }}
      />
    </div>
  );
};

export default Input;
