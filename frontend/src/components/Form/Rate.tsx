"use client";

import React from "react";
import { IconStar } from "@images/icons";
import cx from "classnames";
import { useTranslations } from "next-intl";
import Button from "./Button";
import { InputProps } from "@nextui-org/react";
import Input from "./Input";

export interface RatingProps
  extends Omit<InputProps, "defaultValue" | "labelPlacement" | "onChange"> {
  defaultValue?: number;
  maxValue?: number;
  isDisabled?: boolean;
  icon?: React.ReactElement;
  onChange?: (value: string) => void;
}

const Rate = ({
  defaultValue = 0,
  maxValue = 5,
  isDisabled,
  icon,
  required,
  onChange,
  ...props
}: RatingProps) => {
  const t = useTranslations();
  const inputRef = React.useRef(null);
  const [value, set] = React.useState(defaultValue.toString());

  React.useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]); //eslint-disable-line

  return (
    <div className="group">
      <Input
        {...props}
        ref={inputRef}
        value={value === "0" ? "" : value || undefined}
        required={required}
        labelPlacement="outside-left"
        classNames={{
          label: "p-0",
          inputWrapper:
            "w-[0px] h-[0px] min-h-[0px] p-0 !ring-0 !ring-offset-0",
        }}
      />
      <div className="flex gap-1">
        {Array.from({ length: maxValue }).map((_, index) => (
          <Button
            isDisabled={isDisabled}
            variant="transparent"
            key={index}
            isIconOnly
            shadow="none"
            radius="none"
            className="w-fit min-w-fit p-0"
            disableRipple
            onPress={() => set((index + 1).toString())}
            title={t("star", { text: index + 1 })}
          >
            {icon ? (
              React.cloneElement(icon)
            ) : (
              <IconStar
                key={index}
                className={cx(
                  "transition-all",
                  "duration-200",
                  "text-gray-200",
                  {
                    "text-primary": parseInt(value) > index,
                  },
                )}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Rate;
