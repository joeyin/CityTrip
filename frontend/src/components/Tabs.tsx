import { Tabs as BaseTabs, extendVariants } from "@nextui-org/react";

const Tabs = extendVariants(BaseTabs, {
  variants: {
    size: {
      default: {
        tabContent: "font-medium font-inter text-sm",
      },
    },
    color: {
      default: {
        cursor: "bg-black h-[1px]",
        tabContent: "text-gray-500 group-data-[selected=true]:text-black",
      },
    },
  },
});

export default Tabs;
