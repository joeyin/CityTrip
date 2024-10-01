import { Button as BaseButton, extendVariants } from "@nextui-org/react";

const Button = extendVariants(BaseButton, {
  compoundVariants: [
    {
      className: "font-inter",
    },
  ],
  variants: {
    size: {
      lg: "min-w-32",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
      none: "shadow-none",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    variant: {
      light: "bg-white",
      transparent: "bg-transparent data-[hover=true]:bg-gray-150",
      bordered: "border-1",
    },
    color: {
      secondary:
        "text-secondary data-[hover=true]:bg-secondary data-[hover=true]:text-white",
    },
    isIconOnly: {
      true: "shadow-default p-1.5",
    },
    isDisabled: {
      true: "cursor-not-allowed !pointer-events-auto",
    },
  },
});

export default Button;
