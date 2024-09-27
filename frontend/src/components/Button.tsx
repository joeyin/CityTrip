import { Button as BaseButton, extendVariants } from "@nextui-org/react";

const Button = extendVariants(BaseButton, {
  variants: {
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    variant: {
      light: "bg-white p-1.5"
    },
    color: {
      secondary: "text-secondary data-[hover=true]:bg-secondary data-[hover=true]:text-white"
    },
    isIconOnly: {
      true: "shadow-default"
    },
    isDisabled: {
      true: "cursor-not-allowed !pointer-events-auto"
    },
  },
});

export default Button;
