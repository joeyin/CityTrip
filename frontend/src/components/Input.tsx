import { Input as BaseInput, extendVariants } from "@nextui-org/react";

const Input = extendVariants(BaseInput, {
  variants: {
    size: {
      md: {
        label: "text-xs",
        value: "text-sm",
      },
    },
    color: {
      default: {
        label: "text-gray-500",
        input: "text-black",
        inputWrapper:
          "bg-default-transaparent data-[hover=true]:bg-default-transaparent group-data-[focus=true]:bg-default-transaparent shadow-none",
      },
    },
  },
});

export default Input;
