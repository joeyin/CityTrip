import { Select as BaseSelect, extendVariants } from "@nextui-org/react";

const Select = extendVariants(BaseSelect, {
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
        value: "text-black",
        trigger:
          "bg-default-transaparent data-[hover=true]:bg-default-transaparent group-data-[focus=true]:bg-default-transaparent shadow-none",
      },
    },
  },
});

export default Select;
